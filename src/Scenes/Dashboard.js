import React from 'react'
import { Row, Col, Space, Typography, Card, List } from 'antd'
import Stat from '../components/Stat'
import checkmarkCircleImg from '../images/ionic-ios-checkmark-circle.svg'
import archiveImg from '../images/ionic-ios-archive.svg'
import deleteImg from '../images/material-cancel.svg'
import ActivityList from '../components/ActivityList'
import campaignImg1 from '../images/campaignImg1.jpg'
import campaignImg2 from '../images/campaignImg2.jpg'

const activities = [
  {
    campaign: 'HB Easter Promo',
    action: 'archived',
    time: '3.27',
    user: 'User12345'
  },
  {
    campaign: 'HB Savings Xtra',
    action: 'deleted',
    time: '3.25',
    user: 'User12345'
  },
  {
    campaign: 'GTB Xmas Promo',
    action: 'uploaded',
    time: '3.22',
    user: 'User12345'
  },
  {
    campaign: 'HB Easter Promo',
    action: 'archived',
    time: '3.20',
    user: 'User12345'
  },
  {
    campaign: 'HB Savings Xtra',
    action: 'deleted',
    time: '3.19',
    user: 'User12345'
  },
  {
    campaign: 'HB Savings Lite',
    action: 'deleted',
    time: '3.15',
    user: 'User12345'
  },
]

const campaigns = [
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
  {
    title: 'GTB Xmas Promo',
    image: campaignImg1
  },
  {
    title: 'HB Easter Saver',
    image: campaignImg2
  },
]

export const Dashboard = () => {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Typography.Title level={4}>ATMs</Typography.Title>
          <Space size="large">
            <Stat title="current campaigns" count={3500} icon={checkmarkCircleImg} />
            <Stat title="old campaigns" count={3500} icon={archiveImg} />
            <Stat title="no campaigns" count={3500} icon={deleteImg} />
          </Space>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Recent Activity</Typography.Title>
          <ActivityList activities={activities} />
        </Col>
      </Row>
      <Row style={{ marginTop: '50px' }}>
        <Col span={24}>
          <Card>
            <Typography.Title level={4} style={{ marginBottom: '30px' }}>Current Campaign</Typography.Title>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
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
    </div>
  )
}
