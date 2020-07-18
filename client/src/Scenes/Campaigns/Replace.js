import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Button, Space, Select, message } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { selectRequestById } from "../Requests/requestsSlice";
import { selectAllScreens, updateScreen } from "./screensSlice";
import styles from "../../Scenes/Dashboard.module.css";

export const Replace = () => {
  const { id } = useParams();
  const { Option } = Select;
  const dispatch = useDispatch();
  const request = useSelector((state) => selectRequestById(state, id));
  const screens = useSelector(selectAllScreens)
    .filter((x) => x.type === request.campaignType)
    .map(({ _id, src, title }) => ({ _id, src, title }));

  const defaultScreen =
    screens.find((x) => x.title === request.selectedScreen) ||
    screens.find((x) => x.title === request.campaignName);
  const initialScreen = [
    defaultScreen.title,
    defaultScreen.src,
    defaultScreen._id,
  ];
  const [screen, setScreen] = useState(initialScreen);
  const [buttonState, setButtonState] = useState(false);

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
            disabled={buttonState}
            icon={<SwapOutlined />}
            onClick={() => {
              dispatch(
                updateScreen({
                  id: screen[2],
                  src: request.campaignScreen,
                  title: request.campaignName,
                })
              )
                .then(() => {
                  setScreen((prevScreen) => [
                    request.campaignName,
                    request.campaignScreen,
                    prevScreen[2],
                  ]);
                  setButtonState(true);
                  message.success("Success replaced screen");
                })
                .catch((error) => console.log(error));
            }}
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
              defaultValue={initialScreen}
            >
              {screens.map(({ _id, title, src }) => (
                <Option key={_id} value={[title, src, _id]}>
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
