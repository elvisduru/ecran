import React, { useState, useRef } from 'react'
import { Row, Col, Typography, Card, List, Button, Form, Modal, Upload, message, Input, Table, Space } from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import campaignImg1 from '../images/campaignImg1.jpg'
import campaignImg2 from '../images/campaignImg2.jpg'

const campaigns = [
  {
    title: 'HB Easter Saver',
    image: campaignImg2
  },
  {
    title: 'HB Easter Saver',
    image: campaignImg2
  },
  {
    title: 'GTB Xmas Promo',
    image: campaignImg1
  },
  {
    title: 'HB Easter Saver',
    image: campaignImg2
  },
  {
    title: 'GTB Xmas Promo',
    image: campaignImg1
  },
  {
    title: 'HB Easter Saver',
    image: campaignImg2
  },
]


const data = [
  {
    key: '1',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Active'
  },
  {
    key: '2',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Declined'
  },
  {
    key: '3',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'GTB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Pending'
  },
  {
    key: '4',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Pending'
  },
  {
    key: '5',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Active'
  },
  {
    key: '6',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Active'
  },
  {
    key: '7',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Pending'
  },
  {
    key: '8',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Active'
  },
  {
    key: '9',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Active'
  },
  {
    key: '10',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Pending'
  },
  {
    key: '11',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
    status: 'Active'
  },
  {
    key: '12',
    id: '1234567890',
    ip: '121.456.78.212',
    name: 'HB Ikeja',
    lastTransaction: '24/01/2020 0:00',
    defaultScreen: campaignImg1,
    screen: campaignImg2,
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

export const Campaigns = () => {
  let inputEl = useRef(null)

  // Preview
  const [preview, setPreview] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const handlePreview = image => {
    setPreviewImage(image)
    setPreview(!preview)
  }

  // Table Hooks
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')

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

  // Table Handlers
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            inputEl = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => inputEl.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }


  const columns = [
    {
      title: 'Terminal ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Short Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Last Trasaction',
      dataIndex: 'lastTransaction',
      key: 'lastTransaction',
      ...getColumnSearchProps('lastTransaction'),
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
      ...getColumnSearchProps('ip'),
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
      ...getColumnSearchProps('status'),
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
      <Row gutter={[16, 16]}>
        <Col>
          <Typography.Title level={4}>Current Campaigns</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24} xl={20}>
          <Card>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 6,
                lg: 6,
                xl: 6,
                xxl: 3,
              }}
              dataSource={campaigns}
              renderItem={item => (
                <List.Item>
                  <Card hoverable cover={<img src={item.image} alt={item.title} />}>
                    <Card.Meta description={item.title} />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: '60px' }}>
        <Col span={24} xl={20}>
          <Row gutter={[16, 20]}>
            <Col flex="auto">
              <Typography.Title level={4}>All Campaigns</Typography.Title>
            </Col>
            <Col>
              <Button type="primary" onClick={handleUploadScreen}>Upload Screen</Button>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <Table columns={columns} dataSource={data} />
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
