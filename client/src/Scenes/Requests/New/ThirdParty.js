import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Typography,
  Upload,
  Button,
  Input,
  DatePicker,
  Select,
  Radio,
  Form,
  message,
  AutoComplete,
  Tag,
} from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import Axios from "axios";

const { RangePicker } = DatePicker;

export const ThirdParty = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    message.success("Request was created successfully");
    console.log("Success:", values);
    form.resetFields();
    setShowSubmit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Autocomplete
  const [options, setOptions] = useState([]);
  const onSearch = (value) => {
    setOptions(
      !value
        ? []
        : [
            {
              value,
            },
            {
              value: value + value,
            },
            {
              value: value + value + value,
            },
          ]
    );
  };
  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  // ATM Select
  const [atm, setATM] = useState("all");
  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);

  // Show Submit Button
  const [showSubmit, setShowSubmit] = useState(false);

  // Show Approval Upload
  const [approval, setApproval] = useState(false);

  // ATM select count
  const [count, setCount] = useState(0);

  const findRegions = async () => {
    try {
      const regions = await Axios.get("/regions");
      setRegions(regions.data);
      setStates([]);
      setSelectedStates([]);
      setCount(0);
    } catch (error) {
      console.log(error);
    }
  };

  const findStates = async () => {
    try {
      const states = await Axios.get("/states");
      setStates(states.data);
      console.log(states.data);
      setRegions([]);
      setSelectedRegions([]);
      setCount(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (atm === "region") {
      findRegions();
    }
    if (atm === "state") {
      findStates();
    } else {
      setRegions([]);
      setStates([]);
      setCount(0);
    }
  }, [atm]);

  return (
    <div>
      <Row>
        <Col>
          <Typography.Title level={4}>3rd Party Request Form</Typography.Title>
        </Col>
      </Row>
      <Row style={{ marginTop: "30px" }}>
        <Col md={16} xl={10}>
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onFieldsChange={(changedFields, allFields) => {
              if (
                allFields
                  .slice(0, allFields.length - 1)
                  .every((field) => field.value)
              ) {
                setShowSubmit(true);
              } else {
                setShowSubmit(false);
              }
            }}
            size="large"
            scrollToFirstError
            labelCol={{
              xs: {
                span: 24,
              },
              sm: {
                span: 9,
              },
            }}
            wrapperCol={{
              xs: {
                span: 24,
              },
            }}
            name="request-form"
            initialValues={{
              approval: "no",
            }}
          >
            <Form.Item
              name="requester-name"
              label="Requester's Name"
              rules={[
                {
                  required: true,
                  message: "Please input the requester's name!",
                },
              ]}
            >
              <AutoComplete
                options={options}
                onSelect={onSelect}
                onSearch={onSearch}
                placeholder="Search for user..."
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="customer-name"
              label="Customer's Name"
              rules={[
                {
                  required: true,
                  message: "Please input the customer's name!",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="campaign-name"
              label="Campaign Name"
              rules={[
                {
                  required: true,
                  message: "Please input the campaign name!",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="campaign-screen"
              label="Upload Campaign Screen"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Please upload campaign screen!",
                },
              ]}
              help="Recommended size: 1024 x 768 (4:3)"
            >
              <Upload
                accept="image/*,video/*"
                name="logo"
                action="/upload.do"
                listType="picture"
              >
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="atm-select"
              label="ATM of Interest"
              rules={[
                {
                  required: true,
                  message: "Please select ATMs of Interest!",
                },
              ]}
              initialValue={atm}
            >
              <Radio.Group
                buttonStyle="solid"
                size="middle"
                onChange={(e) => {
                  setATM(e.target.value);
                }}
              >
                <Radio.Button value="all">All ATMs</Radio.Button>
                <Radio.Button value="region">
                  Select Region{" "}
                  {atm === "region" && regions.length === 0 && (
                    <LoadingOutlined />
                  )}
                </Radio.Button>
                <Radio.Button value="state">
                  Select State{" "}
                  {atm === "state" && states.length === 0 && (
                    <LoadingOutlined />
                  )}
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            {regions.length > 0 && (
              <Form.Item
                name="atm-select-region"
                label="Select ATM Region"
                rules={[
                  {
                    required: true,
                    message: "Please select ATMs regions!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Please select region(s)"
                  value={selectedRegions}
                  onChange={(items) => {
                    setSelectedRegions(items);
                    setCount(
                      regions
                        .filter((x) => items.some((o) => o === x.region))
                        .reduce((a, b) => a + b.count, 0)
                    );
                  }}
                  allowClear
                >
                  {regions
                    .filter(
                      (x) => !selectedRegions.some((o) => o.region === x.region)
                    )
                    .map((item) => (
                      <Select.Option key={item.region} value={item.region}>
                        {item.region} ({item.count})
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
            {states.length > 0 && (
              <Form.Item
                name="atm-select-states"
                label="Select ATM States"
                rules={[
                  {
                    required: true,
                    message: "Please select ATM states",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Please select state(s)"
                  value={selectedStates}
                  onChange={(items) => {
                    setSelectedStates(items);
                    setCount(
                      states
                        .filter((x) => items.some((o) => o === x.state))
                        .reduce((a, b) => a + b.count, 0)
                    );
                  }}
                  allowClear
                >
                  {states
                    .filter(
                      (x) => !selectedStates.some((o) => o.state === x.state)
                    )
                    .map((item) => (
                      <Select.Option key={item.state} value={item.state}>
                        {item.state} ({item.count})
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              name="date-range"
              label="Select Date Range"
              rules={[
                {
                  required: true,
                  message: "Please select date range!",
                },
              ]}
              help="Note: Campaign processing requires 48hrs minimum."
            >
              <RangePicker
                disabledDate={(current) =>
                  current && current < moment().endOf("day")
                }
              />
            </Form.Item>
            <Form.Item
              name="approval"
              className="request-create-form_last-form-item"
              label="Has GH Approval?"
            >
              <Radio.Group
                onChange={(e) => {
                  if (e.target.value === "yes") {
                    setApproval(true);
                  } else {
                    setApproval(false);
                  }
                }}
              >
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            {approval && (
              <Form.Item
                name="aproval-document"
                label="Upload Approval"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                help="Recommended size: 1024 x 768 (4:3)"
              >
                <Upload
                  accept="image/*,video/*"
                  name="logo"
                  action="/upload.do"
                  listType="picture"
                >
                  <Button>
                    <UploadOutlined /> Click to upload
                  </Button>
                </Upload>
              </Form.Item>
            )}
            <Form.Item
              wrapperCol={{
                span: 14,
                offset: 9,
              }}
            >
              <Button type="primary" htmlType="submit" disabled={!showSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
