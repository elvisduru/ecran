import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import { Row, Col, Space, Typography, Card, List, Carousel, Statistic } from 'antd'
import Stat from '../components/Stat'
import checkmarkCircleImg from '../images/ionic-ios-checkmark-circle.svg'
import archiveImg from '../images/ionic-ios-archive.svg'
import deleteImg from '../images/material-cancel.svg'
import ActivityList from '../components/ActivityList'
import campaignImg1 from '../images/campaignImg1.jpg'

import ad1 from '../images/ad1.jpg'
import ad2 from '../images/ad2.jpg'
import ad3 from '../images/ad3.jpg'
import ad4 from '../images/ad4.jpg'
import ad5 from '../images/ad5.jpg'

const campaigns = [
  {
    title: 'Idle Screen',
    image: ad1
  },
  {
    title: 'Welcome Screen',
    image: ad2
  },
  {
    title: 'Please Enter Pin Screen',
    image: ad3
  },
  {
    title: 'Please Wait Screen',
    image: ad4
  },
  {
    title: 'Unable to Dispense Screen',
    image: ad5
  },
  {
    title: 'Thank You Screen',
    image: campaignImg1
  },
]

export const Dashboard = () => {
  // const [slided, setSlided] = useState(false)
  return (
    <div>
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
                {campaigns.map(({ title, image }, index) =>
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
                {campaigns.map(({ title, image }, index) =>
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
      <Row justify="space-between">
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '30px', color: '#008C00' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Current Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '30px', color: 'rgba(0, 0, 0, 0.4' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Old Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '30px', color: 'rgb(255, 9, 9)' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="No Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '30px', color: 'brown' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Incomplete Default Screen" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px' }}>
            <Statistic valueStyle={{ fontSize: '30px' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="No Default Screen" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
