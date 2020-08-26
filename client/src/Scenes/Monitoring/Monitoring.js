import React, { useState } from "react";
import { Typography, Row, Col, Table, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import campaignScreen1 from "../../images/campaignImg1.jpg";
import campaignScreen2 from "../../images/campaignImg2.jpg";

import styles from "./Monitoring.module.css";

import atms from "../../atm-list.json";

const data = atms.map((atm) => {
  atm.defaultScreen = campaignScreen1;
  atm.screen = campaignScreen2;
  atm.key = atm["S/N"];
  return atm;
});

export const Monitoring = () => {
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
    const filterTable = data.filter((o) =>
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
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      sorter: {
        compare: (a, b) => a["Address"].localeCompare(b["Address"]),
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
      title: "IP Address",
      dataIndex: "IP Address",
      key: "IP Address",
      sorter: {
        compare: (a, b) => a["IP Address"].localeCompare(b["IP Address"]),
      },
    },
    {
      title: "Location Type",
      dataIndex: "Location Type",
      key: "Location Type",
      sorter: {
        compare: (a, b) => a["Location Type"].localeCompare(b["Location Type"]),
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

  return (
    <div className={styles.Monitoring}>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Monitoring</Typography.Title>
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
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      console.log("Clicked: ", rowIndex, "\nData: ", record);
                      const id = record["Terminal ID"];
                      history.push(`/monitoring/${id}`);
                    },
                  };
                }}
                dataSource={filterTable == null ? data : filterTable}
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
