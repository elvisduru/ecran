import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Button, Space, Select } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectRequestById } from "../Requests/requestsSlice";
import { selectAllScreens } from "./screensSlice";
import styles from "../../Scenes/Dashboard.module.css";

export const Replace = () => {
  const { id } = useParams();
  const { Option } = Select;
  const request = useSelector((state) => selectRequestById(state, id));
  const screens = useSelector(selectAllScreens)
    .filter((x) => x.type === request.campaignType)
    .map(({ _id, src, title }) => ({ _id, src, title }));

  const defaultSrc = screens.find((x) => x.title === request.selectedScreen)
    .src;
  const defaultScreen = [request.selectedScreen, defaultSrc];
  const [screen, setScreen] = useState(defaultScreen);

  return (
    <div>
      <Row gutter={[0, 24]}>
        <Col>
          <Typography.Title level={4}>
            Replace {request.campaignType} Screen
          </Typography.Title>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={10}>
          <Space style={{ width: "100%" }} direction="vertical">
            <Button type="default">{request.campaignName} Screen</Button>
            <div
              className={styles.Slide}
              style={{
                backgroundColor: "#4a9c8c",
              }}
            >
              <img src={request.campaignScreen} alt="" />
              <div data-type="caption">
                <p>{request.campaignName}</p>
              </div>
            </div>
          </Space>
        </Col>
        <Col flex={1} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            size="large"
            title="Replace Screen"
            icon={<SwapOutlined />}
          >
            Replace
          </Button>
        </Col>
        <Col span={10}>
          <Space style={{ width: "100%" }} direction="vertical">
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select a screen"
              optionFilterProp="children"
              onChange={(value) => setScreen(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={defaultScreen}
            >
              {screens.map(({ _id, title, src }) => (
                <Option key={_id} value={[title, src]}>
                  {title}
                </Option>
              ))}
            </Select>
            <div
              className={styles.Slide}
              style={{
                backgroundColor: "#4a9c8c",
              }}
            >
              <img src={screen[1]} alt="" />
              <div data-type="caption">
                <p>{screen[0]}</p>
              </div>
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};
