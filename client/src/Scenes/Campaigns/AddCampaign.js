import React from "react";
import {
  Form,
  Col,
  Row,
  Typography,
  message,
  Input,
  Upload,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { addCampaign } from "./CampaignsSlice";

export const AddCampaign = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (values) => {
    message.success("User was created successfully");
    console.log("Success:", values);
    dispatch(addCampaign(values));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row>
        <Col>
          <Typography.Title level={4}>Upload Campaign Screen</Typography.Title>
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col>
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            name="add-campaign-form"
          >
            <Form.Item
              name="id"
              label="Terminal ID"
              rules={[
                {
                  required: true,
                  message: "Please input the terminal ID!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="screen"
              label="Upload Screen"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                accept="image/*"
                name="logo"
                action="/upload.do"
                listType="picture"
              >
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
