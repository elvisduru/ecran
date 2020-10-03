import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Input, Table } from "antd";
import { socket } from "../../socket";
import { addActivity, selectAllActivities } from "./activitySlice";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

export const Auditing = () => {
  const dispatch = useDispatch();
  const activities = useSelector(selectAllActivities);

  useEffect(() => {
    socket.on("newActivity", (activity) => {
      dispatch(addActivity(activity));
    });
    return () => socket.disconnect();
  }, []);

  const [filterTable, setFilterTable] = useState(null);

  const search = (e) => {
    const value = e.target.value;

    const filterTable = activities.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };

  const columns = [
    {
      title: "DateTime",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: {
        compare: (a, b) => a.createdAt.localeCompare(b.createdAt),
      },
      render: (text) => <span>{moment(text).format("DD/MM/YYYY h:mm a")}</span>,
      defaultSortOrder: "descend",
    },
    {
      title: "IP Address",
      dataIndex: "ip",
      key: "ip",
      sorter: {
        compare: (a, b) => a.ip.localeCompare(b.ip),
      },
    },
    {
      title: "Username",
      dataIndex: "user",
      key: "user",
      sorter: {
        compare: (a, b) => a.user.localeCompare(b.user),
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: {
        compare: (a, b) => a.role.localeCompare(b.role),
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: {
        compare: (a, b) => a.type.localeCompare(b.type),
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      sorter: {
        compare: (a, b) => a.action.localeCompare(b.action),
      },
    },
    {
      title: "Resource",
      dataIndex: "resource",
      key: "resource",
      sorter: {
        compare: (a, b) => a.resource.localeCompare(b.resource),
      },
    },
  ];

  return (
    <div>
      <Row gutter={[16, 32]}>
        <Col flex="auto">
          <Typography.Title level={4}>Auditing</Typography.Title>
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
            dataSource={filterTable == null ? activities : filterTable}
          />
        </Col>
      </Row>
    </div>
  );
};
