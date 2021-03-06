import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Table, Input, Modal, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import { format } from "date-fns";

import styles from "./Monitoring/Monitoring.module.css";

import { selectAllATMs } from "./Monitoring/atmsSlice";
import { useSelector } from "react-redux";
import generatePDF from "../services/reportGenerator";
const transformATMs = (data) =>
  data.map((atm) => {
    let atmClone = Object.assign({}, atm);
    delete atmClone._id;
    delete atmClone.screens;
    atmClone["Current Campaign"] = String(
      atmClone.stats.currentCampaign.length
    );
    atmClone["Incomplete Screens"] = String(
      atmClone.stats.incompleteScreens.length
    );
    atmClone["Old Campaign"] = String(atmClone.stats.oldCampaign.length);
    atmClone["No Campaign"] = String(atmClone.stats.noCampaign);
    atmClone["No Screen"] = String(atmClone.stats.noScreen);
    delete atmClone.stats;
    delete atmClone.currentCampaign;
    delete atmClone.incompleteScreens;
    delete atmClone.oldCampaign;
    delete atmClone.key;
    delete atmClone["S/N"];
    delete atmClone["IP Address"];
    delete atmClone["Address"];
    delete atmClone["Sol ID"];
    return atmClone;
  });
export const Reporting = () => {
  const atms = useSelector(selectAllATMs);

  const [csvData, setCSVData] = useState([]);
  useEffect(() => {
    if (atms) {
      setCSVData(transformATMs([...atms]));
    }
  }, []);

  // Preview
  const [preview, setPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const handlePreview = (image) => {
    setPreviewImage(image);
    setPreview(!preview);
  };

  const [filterTable, setFilterTable] = useState(null);

  const search = (e) => {
    const value = e.target.value;
    const filterTable = atms.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };

  const columns = [
    {
      title: "Terminal ID",
      dataIndex: "Terminal ID",
      key: "Terminal ID",
      sorter: {
        compare: (a, b) => a["Terminal ID"] - b["Terminal ID"],
      },
    },
    {
      title: "Last Txn Date",
      dataIndex: "Last Txn Date",
      key: "Last Txn Date",
      sorter: {
        compare: (a, b) => a["Last Txn Date"].localeCompare(b["Last Txn Date"]),
      },
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      sorter: {
        compare: (a, b) => a["Status"].localeCompare(b["Status"]),
      },
      render: (text) => (
        <Typography.Text
          type={text === "OFFLINE" ? "danger" : null}
          style={text === "ACTIVE" ? { color: "#008C00" } : null}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Current Campaign",
      dataIndex: ["stats", "currentCampaign"],
      key: "stats.currentCampaign",
      render: (data) => (
        <Typography.Text type="warning">{data.length}</Typography.Text>
      ),
      sorter: {
        compare: (a, b) =>
          a.stats.currentCampaign.length - b.stats.currentCampaign.length,
      },
    },
    {
      title: "Old Campaign",
      dataIndex: ["stats", "oldCampaign"],
      key: "stats.oldCampaign",
      render: (data) => (
        <Typography.Text type="warning">{data.length}</Typography.Text>
      ),
      sorter: {
        compare: (a, b) =>
          a.stats.oldCampaign.length - b.stats.oldCampaign.length,
      },
    },
    {
      title: "No Campaign",
      dataIndex: ["stats", "noCampaign"],
      key: "stats.noCampaign",
      render: (text) => (
        <Typography.Text
          type={!text && "danger"}
          style={text && { color: "#1D9918" }}
        >
          {text ? "true" : "false"}
        </Typography.Text>
      ),
      sorter: {
        compare: (a, b) => a.stats.noCampaign - b.stats.noCampaign,
      },
    },
    {
      title: "Incomplete Screens",
      dataIndex: ["stats", "incompleteScreens"],
      key: "stats.incompleteScreens",
      render: (data) => (
        <Typography.Text type="secondary">{data.length}</Typography.Text>
      ),
      sorter: {
        compare: (a, b) =>
          a.stats.incompleteScreens.length - b.stats.incompleteScreens.length,
      },
    },
    {
      title: "No Screen",
      dataIndex: ["stats", "noScreen"],
      key: "stats.noScreen",
      render: (text) => (
        <Typography.Text
          type={!text && "danger"}
          style={text && { color: "#1D9918" }}
        >
          {text ? "true" : "false"}
        </Typography.Text>
      ),
      sorter: {
        compare: (a, b) => a.stats.noScreen - b.stats.noScreen,
      },
    },
    {
      title: "State",
      dataIndex: "State",
      key: "State",
      sorter: {
        compare: (a, b) => a["State"].localeCompare(b["State"]),
      },
    },
    {
      title: "Region",
      dataIndex: "Region",
      key: "Region",
      sorter: {
        compare: (a, b) => a["Region"].localeCompare(b["Region"]),
      },
    },
  ];

  const expandedRowRender = (record) => {
    const innerColumn = [
      {
        title: "Sol ID",
        dataIndex: "Sol ID",
        key: "Sol ID",
        sorter: {
          compare: (a, b) => a["Sol ID"] - b["Sol ID"],
        },
      },
      {
        title: "Location",
        dataIndex: "Location",
        key: "Location",
        sorter: {
          compare: (a, b) => a["Location"].localeCompare(b["Location"]),
        },
      },
      {
        title: "Type",
        dataIndex: "Type",
        key: "Type",
        sorter: {
          compare: (a, b) => a["Type"].localeCompare(b["Type"]),
        },
      },
      {
        title: "Location Type",
        dataIndex: "Location Type",
        key: "Location Type",
        sorter: {
          compare: (a, b) =>
            a["Location Type"].localeCompare(b["Location Type"]),
        },
      },
    ];

    return (
      <Table columns={innerColumn} dataSource={[record]} pagination={false} />
    );
  };

  return (
    <div className={styles.Monitoring}>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Reporting</Typography.Title>
            </Col>
            <Col>
              <Button type="primary">
                <CSVLink
                  filename={`Ecran - report(${format(
                    new Date(),
                    "MM/dd/yyyy-hh:mm"
                  )}).csv`}
                  data={csvData}
                >
                  Export as Excel
                </CSVLink>
              </Button>
              <Button type="default" onClick={() => generatePDF(csvData)}>
                Export as PDF
              </Button>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <Input
                prefix={<SearchOutlined />}
                style={{ margin: "0 0 10px 0", width: "300px" }}
                placeholder="Search table..."
                onChange={search}
              />
              <Table
                columns={columns}
                expandable={{
                  expandedRowRender,
                }}
                dataSource={filterTable == null ? atms : filterTable}
                size="small"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {previewImage && (
        <Modal visible={preview} footer={null} onCancel={handlePreview}>
          <img alt="campaign" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      )}
    </div>
  );
};
