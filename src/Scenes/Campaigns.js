import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import { Row, Col, Typography, Button, Form, Modal, Upload, message, Input, Table, Carousel } from 'antd'
import { EyeOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';
import campaignImg1 from '../images/campaignImg1.jpg'
import campaignImg2 from '../images/campaignImg2.jpg'

import atms from '../atm-list.json'

import ad1 from '../images/ad1.png'
import ad2 from '../images/ad2.png'
import ad3 from '../images/PIC301.png'

import moreTime from '../images/PIC000.png'
import outOfService from '../images/PIC002.png'
import serviceInProgress from '../images/PIC003.png'
import welcome from '../images/PIC010.png'
import enterPin from '../images/PIC016.png'
import wrongPin from '../images/PIC017.png'
import whatToDo from '../images/PIC018.png'
import chooseAmt from '../images/PIC019.png'
import whatToDo2 from '../images/PIC022.png'
import chooseAcct from '../images/PIC023.png'
import transferFrom from '../images/PIC025.png'
import transferTo2 from '../images/PIC026.png'
import enterAmtWithdraw from '../images/PIC031.png'
import enterAmtTransfer from '../images/PIC034.png'
import transactionInProgress from '../images/PIC046.png'
import noCash from '../images/PIC049.png'
import transactionCancelled from '../images/PIC051.png'
import transactionCompleted from '../images/PIC053.png'
import balance from '../images/PIC054.png'
import thankYou from '../images/PIC065.png'
import invalidCard from '../images/PIC067.png'
import connectBankError from '../images/PIC079.png'
import changePin from '../images/PIC081.png'
import changePin2 from '../images/PIC082.png'
import takeCash from '../images/PIC086.png'
import wantReceipt from '../images/PIC128.png'
import transferTo from '../images/PIC154.png'
import chooseOption from '../images/PIC527.png'
import chooseNetwork from '../images/PIC531.png'
import choosePayment from '../images/PIC539.png'
import enterAccount from '../images/PIC660.png'

const screens = [
  {
    title: 'Do You Want More Time',
    image: moreTime
  },
  {
    title: 'Out of service',
    image: outOfService
  },
  {
    title: 'Service In Progress',
    image: serviceInProgress
  },
  {
    title: 'welcome',
    image: welcome
  },
  {
    title: 'Please enter your pin',
    image: enterPin
  },
  {
    title: 'Please re-enter your pin',
    image: wrongPin
  },
  {
    title: 'what would you like to do',
    image: whatToDo
  },
  {
    title: 'Choose amount',
    image: chooseAmt
  },
  {
    title: 'what would you like to do (2)',
    image: whatToDo2
  },
  {
    title: 'Choose account',
    image: chooseAcct
  },
  {
    title: 'which account are you transferring from?',
    image: transferFrom
  },
  {
    title: 'which account are you transferring to?',
    image: transferTo2
  },
  {
    title: 'enter the amount',
    image: enterAmtWithdraw
  },
  {
    title: 'enter amount to transfer',
    image: enterAmtTransfer
  },
  {
    title: 'transaction in progress',
    image: transactionInProgress
  },
  {
    title: 'No cash',
    image: noCash
  },
  {
    title: 'transaction cancelled',
    image: transactionCancelled
  },
  {
    title: 'transaction completed',
    image: transactionCompleted
  },
  {
    title: 'Account Balance',
    image: balance
  },
  {
    title: 'thank you',
    image: thankYou
  },
  {
    title: 'Invalid Card',
    image: invalidCard
  },
  {
    title: 'Cannot connect with bank',
    image: connectBankError
  },
  {
    title: 'Change Pin',
    image: changePin
  },
  {
    title: 'Confirm Pin',
    image: changePin2
  },
  {
    title: 'Take Cash',
    image: takeCash
  },
  {
    title: 'Do you want receipt?',
    image: wantReceipt
  },
  {
    title: 'Transfer To...',
    image: transferTo
  },
  {
    title: 'please choose an option',
    image: chooseOption
  },
  {
    title: 'please choose your network',
    image: chooseNetwork
  },
  {
    title: 'choose what you are paying for',
    image: choosePayment
  },
  {
    title: 'enter account number you are sending to',
    image: enterAccount
  },
]

const ads = [
  {
    title: 'Idle Screen',
    image: ad1
  },
  {
    title: 'Idle Screen',
    image: ad2
  },
  {
    title: 'Idle Screen',
    image: ad3
  }
]

const data = atms.map(atm => {
  atm.defaultScreen = campaignImg1
  atm.screen = campaignImg2
  atm.key = atm["S/N"]
  return atm
})

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

export const Campaigns = () => {
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
      title: 'S/N',
      dataIndex: 'S/N',
      key: 'S/N',
      sorter: {
        compare: (a, b) => a['S/N'] - b['S/N']
      }
    },
    {
      title: 'Terminal ID',
      dataIndex: 'Terminal ID',
      key: 'Terminal ID',
      sorter: {
        compare: (a, b) => a['Terminal ID'] - b['Terminal ID']
      }
    },
    {
      title: 'Sol ID',
      dataIndex: 'Sol ID',
      key: 'Sol ID',
      sorter: {
        compare: (a, b) => a['Sol ID'] - b['Sol ID']
      }
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
      sorter: {
        compare: (a, b) => a['Location'].localeCompare(b['Location'])
      }
    },
    {
      title: 'Last Txn Date',
      dataIndex: 'Last Txn Date',
      key: 'Last Txn Date',
      sorter: {
        compare: (a, b) => a['Last Txn Date'].localeCompare(b['Last Txn Date'])
      }
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      sorter: {
        compare: (a, b) => a['Status'].localeCompare(b['Status'])
      },
      render: text => <Typography.Text type={text === "OFFLINE" ? "danger" : null} style={text === "ACTIVE" ? { color: '#008C00' } : null}>{text}</Typography.Text>
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      sorter: {
        compare: (a, b) => a['Address'].localeCompare(b['Address'])
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
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      sorter: {
        compare: (a, b) => a['Type'].localeCompare(b['Type'])
      }
    },
    {
      title: 'IP Address',
      dataIndex: 'IP Address',
      key: 'IP Address',
      sorter: {
        compare: (a, b) => a['IP Address'].localeCompare(b['IP Address'])
      }
    },
    {
      title: 'Location Type',
      dataIndex: 'Location Type',
      key: 'Location Type',
      sorter: {
        compare: (a, b) => a['Location Type'].localeCompare(b['Location Type'])
      }
    },
    {
      title: 'State',
      dataIndex: 'State',
      key: 'State',
      sorter: {
        compare: (a, b) => a['State'].localeCompare(b['State'])
      }
    },
    {
      title: 'Region',
      dataIndex: 'Region',
      key: 'Region',
      sorter: {
        compare: (a, b) => a['Region'].localeCompare(b['Region'])
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
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
      <Row gutter={[24, 12]}>
        <Col span={12}>
          <Row>
            <Col offset={20}>
              <Typography.Text disabled strong>Advert Screens</Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Carousel
                autoplay
              >
                {ads.map(({ title, image }, index) =>
                  <div className={styles.Slide}
                    key={`${title}-screen-${index}`}
                    style={{
                      backgroundColor: '#4a9c8c',
                    }}
                  >
                    <img src={image} alt="" />
                    <div data-type="caption">
                      <p>{title}</p>
                    </div>
                  </div>
                )}
              </Carousel>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col offset={20}>
              <Typography.Text disabled strong>Default Screens</Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Carousel
                autoplay
              >
                {screens.map(({ title, image }, index) =>
                  <div className={styles.Slide}
                    key={`${title}-screen-${index}`}
                    style={{
                      backgroundColor: '#4a9c8c',
                    }}
                  >
                    <img src={image} alt="" />
                    <div data-type="caption">
                      <p>{title}</p>
                    </div>
                  </div>
                )}
              </Carousel>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: '60px' }}>
        <Col span={24}>
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
              <Input
                prefix={<SearchOutlined />}
                style={{ margin: "0 0 10px 0", width: '300px' }}
                placeholder="Search table..."
                onChange={search}
              />
              <Table scroll={{ x: 1500 }} columns={columns} dataSource={filterTable == null ? data : filterTable} size="small" />
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
