import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { Row, Col, Typography, Card, Carousel, Statistic } from 'antd'

import ad1 from '../images/ad1.png'
import ad2 from '../images/ad2.png'
import ad3 from '../images/PIC301.png'

import { fetchScreens } from '../helpers'


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
  const [screens, setScreens] = useState(null)

  useEffect(() => {
    fetchScreens().then(screens => setScreens(screens))
  }, [])

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
                effect="fade"
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
                effect="fade"
              >
                {screens && screens.map(({ title, src }, index) =>
                  <div className={styles.Slide}
                    key={`${title}-screen-${index}`}
                    style={{
                      backgroundColor: '#4a9c8c',
                    }}
                  >
                    <img src={src} alt="" />
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
          <Card bodyStyle={{ height: '140px', textAlign: 'center' }}>
            <Statistic valueStyle={{ fontSize: '40px', color: '#008C00' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Current Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px', textAlign: 'center' }}>
            <Statistic valueStyle={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.4' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Old Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px', textAlign: 'center' }}>
            <Statistic valueStyle={{ fontSize: '40px', color: 'rgb(255, 9, 9)' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="No Campaign" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px', textAlign: 'center' }}>
            <Statistic valueStyle={{ fontSize: '40px', color: 'brown' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="Incomplete Default Screen" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: '140px', textAlign: 'center' }}>
            <Statistic valueStyle={{ fontSize: '40px' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} title="No Default Screen" value={new Intl.NumberFormat('en', { notation: "compact" }).format(367)} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
