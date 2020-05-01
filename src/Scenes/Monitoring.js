import React, { useState, useRef } from 'react'
import { Typography, Row, Button, Col, Table, Input, Space, Modal } from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import campaignScreen1 from '../images/campaignImg1.jpg'
import campaignScreen2 from '../images/campaignImg2.jpg'

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

export const Monitoring = () => {
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
    }
  ]

  return (
    <div>
      <Row>
        <Col span={24} xl={20}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>Monitoring</Typography.Title>
            </Col>
          </Row>
          <Row>
            <Col flex="auto">
              <Table columns={columns} dataSource={data} />
            </Col>
          </Row>
        </Col>
      </Row>
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