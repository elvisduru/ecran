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
  UndoOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { selectAllRequests, updateRequest } from "./requestsSlice";
import { useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

const ReachableContext = React.createContext();

export const Declined = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const allRequests = useSelector(selectAllRequests);
  const requests = allRequests.filter(
    (request) => request.status === "Declined"
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

  const [modal, contextHolder] = Modal.useModal();

  let [comment, setComment] = useState();

  let generateConfig = (request) => {
    let modalConfig = {
      title: "Confirm Action!",
      content: (
        <TextArea
          rows={4}
          placeholder="Write your comments here..."
          onChange={(e) => setComment(e.target.value)}
        />
      ),
      maskClosable: true,
      onOk() {
        console.log("comment", comment);

        return dispatch(
          updateRequest({
            id: request.key,
            status: "Pending",
            undoComment: comment,
          })
        )
          .then(() =>
            message.success(
              `${request.campaignName} has been restored successfully`
            )
          )
          .catch(() =>
            message.error("There was an error updating the request")
          );
      },
    };

    return modalConfig;
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
      render: (text) => <Typography.Text type="danger">{text}</Typography.Text>,
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
            title="Undo decline"
            icon={<UndoOutlined />}
            onClick={() => {
              modal.confirm(generateConfig(record));
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

  return (
    <ReachableContext.Provider>
      <div>
        <Row>
          <Col span={24}>
            <Row gutter={[16, 32]}>
              <Col flex="auto">
                <Typography.Title level={4}>Declined Requests</Typography.Title>
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
        {contextHolder}
      </div>
    </ReachableContext.Provider>
  );
};
