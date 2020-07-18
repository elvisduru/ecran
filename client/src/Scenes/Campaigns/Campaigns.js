import React from "react";
import styles from "../../Scenes/Dashboard.module.css";
import { Row, Col, Typography, Card, Carousel, Statistic } from "antd";
import { useSelector } from "react-redux";
import { selectAllScreens } from "./screensSlice";

export const Campaigns = () => {
  const screens = useSelector(selectAllScreens);
  return (
    <div>
      <Row>
        <Col>
          <Typography.Title level={4}>Active Campaigns</Typography.Title>
        </Col>
      </Row>
      <Row gutter={[24, 12]}>
        <Col span={12}>
          <Row>
            <Col offset={20}>
              <Typography.Text disabled strong>
                Advert Screens
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Carousel autoplay effect="fade">
                {screens
                  .filter((x) => x.type === "Advert")
                  .map(({ title, src }, index) => (
                    <div
                      className={styles.Slide}
                      key={`${title}-screen-${index}`}
                      style={{
                        backgroundColor: "#4a9c8c",
                      }}
                    >
                      <img src={src} alt="" />
                      <div data-type="caption">
                        <p>{title}</p>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col offset={20}>
              <Typography.Text disabled strong>
                Default Screens
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Carousel autoplay effect="fade">
                {screens &&
                  screens
                    .filter((x) => x.type === "Default")
                    .map(({ title, src }, index) => (
                      <div
                        className={styles.Slide}
                        key={`${title}-screen-${index}`}
                        style={{
                          backgroundColor: "#4a9c8c",
                        }}
                      >
                        <img src={src} alt="" />
                        <div data-type="caption">
                          <p>{title}</p>
                        </div>
                      </div>
                    ))}
              </Carousel>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
