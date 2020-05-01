import React, { useState, useRef } from 'react'
import { Typography, Row, Button, Col, message, Table, Input, Space } from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ViewDetails from '../../components/ViewDetails';
import campaignScreen from '../../images/campaignImg1.jpg'

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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
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
    status: 'Approved'
  },

]

export const Approved = () => {
  let inputEl = useRef(null)

  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState(null)
  const [declineLoading, setDeclineLoading] = useState(false)
  const [undoApproveLoading, setUndoApproveLoading] = useState(false)

  // Table Hooks
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')

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

  const undoApproveCampaign = () => {
    setUndoApproveLoading(true)
    setTimeout(() => {
      setDetails(null)
      setShowDetails(false)
      setUndoApproveLoading(false)
      message.success('Campaign name was unapproved successfully')
    }, 2000)
  }

  const handleCancel = () => {
    setShowDetails(false)
  }

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
      title: 'Campaign Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: '12%',
      ...getColumnSearchProps('startDate'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: '12%',
      ...getColumnSearchProps('endDate'),
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      width: '5%',
      ...getColumnSearchProps('period'),
    },
    {
      title: 'ATM of Interest',
      dataIndex: 'atms',
      key: 'atms',
      // width: '30%',
      ...getColumnSearchProps('atms'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // width: '20%',
      render: text => <Typography.Text style={{ color: '#40A9FF' }}>{text}</Typography.Text>
    },
    {
      title: 'Action',
      key: 'action',
      width: '12%',
      render: (text, record) => <Button type="link" style={{ padding: 0 }} onClick={() => handleDetails(record.key)}>View Details</Button>
    }
  ]

  return (
    <div>
      <Row>
        <Col span={24} xl={20}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Approved Requests</Typography.Title>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <Table columns={columns} dataSource={data} />
            </Col>
          </Row>
        </Col>
      </Row>
      {details && <ViewDetails
        details={details}
        visible={showDetails}
        onDecline={declineCampaign}
        onApprove={undoApproveCampaign}
        handleCancel={handleCancel}
        confirmLoading={undoApproveLoading}
        declineLoading={declineLoading}
        okText="Undo Approve"
      />}
    </div>
  )
}