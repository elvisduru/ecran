import React, { useState } from "react";
import moment from "moment";
import {
  Typography,
  Row,
  Button,
  Col,
  message,
  Table,
  Input,
  Modal,
  Tag,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  StopOutlined,
  CheckOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { selectAllRequests, updateRequest } from "./requestsSlice";
import { useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

export const Pending = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const allRequests = useSelector(selectAllRequests);
  const requests = allRequests.filter(
    (request) => request.status === "Pending"
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

  const [comment, setComment] = useState("");
  const [selectedRequest, setSelectedRequest] = useState();
  const [reason, setReason] = useState();
  const [confirmAction, setConfirmAction] = useState(false);

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Typography.Text type="warning">{text}</Typography.Text>
      ),
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
            size="small"
            title="Approve Request"
            icon={<CheckOutlined />}
            onClick={() => {
              setConfirmAction(true);
              setReason("Approval");
              setSelectedRequest(record);
            }}
          />
          <Button
            type="primary"
            title="Decline Request"
            danger
            icon={<StopOutlined />}
            size="small"
            onClick={() => {
              setConfirmAction(true);
              setReason("Decline");
              setSelectedRequest(record);
            }}
          />
          <Button
            type="primary"
            title="Edit Request"
            style={{ backgroundColor: "#FAAD14", borderColor: "#FAAD14" }}
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              history.push(`/requests/edit/${record.key}`);
            }}
          />
        </div>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const innercolumn = [
      {
        title: "Campaign Type",
        dataIndex: "campaignType",
        key: "campaignType",
      },
      {
        title: "ATM Selection",
        dataIndex: "atmSelect",
        key: "atmSelect",
      },
      {
        title: "Region",
        dataIndex: "atmSelectRegion",
        key: "atmSelectRegion",
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
        dataIndex: "undoComment",
        key: "undoComment",
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
              <Typography.Title level={4}>Pending Requests</Typography.Title>
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
      {confirmAction && (
        <Modal
          visible={confirmAction}
          title={`Confirm ${reason}`}
          onOk={() => {
            if (comment) {
              dispatch(
                updateRequest({
                  id: selectedRequest.key,
                  status: reason === "Decline" ? "Declined" : "Approved",
                  [reason === "Decline"
                    ? "declineComment"
                    : "approveComment"]: comment,
                })
              )
                .then(() => {
                  message.success(
                    `${selectedRequest.campaignName} has been successfully ${
                      reason === "Decline" ? "Declined" : "Approved"
                    }`
                  );
                  setConfirmAction(false);
                })
                .catch(() =>
                  message.error("There was an error updating the request")
                );
            } else {
              message.warn("Please write a comment in the comment box");
            }
          }}
          onCancel={() => setConfirmAction(false)}
        >
          <TextArea
            rows={4}
            placeholder="Write your comments here..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </Modal>
      )}
    </div>
  );
};
