import React, { useState } from 'react'
import { Typography, Row, Button, Col, Table, Input, Modal, Form, message, Upload } from 'antd'
import { EyeOutlined, UploadOutlined } from '@ant-design/icons';
import campaignScreen1 from '../../images/campaignImg1.jpg'
import campaignScreen2 from '../../images/campaignImg2.jpg'

const data = [
  {
    key: '1',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Active'
  },
  {
    key: '2',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Declined'
  },
  {
    key: '3',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'GTB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Pending'
  },
  {
    key: '4',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Pending'
  },
  {
    key: '5',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Active'
  },
  {
    key: '6',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Active'
  },
  {
    key: '7',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Pending'
  },
  {
    key: '8',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Active'
  },
  {
    key: '9',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Active'
  },
  {
    key: '10',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Pending'
  },
  {
    key: '11',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Active'
  },
  {
    key: '12',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignScreen1,
    screen: campaignScreen2,
    status: 'Active'
  },

]

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

export const Maintenance = () => {
  // Preview
  const [preview, setPreview] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const handlePreview = image => {
    setPreviewImage(image)
    setPreview(!preview)
  }

  // Upload Screen Hooks
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleUploadScreen = () => {
    setVisible(!visible)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onCreate = values => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
      message.success('User was created successfully')
      console.log('Received values of form: ', values)
    }, 2000)
  }

  const ScreenUploadForm = ({ visible, onCreate, onCancel, confirmLoading }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        centered
        visible={visible}
        title="Upload Campaign Screen"
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
            name="terminal"
            label="Terminal ID"
            rules={[
              {
                required: true,
                message: "Please input the terminal ID!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="screen"
            label="Upload Screen"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload accept="image/*" name="logo" action="/upload.do" listType="picture">
              <Button>
                <UploadOutlined /> Click to upload
            </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const [filterTable, setFilterTable] = useState(null)

  const search = value => {
    console.log("PASS", { value });

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
      title: 'Terminal ID',
      dataIndex: 'id',
      key: 'id',
      sorter: {
        compare: (a, b) => a.id.localeCompare(b.id)
      }
    },
    {
      title: 'Short Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name)
      }
    },
    {
      title: 'Last Trasaction',
      dataIndex: 'lastTransaction',
      key: 'lastTransaction',
      sorter: {
        compare: (a, b) => a.lastTransaction.localeCompare(b.lastTransaction)
      }
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
      sorter: {
        compare: (a, b) => a.ip.localeCompare(b.ip)
      }
    },
    {
      title: 'Default Screen',
      dataIndex: 'defaultScreen',
      key: 'defaultScreen',
      render: text => (
        <div className="preview-card" style={{ width: "50px", height: "50px", padding: '3px' }} onClick={() => handlePreview(text)}>
          <img src={text} alt="campaign" />
          <span>
            <Button icon={<EyeOutlined />} type="ghost" style={{ border: 0, color: "#fff" }} />
          </span>
        </div>
      )
    },
    {
      title: 'Campaign Screen',
      dataIndex: 'screen',
      key: 'screen',
      render: text => (
        <div className="preview-card" style={{ width: "50px", height: "50px", padding: '3px' }} onClick={() => handlePreview(text)}>
          <img src={text} alt="campaign" />
          <span>
            <Button icon={<EyeOutlined />} type="ghost" style={{ border: 0, color: "#fff" }} />
          </span>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: {
        compare: (a, b) => a.status.localeCompare(b.status)
      },
      render: text => <Typography.Text type={text === "Pending" ? "warning" : text === "Declined" ? "danger" : null} style={text === "Active" ? { color: '#40A9FF' } : null}>{text}</Typography.Text>
    },
    {
      title: 'Action',
      key: 'action',
      width: '12%',
      render: text => <Button type="primary" size="small">Modify</Button>
    }
  ]

  return (
    <div>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Maintenance</Typography.Title>
            </Col>
            <Col>
              <Button type="primary" onClick={handleUploadScreen}>Upload Screen</Button>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <Input.Search
                style={{ margin: "0 0 10px 0", width: '300px' }}
                placeholder="Search table..."
                enterButton
                onSearch={search}
              />
              <Table columns={columns} dataSource={filterTable == null ? data : filterTable} />
            </Col>
          </Row>
        </Col>
      </Row>
      <ScreenUploadForm
        visible={visible}
        onCreate={onCreate}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      />
      {previewImage && <Modal
        visible={preview}
        footer={null}
        onCancel={handlePreview}
      >
        <img alt="campaign" style={{ width: '100%' }} src={previewImage} />
      </Modal>}
    </div>
  )
}