import React, { useState } from "react";
import moment from "moment";
import { Typography, Row, Button, Col, Table, Input, Modal, Tag } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectAllScreens } from "./screensSlice";

export const Approved = () => {
  const screens = useSelector(selectAllScreens).filter(
    (screen) => screen.request && screen.status === "Approved"
  );

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

    const filterTable = screens.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: {
        compare: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
      },
      render: (text) => <span>{moment(text).format("DD/MM/YYYY h:mm a")}</span>,
      defaultSortOrder: "descend",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Campaign Name",
      dataIndex: ["request", "campaignName"],
      key: "request.campaignName",
      sorter: {
        compare: (a, b) =>
          a.request.campaignName.localeCompare(b.request.campaignName),
      },
    },
    {
      title: "Running Screen",
      dataIndex: "src",
      key: "src",
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
      dataIndex: ["request", "campaignScreen"],
      key: "request.campaignScreen",
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
      title: "Duration",
      dataIndex: ["request", "dateRange"],
      key: "request.dateRange",
      render: (dates) =>
        dates.map((date, index) => {
          if (index === 0) {
            return (
              <span key={index}>{moment(date).format("DD/MM/YYYY")} - </span>
            );
          } else {
            return <span key={index}>{moment(date).format("DD/MM/YYYY")}</span>;
          }
        }),
    },
    {
      title: "Comment",
      dataIndex: "approveComment",
      key: "approveComment",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Typography.Text style={{ color: "#1D9918" }}>{text}</Typography.Text>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const innercolumn = [
      {
        title: "Request Type",
        dataIndex: ["request", "requestType"],
        key: "request.requestType",
        sorter: {
          compare: (a, b) =>
            a.request.requestType.localeCompare(b.request.requestType),
        },
      },
      {
        title: "Requester's Name",
        dataIndex: ["request", "requesterName"],
        key: "request.requesterName",
        sorter: {
          compare: (a, b) =>
            a.request.requesterName.localeCompare(b.request.requesterName),
        },
      },
      {
        title: "Customer's Name",
        dataIndex: ["request", "customerName"],
        key: "request.customerName",
        sorter: {
          compare: (a, b) =>
            a.request.customerName.localeCompare(b.request.customerName),
        },
      },
      {
        title: "ATM Selection",
        dataIndex: ["request", "atmSelect"],
        key: "request.atmSelect",
      },
      {
        title: "Region",
        dataIndex: ["request", "atmSelectRegion"],
        key: "request.atmSelectRegion",
        render: (tags) => (
          <span>
            {tags.map((tag) => {
              return (
                <Tag color="green" key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: "States",
        dataIndex: ["request", "atmSelectStates"],
        key: "request.atmSelectStates",
        render: (tags) => (
          <span>
            {tags.map((tag) => {
              return (
                <Tag color="green" key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: "Approval Document",
        dataIndex: ["request", "approvalDocument"],
        key: "request.approvalDocument",
        render: (text) => (
          <Button type="link" href={`${text}`} style={{ padding: 0 }}>
            {text && "Download"}
          </Button>
        ),
      },
    ];

    return (
      <Table columns={innercolumn} dataSource={[record]} pagination={false} />
    );
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Approved Campaigns</Typography.Title>
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
                // scroll={{ x: 1500 }}
                // loading={requests.length < 1 ? true : false}
                columns={columns}
                expandable={{
                  expandedRowRender,
                }}
                dataSource={filterTable == null ? screens : filterTable}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {previewImage && (
        <Modal
          visible={preview}
          footer={null}
          onCancel={() => setPreview(false)}
        >
          <img alt="campaign" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      )}
    </div>
  );
};
