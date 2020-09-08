import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Select,
  Space,
  Card,
  Statistic,
  Tooltip,
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectATMBYID } from "./atmsSlice";

import styles from "../../Scenes/Dashboard.module.css";

export const Screens = () => {
  const { id } = useParams();
  const atm = useSelector((state) => selectATMBYID(state, id));

  const [screenA, setScreenA] = useState("PIC010");
  const [screenD, setScreenD] = useState("PIC000");

  const { Option } = Select;

  const history = useHistory();

  const advertScreens = ["PIC010", "PIC065", "PIC068"];

  return (
    <div>
      <Row gutter={[0, 24]}>
        <Col onClick={() => history.goBack()}>
          <Typography.Title level={4}>
            Monitoring - ATM ({atm["Terminal ID"]})
          </Typography.Title>
        </Col>
      </Row>
      <Row gutter={[24, 12]}>
        <Col span={12}>
          <Row gutter={[0, 14]}>
            <Col>
              <Typography.Text disabled strong>
                Advert Screens
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Space style={{ width: "100%" }} direction="vertical">
                <Select
                  showSearch
                  style={{ width: 300 }}
                  placeholder="Select a screen"
                  optionFilterProp="children"
                  onChange={(value) => setScreenA(value)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={screenA}
                >
                  {Object.keys(atm.screens)
                    .filter((key) => advertScreens.includes(key))
                    .map((key) => (
                      <Option key={key} value={key}>
                        {atm.screens[key].title}
                      </Option>
                    ))}
                </Select>
                <div
                  className={styles.Slide}
                  style={{
                    backgroundColor: "#4a9c8c",
                  }}
                >
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/ecran-fe278.appspot.com/o/atms%2F${atm["Terminal ID"]}%2FS4PICT%2F${atm.screens[screenA].fileName}.png?alt=media`}
                    alt=""
                  />
                  <div data-type="caption">
                    <p>{atm.screens["PIC010"].title}</p>
                  </div>
                </div>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[0, 14]}>
            <Col>
              <Typography.Text disabled strong>
                Default Screens
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Space style={{ width: "100%" }} direction="vertical">
                <Select
                  showSearch
                  style={{ width: 300 }}
                  placeholder="Select a screen"
                  optionFilterProp="children"
                  onChange={(value) => setScreenD(value)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={screenD}
                >
                  {Object.keys(atm.screens)
                    .filter((key) => !advertScreens.includes(key))
                    .map((key) => (
                      <Option key={key} value={key}>
                        {atm.screens[key].title}
                      </Option>
                    ))}
                </Select>
                <div
                  className={styles.Slide}
                  style={{
                    backgroundColor: "#4a9c8c",
                  }}
                >
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/ecran-fe278.appspot.com/o/atms%2F${atm["Terminal ID"]}%2FS4PICT%2F${atm.screens[screenD].fileName}.png?alt=media`}
                    alt=""
                  />
                  <div data-type="caption">
                    <p>{atm.screens["PIC010"].title}</p>
                  </div>
                </div>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: "30px" }}>
        <Col span={4}>
          <Tooltip
            title={`${atm.stats.currentCampaign
              .map((screen) => screen.title)
              .toString()}`}
          >
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
                value={atm.stats.currentCampaign.length}
              />
            </Card>
          </Tooltip>
        </Col>
        <Col span={4}>
          <Tooltip
            title={`${atm.stats.oldCampaign
              .map((screen) => screen.title)
              .toString()}`}
          >
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
                value={atm.stats.oldCampaign.length}
              />
            </Card>
          </Tooltip>
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
              value={atm.stats.noCampaign ? "true" : "false"}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Tooltip
            title={`${atm.stats.incompleteScreens
              .map((screen) => screen.name)
              .toString()}`}
          >
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
                value={atm.stats.incompleteScreens.length}
              />
            </Card>
          </Tooltip>
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
              title="No Default Screen"
              value={atm.stats.noScreen ? "true" : "false"}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
