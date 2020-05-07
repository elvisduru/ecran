import React, { useState } from 'react'
import { Typography, Row, Button, Col, Menu, Dropdown, Modal, message, Table, Input, Form, DatePicker, Radio, Upload, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import ViewDetails from '../../components/ViewDetails';
import campaignScreen from '../../images/campaignImg1.jpg'

const { RangePicker } = DatePicker

const data = [
  {
    key: '1',
    requester: 'HB Ikeja',
    name: 'Xmas Promo',
    customer: 'Heritage Bank',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '2',
    requester: 'HB Ikeja',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '3',
    requester: 'GTB Ikeja',
    name: 'Xmas Promo',
    customer: 'GT Bank',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '4',
    requester: 'HB Ikeja',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '5',
    requester: 'HB Ikeja',
    name: 'Xmas Promo',
    customer: 'Heritage Bank',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '6',
    requester: 'HB Ikeja',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '7',
    requester: 'HB Ikeja',
    name: 'Xmas Promo',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '8',
    requester: 'HB Ikeja',
    name: 'New Year Promo',
    customer: 'Heritage Bank',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '9',
    requester: 'HB Ikeja',
    name: 'Xmas Promo',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '10',
    requester: 'HB Ikeja',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '11',
    requester: 'HB Ikeja',
    name: 'Xmas Promo',
    customer: 'Heritage Bank',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '12',
    requester: 'HB Ikeja',
    name: 'New Year Promo',
    customer: 'Heritage Bank',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    screen: campaignScreen,
    atms: 'Lagos Region',
    status: 'Pending'
  },

]


const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const RequestCreateForm = ({ visible, onCreate, onCancel, requestType, confirmLoading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      centered
      visible={visible}
      title={`${requestType === "internal" ? 'Internal Request Form' : '3rd Party Request Form'}`}
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
          name="requester-name"
          label="Requester's Name"
          rules={[
            {
              required: true,
              message: "Please input the requester's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {requestType === "3rd-party" && (
          <Form.Item
            name="customer-name"
            label="Customer's Name"
            rules={[
              {
                required: true,
                message: "Please input the customer's name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="campaign-name"
          label="Campaign Name"
          rules={[
            {
              required: true,
              message: "Please input the campaign name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="campaign-screen"
          label="Upload Campaign Screen"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload campaign screen!",
            },
          ]}
        >
          <Upload accept="image/*,video/*" name="logo" action="/upload.do" listType="picture">
            <Button>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="atm-reqion"
          label="ATM of Interest"
          rules={[
            {
              required: true,
              message: "Please select ATMs of Interest!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date-range"
          label="Select Date Range"
          rules={[
            {
              required: true,
              message: "Please select date range!",
            },
          ]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          name="region"
          label="Select Region"
          rules={[
            {
              required: true,
              message: 'Please select your country!',
            },
          ]}
        >
          <Select placeholder="Please select a region">
            <Select.Option value="lagos-island">Lagos Island</Select.Option>
            <Select.Option value="lagos-mainland">Lagos Mainland</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="approval" className="request-create-form_last-form-item" label="Has GH Approval?">
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const Pending = () => {
  // Modal, Form Hooks
  const [visible, toggleModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [requestType, setRequestType] = useState('')

  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState(null)
  const [declineLoading, setDeclineLoading] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)

  // Modal, Form Handlers
  const handleMenuClick = ({ item, key }) => {
    toggleModal(!visible)
    setRequestType(key)
  }

  const findDetail = id => {
    return data.find(item => item.key === id)
  }

  const handleDetails = id => {
    setShowDetails(!showDetails)

    const details = findDetail(id)
    setDetails(details)
  }

  const declineCampaign = () => {
    setDeclineLoading(true)
    setTimeout(() => {
      setDetails(null)
      setShowDetails(false)
      setDeclineLoading(false)
      message.success('Campaign name was declined successfully')
    }, 2000)
  }

  const approveCampaign = () => {
    setApproveLoading(true)
    setTimeout(() => {
      setDetails(null)
      setShowDetails(false)
      setApproveLoading(false)
      message.success('Campaign name was approved successfully')
    }, 2000)
  }

  const onCreate = values => {
    setConfirmLoading(true)
    setTimeout(() => {
      toggleModal(false)
      setConfirmLoading(false)
      message.success('Campaign name was created successfully')
      console.log('Received values of form: ', values)
    }, 2000)
  }

  const handleCancel = () => {
    toggleModal(false)
    setShowDetails(false)
  }

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
      title: 'Campaign Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name)
      }
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: '12%',
      sorter: {
        compare: (a, b) => a.startDate.localeCompare(b.startDate)
      }
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: '12%',
      sorter: {
        compare: (a, b) => a.endDate.localeCompare(b.endDate)
      }
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      width: '5%',
      sorter: {
        compare: (a, b) => a.period.localeCompare(b.period)
      }
    },
    {
      title: 'ATM of Interest',
      dataIndex: 'atms',
      key: 'atms',
      sorter: {
        compare: (a, b) => a.atms.localeCompare(b.atms)
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <Typography.Text type="warning">{text}</Typography.Text>
    },
    {
      title: 'Action',
      key: 'action',
      width: '12%',
      render: (text, record) => <Button type="link" style={{ padding: 0 }} onClick={() => handleDetails(record.key)}>View Details</Button>
    }
  ]

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="internal">Internal Request</Menu.Item>
      <Menu.Item key="3rd-party">3rd Party Request</Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Pending Requests</Typography.Title>
            </Col>
            <Col>
              <Dropdown overlay={menu}>
                <Button type="primary">New Request</Button>
              </Dropdown>
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
      <RequestCreateForm
        requestType={requestType}
        visible={visible}
        onCreate={onCreate}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      />
      {details && <ViewDetails
        details={details}
        visible={showDetails}
        onDecline={declineCampaign}
        onApprove={approveCampaign}
        handleCancel={handleCancel}
        confirmLoading={approveLoading}
        declineLoading={declineLoading}
        okText="Approve"
      />}
    </div>
  )
}