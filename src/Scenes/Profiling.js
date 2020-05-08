import React, { useState } from 'react'
import { Typography, Row, Button, Col, Table, Input, Space, Modal, Form, Upload, Select, message } from 'antd'
import { UploadOutlined, LoadingOutlined, CheckOutlined, SearchOutlined } from '@ant-design/icons';

const data = [
  {
    key: '1',
    created: '24/01/2020',
    name: "ecran123",
    phone: '08108156732',
    role: "Admin",
    status: 'Active'
  },
  {
    key: '2',
    created: '24/01/2020',
    name: "masty111",
    phone: '08108156732',
    role: "Super Admin",
    status: 'Inactive'
  },
  {
    key: '3',
    created: '24/01/2020',
    name: "starboy",
    phone: '08108156732',
    role: "Admin",
    status: 'Pending'
  },
  {
    key: '4',
    created: '24/01/2020',
    name: "superman",
    phone: '08108156732',
    role: "Admin",
    status: 'Pending'
  },
  {
    key: '5',
    created: '24/01/2020',
    name: "coderboy",
    phone: '08108156732',
    role: "Super Admin",
    status: 'Active'
  },
  {
    key: '6',
    created: '24/01/2020',
    name: "ecran123",
    phone: '08108156732',
    role: "Admin",
    status: 'Active'
  },
  {
    key: '7',
    created: '24/01/2020',
    name: "ecran123",
    phone: '08108156732',
    role: "Admin",
    status: 'Pending'
  },
  {
    key: '8',
    created: '24/01/2020',
    name: "ecran123",
    phone: '08108156732',
    role: "Super Admin",
    status: 'Active'
  },
  {
    key: '9',
    created: '24/01/2020',
    name: "ecran123",
    phone: '08108156732',
    role: "Admin",
    status: 'Active'
  },
  {
    key: '10',
    created: '24/01/2020',
    name: "ecran123",
    phone: '08108156732',
    role: "Admin",
    status: 'Pending'
  },
  {
    key: '11',
    created: '24/01/2020',
    name: "ecran123",
    phone: '08108156732',
    role: "Super Admin",
    status: 'Active'
  },
  {
    key: '12',
    created: '24/01/2020',
    name: "ecran123",
    phone: '08108156732',
    role: "Admin",
    status: 'Active'
  },

]

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const UserCreateForm = ({ visible, onCreate, onCancel, confirmLoading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      centered
      visible={visible}
      title="Create User"
      confirmLoading={confirmLoading}
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="request-form"
        initialValues={{
          approval: 'no',
        }}
      >
        <Form.Item
          name="credentials"
          label="Search for User AD credentials"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input the username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input the phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="profile-picture"
          label="Upload Profile Picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload accept="image/*" name="logo" action="/upload.do" listType="picture">
            <Button>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="role"
          label="Select Role"
          rules={[
            {
              required: true,
              message: 'Please select user role!',
            },
          ]}
        >
          <Select placeholder="Please select a role">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="super">Super Admin</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const Profiling = () => {
  const [form] = Form.useForm();

  // Modal, Form Hooks
  const [visible, toggleModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [showManageUser, setShowManageUser] = useState(false)
  const [details, setDetails] = useState(null)

  const [approveLoading, setApproveLoading] = useState('')

  const handleCreateUser = () => {
    toggleModal(!visible)
  }

  const approveUser = id => {
    setApproveLoading(id)
    setTimeout(() => {
      setDetails(null)
      setShowManageUser(false)
      setApproveLoading(false)
      message.success('Username was approved successfully')
    }, 2000)
  }

  const findDetail = id => {
    return data.find(item => item.key === id)
  }

  const handleManageUser = id => {
    setShowManageUser(!showManageUser)

    const details = findDetail(id)
    setDetails(details)
  }

  const handleCancel = () => {
    toggleModal(false)
    setShowManageUser(false)
  }

  const onCreate = values => {
    setConfirmLoading(true)
    setTimeout(() => {
      toggleModal(false)
      setConfirmLoading(false)
      message.success('User was created successfully')
      console.log('Received values of form: ', values)
    }, 2000)
  }

  const [filterTable, setFilterTable] = useState(null)

  const search = e => {
    const value = e.target.value

    const filterTable = data.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );

    setFilterTable(filterTable);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name)
      }
    },
    {
      title: 'Date Created',
      dataIndex: 'created',
      key: 'created',
      sorter: {
        compare: (a, b) => a.created.localeCompare(b.created)
      }
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      sorter: {
        compare: (a, b) => a.phone.localeCompare(b.phone)
      }
    },
    {
      title: 'Assigned Role',
      dataIndex: 'role',
      key: 'role',
      sorter: {
        compare: (a, b) => a.role.localeCompare(b.role)
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status)
      },
      render: text => <Typography.Text type={text === "Pending" ? "warning" : text === "Inactive" ? "danger" : null} style={text === "Active" ? { color: '#40A9FF' } : null}>{text}</Typography.Text>
    },
    {
      title: 'Action',
      key: 'action',
      width: '12%',
      render: (text, record) =>
        record.status === "Pending" ? (
          <Button key="approve" type="primary" size="small" disabled={approveLoading === record.key} onClick={() => approveUser(record.key)} icon={approveLoading === record.key ? <LoadingOutlined /> : <CheckOutlined />}>Approve</Button>
        ) : (
            <Button type="link" style={{ padding: 0 }} onClick={() => handleManageUser(record.key)}>View Details</Button>
          )

    }
  ]

  return (
    <div>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Profiling</Typography.Title>
            </Col>
            <Col>
              <Space>
                <Button type="default">Batch Upload</Button>
                <Button type="primary" onClick={handleCreateUser}>Create User</Button>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <Input
                prefix={<SearchOutlined />}
                style={{ margin: "0 0 10px 0", width: '300px' }}
                placeholder="Search table..."
                onChange={search}
              />
              <Table columns={columns} dataSource={filterTable == null ? data : filterTable} />
            </Col>
          </Row>
        </Col>
      </Row>
      <UserCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      />
      {details && <Modal
        centered
        visible={showManageUser}
        title="Create User"
        confirmLoading={confirmLoading}
        okText="Submit"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="edit-user-form"
          initialValues={{
            username: details.name,
            phone: details.phone,
          }}
        >
          <Form.Item
            name="username"
            label="Username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Select Role"
          >
            <Select placeholder="Please select a role">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="super">Super Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>}
    </div>
  )
}