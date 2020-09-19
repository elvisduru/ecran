import React from "react";
import styles from "./Dashboard.module.css";
import { Row, Col, Typography, Card, Carousel, Statistic } from "antd";
import { useSelector } from "react-redux";
import { selectAllScreens } from "./Campaigns/screensSlice";

export const Dashboard = () => {
  const screens = useSelector(selectAllScreens);
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
      <Row justify="space-between" style={{ marginTop: "30px" }}>
        <Col span={4}>
          <Card bodyStyle={{ height: "140px", textAlign: "center" }}>
            <Statistic
              valueStyle={{ fontSize: "40px", color: "#008C00" }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              title="Current Campaign"
              value={new Intl.NumberFormat("en", {
                notation: "compact",
              }).format(367)}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: "140px", textAlign: "center" }}>
            <Statistic
              valueStyle={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.4" }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              title="Old Campaign"
              value={new Intl.NumberFormat("en", {
                notation: "compact",
              }).format(367)}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: "140px", textAlign: "center" }}>
            <Statistic
              valueStyle={{ fontSize: "40px", color: "rgb(255, 9, 9)" }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              title="No Campaign"
              value={new Intl.NumberFormat("en", {
                notation: "compact",
              }).format(367)}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: "140px", textAlign: "center" }}>
            <Statistic
              valueStyle={{ fontSize: "40px", color: "brown" }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              title="Incomplete Default Screen"
              value={new Intl.NumberFormat("en", {
                notation: "compact",
              }).format(367)}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bodyStyle={{ height: "140px", textAlign: "center" }}>
            <Statistic
              valueStyle={{ fontSize: "40px" }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
              title="No Default Screen"
              value={new Intl.NumberFormat("en", {
                notation: "compact",
              }).format(367)}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
