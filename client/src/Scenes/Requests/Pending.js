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
import { SearchOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import ViewDetails from "../../components/ViewDetails";
import { useSelector, useDispatch } from "react-redux";
import { selectAllRequests, fetchRequests } from "./New/requestsSlice";
import { useEffect } from "react";

export const Pending = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  const requests = useSelector(selectAllRequests);

  // Preview
  const [preview, setPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const handlePreview = (image) => {
    setPreviewImage(image);
    setPreview(!preview);
  };

  // Modal, Form Hooks
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [declineLoading, setDeclineLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  const findDetail = (id) => {
    return requests.find((item) => item.key === id);
  };

  const handleDetails = (id) => {
    setShowDetails(!showDetails);

    const details = findDetail(id);
    setDetails(details);
  };

  const declineCampaign = () => {
    setDeclineLoading(true);
    setTimeout(() => {
      setDetails(null);
      setShowDetails(false);
      setDeclineLoading(false);
      message.success("Campaign name was declined successfully");
    }, 2000);
  };

  const approveCampaign = () => {
    setApproveLoading(true);
    setTimeout(() => {
      setDetails(null);
      setShowDetails(false);
      setApproveLoading(false);
      message.success("Campaign name was approved successfully");
    }, 2000);
  };

  const handleCancel = () => {
    setShowDetails(false);
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
        <Typography.Text type="warning">{text}Pending</Typography.Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "12%",
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
            onClick={() => console.log(record, record.key)}
          >
            Approve
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
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
                loading={requests == null ? true : false}
                columns={columns}
                dataSource={filterTable == null ? requests : filterTable}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {details && (
        <ViewDetails
          details={details}
          visible={showDetails}
          onDecline={declineCampaign}
          onApprove={approveCampaign}
          handleCancel={handleCancel}
          confirmLoading={approveLoading}
          declineLoading={declineLoading}
          okText="Approve"
        />
      )}
      {previewImage && (
        <Modal visible={preview} footer={null} onCancel={handlePreview}>
          <img alt="campaign" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      )}
    </div>
  );
};
