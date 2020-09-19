import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCampaigns } from "./CampaignsSlice";
import styles from "../Dashboard.module.css";
import {
  Row,
  Col,
  Typography,
  Button,
  Modal,
  Input,
  Table,
  Carousel,
} from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";

import ad1 from "../../images/ad1.png";
import ad2 from "../../images/ad2.png";
import ad3 from "../../images/PIC301.png";

import { fetchScreens } from "../../helpers";

const ads = [
  {
    title: "Idle Screen",
    image: ad1,
  },
  {
    title: "Idle Screen",
    image: ad2,
  },
  {
    title: "Idle Screen",
    image: ad3,
  },
];

export const Campaigns = () => {
  const [screens, setScreens] = useState(null);

  useEffect(() => {
    fetchScreens().then((screens) => setScreens(screens));
  }, []);

  const campaigns = useSelector(selectCampaigns);

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

    const filterTable = campaigns.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };

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
      title: "Campaign Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: {
        compare: (a, b) => a.startDate - b.startDate,
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: {
        compare: (a, b) => a.endDate - b.endDate,
      },
    },
    {
      title: "Campaign Period",
      dataIndex: "period",
      key: "period",
      sorter: {
        compare: (a, b) => a.period.localeCompare(b.period),
      },
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      sorter: {
        compare: (a, b) => a.region.localeCompare(b.region),
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
      title: "Default Screen",
      dataIndex: "defaultScreen",
      key: "defaultScreen",
      render: (text) => (
        <div
          className="preview-card"
          style={{ width: "50px", height: "50px", padding: "3px" }}
          onClick={() => handlePreview(text)}
        >
          <img src={text} alt="campaign" />
          <span>
            <Button
              icon={<EyeOutlined />}
              type="ghost"
              style={{ border: 0, color: "#fff" }}
            />
          </span>
        </div>
      ),
    },
    {
      title: "Campaign Screen",
      dataIndex: "screen",
      key: "screen",
      render: (text) => (
        <div
          className="preview-card"
          style={{ width: "50px", height: "50px", padding: "3px" }}
          onClick={() => handlePreview(text)}
        >
          <img src={text} alt="campaign" />
          <span>
            <Button
              icon={<EyeOutlined />}
              type="ghost"
              style={{ border: 0, color: "#fff" }}
            />
          </span>
        </div>
      ),
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
    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (text) => (
        <Button type="primary" size="small">
          Modify
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col>
          <Typography.Title level={4}>Active Campaigns</Typography.Title>
        </Col>
      </Row>
      <Row gutter={[24, 12]}>
        <Col span={12}>
          <Row>
            <Col offset={20}>
              <Typography.Text disabled strong>
                Advert Screens
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Carousel autoplay effect="fade">
                {ads.map(({ title, image }, index) => (
                  <div
                    className={styles.Slide}
                    key={`${title}-screen-${index}`}
                    style={{
                      backgroundColor: "#4a9c8c",
                    }}
                  >
                    <img src={image} alt="" />
                    <div data-type="caption">
                      <p>{title}</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col offset={20}>
              <Typography.Text disabled strong>
                Default Screens
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Carousel autoplay effect="fade">
                {screens &&
                  screens.map(({ title, src }, index) => (
                    <div
                      className={styles.Slide}
                      key={`${title}-screen-${index}`}
                      style={{
                        backgroundColor: "#4a9c8c",
                      }}
                    >
                      <img src={src} alt="" />
                      <div data-type="caption">
                        <p>{title}</p>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: "60px" }}>
        <Col span={24}>
          <Row gutter={[16, 20]}>
            <Col flex="auto">
              <Typography.Title level={4}>All Campaigns</Typography.Title>
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
                scroll={{ x: 1500 }}
                columns={columns}
                dataSource={filterTable == null ? campaigns : filterTable}
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
