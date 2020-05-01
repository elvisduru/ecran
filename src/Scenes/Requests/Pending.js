import React, { useState, useRef } from 'react'
import { Typography, Row, Button, Col, Menu, Dropdown, Modal, message, Table, Input, Space } from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useRouteMatch, Route, useHistory, useParams } from 'react-router-dom';

const data = [
  {
    key: '1',
    name: 'Xmas Promo',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '2',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '3',
    name: 'Xmas Promo',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '4',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '5',
    name: 'Xmas Promo',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '6',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '7',
    name: 'Xmas Promo',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '8',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '9',
    name: 'Xmas Promo',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '10',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    atms: 'Lagos Region',
    status: 'Pending'
  },
  {
    key: '11',
    name: 'Xmas Promo',
    startDate: '25/12/2020',
    endDate: '27/12/2020',
    period: 30,
    atms: 'Lagos Region, South East Region, etc.',
    status: 'Pending'
  },
  {
    key: '12',
    name: 'New Year Promo',
    startDate: '1/1/2020',
    endDate: '27/1/2020',
    period: 30,
    atms: 'Lagos Region',
    status: 'Pending'
  },

]

export const Pending = () => {
  let inputEl = useRef(null)
  const match = useRouteMatch()
  const history = useHistory()

  // Modal, Form Hooks
  const [visible, toggleModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [formType, setFormType] = useState('')

  // Table Hooks
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchColumn] = useState('')

  // Modal, Form Handlers
  const handleMenuClick = ({ item, key }) => {
    toggleModal(!visible)
    setFormType(key)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      toggleModal(false)
      setConfirmLoading(false)
      message.success('Campaign name was created successfully')
    }, 2000)
  }

  const handleCancel = () => {
    toggleModal(false)
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
      render: text => <Typography.Text type="warning">{text}</Typography.Text>

    },
    {
      title: 'Action',
      key: 'action',
      width: '12%',
      render: (text, record) => <Link to={`${match.url}/${record.key}`}>View Details</Link>
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
        <Col span={24} xl={20}>
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
              <Table columns={columns} dataSource={data} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title={`${formType === "internal" ? 'Internal Request Form' : '3rd Party Request Form'}`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <p>Modal Content</p>
      </Modal>
      <Route path={`${match.url}/:id`}>
        <ViewDetail onCancel={() => history.replace(match.url)} />
      </Route>
    </div>
  )
}

const ViewDetail = ({ onCancel }) => {
  let { id } = useParams()
  return <Modal
    title={`Campaign ID ${id}`}
    visible={true}
    onCancel={onCancel}
    onOk={onCancel}
  >
    <p>Modal Content</p>
  </Modal>
}
