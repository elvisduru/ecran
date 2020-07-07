import React, { useState } from "react";
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
  UndoOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllRequests,
  fetchRequests,
  updateRequest,
} from "./New/requestsSlice";
import { useEffect } from "react";

export const Approved = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

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

  const findDetail = (id) => {
    return requests.find((item) => item.key === id);
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
            title="Undo approval"
            icon={<UndoOutlined />}
            onClick={() => {
              dispatch(
                updateRequest({
                  id: record.key,
                  status: "Pending",
                })
              )
                .then(() =>
                  message.success(
                    `${record.campaignName} has been set as 'Pending'`
                  )
                )
                .catch(() =>
                  message.error("There was an error updating the request")
                );
            }}
          />
          <Button
            type="primary"
            title="Edit Request"
            style={{ backgroundColor: "#FAAD14", borderColor: "#FAAD14" }}
            icon={<EditOutlined />}
            size="small"
            href="https://elvisduru.com"
          />
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
              <Typography.Title level={4}>Approved Requests</Typography.Title>
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
                loading={requests.length < 1 ? true : false}
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
