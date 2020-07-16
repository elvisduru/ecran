import React, { useState } from "react";
import moment from "moment";
import { Typography, Row, Button, Col, Table, Input, Modal, Tag } from "antd";
import { SearchOutlined, EyeOutlined, SwapOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectAllRequests } from "../Requests/requestsSlice";
import { useHistory } from "react-router-dom";

export const Incoming = () => {
  const history = useHistory();

  const allRequests = useSelector(selectAllRequests);
  const requests = allRequests.filter(
    (request) => request.status === "Approved"
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

    const filterTable = requests.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: {
        compare: (a, b) => a.createdAt.localeCompare(b.createdAt),
      },
      render: (text) => <span>{moment(text).format("DD/MM/YYYY h:mm a")}</span>,
      defaultSortOrder: "descend",
    },
    {
      title: "Request Type",
      dataIndex: "requestType",
      key: "requestType",
      sorter: {
        compare: (a, b) => a.requestType.localeCompare(b.requestType),
      },
    },
    {
      title: "Requester's Name",
      dataIndex: "requesterName",
      key: "requesterName",
      sorter: {
        compare: (a, b) => a.requesterName.localeCompare(b.requesterName),
      },
    },
    {
      title: "Customer's Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: {
        compare: (a, b) => a.customerName.localeCompare(b.customerName),
      },
    },
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
      sorter: {
        compare: (a, b) => a.campaignName.localeCompare(b.campaignName),
      },
    },
    {
      title: "Campaign Type",
      dataIndex: "campaignType",
      key: "campaignType",
      sorter: {
        compare: (a, b) => a.campaignType.localeCompare(b.campaignType),
      },
    },
    {
      title: "Campaign Screen",
      dataIndex: "campaignScreen",
      key: "campaignScreen",
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
      title: "ATM Selection",
      dataIndex: "atmSelect",
      key: "atmSelect",
      sorter: {
        compare: (a, b) => a.atmSelect.localeCompare(b.atmSelect),
      },
    },
    {
      title: "Region",
      dataIndex: "atmSelectRegion",
      key: "atmSelectRegion",
      sorter: {
        compare: (a, b) => a.atmSelectRegion.localeCompare(b.atmSelectRegion),
      },
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
      dataIndex: "atmSelectStates",
      key: "atmSelectStates",
      sorter: {
        compare: (a, b) => a.atmSelectStates.localeCompare(b.atmSelectStates),
      },
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Typography.Text style={{ color: "#1D9918" }}>{text}</Typography.Text>
      ),
    },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
      render: (text) => (
        <Typography.Text>{text ? "Yes" : "No"}</Typography.Text>
      ),
    },
    {
      title: "Approval Document",
      dataIndex: "approvalDocument",
      key: "approvalDocument",
      render: (text) => (
        <Button type="link" href={`${text}`} style={{ padding: 0 }}>
          {text && "Download"}
        </Button>
      ),
    },
    {
      title: "Comment",
      dataIndex: "approveComment",
      key: "approveComment",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            type="primary"
            title="Replace Screen"
            icon={<SwapOutlined />}
            size="small"
            onClick={() => {
              history.push(`/campaigns/replace/${record.key}`);
            }}
          >
            Replace
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Incoming Requests</Typography.Title>
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
                // loading={requests.length < 1 ? true : false}
                columns={columns}
                dataSource={filterTable == null ? requests : filterTable}
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
