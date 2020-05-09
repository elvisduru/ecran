import React from 'react'
import styles from './Dashboard.module.css'
import { Row, Col, Typography, Card, Carousel, Statistic } from 'antd'

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

export const Dashboard = () => {
  // const [slided, setSlided] = useState(false)
  return (
    <div>
      <Row>
        <Col>
          <Typography.Title level={4}>Dashboard</Typography.Title>
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
      <Row justify="space-between" style={{ marginTop: '30px' }}>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '40px', color: '#008C00' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Current Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.4' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Old Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '40px', color: 'rgb(255, 9, 9)' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="No Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '40px', color: 'brown' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Incomplete Default Screen" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '40px' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="No Default Screen" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
