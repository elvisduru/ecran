import React, { useState } from 'react'
import { Typography, Row, Button, Col, message, Table, Input } from 'antd'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
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
    status: 'Declined'
  },

]

export const Declined = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [details, setDetails] = useState(null)
  const [undoDeclineLoading, setUndoDeclineLoading] = useState(false)

  const findDetail = id => {
    return data.find(item => item.key === id)
  }

  const handleDetails = id => {
    setShowDetails(!showDetails)

    const details = findDetail(id)
    setDetails(details)
  }

  const undoApproveCampaign = () => {
    setUndoDeclineLoading(true)
    setTimeout(() => {
      setDetails(null)
      setShowDetails(false)
      setUndoDeclineLoading(false)
      message.success('Campaign name was undone successfully')
    }, 2000)
  }

  const handleCancel = () => {
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
      render: text => <Typography.Text type="danger">{text}</Typography.Text>

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
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Declined Requests</Typography.Title>
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
      {details && <ViewDetails
        details={details}
        visible={showDetails}
        onApprove={undoApproveCampaign}
        handleCancel={handleCancel}
        confirmLoading={undoDeclineLoading}
        okText="Undo Decline"
        cancelBtn
      />}
    </div>
  )
}