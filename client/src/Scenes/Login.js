import React from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Row, Carousel, Col, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import scene1 from "../images/ad1.png";
import scene2 from "../images/ad2.png";

import Logo from "../images/logo.png";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios
      .post("/api/authenticate", values)
      .then((res) => {
        console.log(res);
        return res.data === "OK" ? history.push("/") : null;
      })
      .catch((err) => {
        console.log(err);
        message.error("Invalid Username or Password");
      });
  };

  return (
    <div>
      <Row align="middle">
        <Col span={17}>
          <Carousel className={styles.Slider} autoplay>
            <div>
              <img src={scene1} alt="" />
            </div>
            <div>
              <img src={scene2} alt="" />
            </div>
          </Carousel>
        </Col>
        <Col span={7} style={{ padding: "50px" }}>
          <div>
            <img
              style={{
                border: "1px solid rgba(0, 0, 0, 0.2)",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
              }}
              src={Logo}
              alt=""
            />
            <p style={{ margin: "30px 0 20px 0" }}>Welcome!</p>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
