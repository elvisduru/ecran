import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Table, Input, Modal, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import { format } from "date-fns";

import styles from "./Monitoring/Monitoring.module.css";

import { selectAllATMs } from "./Monitoring/atmsSlice";
import { useSelector } from "react-redux";
const transformATMs = (data) =>
  data.map((atm) => {
    let atmClone = Object.assign({}, atm);
    delete atmClone._id;
    delete atmClone.screens;
    atmClone["Current Campaign"] = atmClone.currentCampaign;
    atmClone["Incomplete Screens"] = atmClone.incompleteScreens;
    atmClone["Old Campaign"] = atmClone.oldCampaign;
    atmClone["No Campaign"] = atmClone.stats.noCampaign;
    atmClone["No Screen"] = atmClone.stats.noScreen;
    delete atmClone.stats;
    delete atmClone.currentCampaign;
    delete atmClone.incompleteScreens;
    delete atmClone.oldCampaign;
    delete atmClone.key;
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

  const history = useHistory();

  const columns = [
    {
      title: "S/N",
      dataIndex: "S/N",
      key: "S/N",
      sorter: {
        compare: (a, b) => a["S/N"] - b["S/N"],
      },
    },
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
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      sorter: {
        compare: (a, b) => a["Address"].localeCompare(b["Address"]),
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
      title: "IP Address",
      dataIndex: "IP Address",
      key: "IP Address",
      sorter: {
        compare: (a, b) => a["IP Address"].localeCompare(b["IP Address"]),
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
                  Export Data
                </CSVLink>
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
