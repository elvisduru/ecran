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
  Modal,
  Table,
} from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { addRequest } from "../requestsSlice";
import { useDispatch } from "react-redux";
import { storageRef } from "../../../client_utils";

const { RangePicker } = DatePicker;

export const Internal = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (values) => {
    message.success("Request was created successfully");
    console.log("Success:", values);
    if (values.campaignScreen) {
      let campaignScreen = values.campaignScreen[0].originFileObj;
      values.campaignScreen = campaignScreen;
    }
    if (values.approvalDocument) {
      let approvalDocument = values.approvalDocument[0].originFileObj;
      console.log("ApprovalDoc:", approvalDocument);
      values.approvalDocument = approvalDocument;
    }
    console.log("Modified:", values);

    const formData = new FormData();
    for (const key in values) {
      const value = values[key];
      if (key === "campaignScreen" || key === "approvalDocument") {
        formData.append(key, value, value.name);
      }
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
    Axios.post("/api/request/new", formData)
      .then((res) => {
        dispatch(addRequest(res.data));
      })
      .catch((error) => console.log(error));
    setShowSubmit(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFileImage = (e) => {
    console.log("Upload event:", e);
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);

    if (!/\.(jpe?g|png|gif|bmp|svg)$/i.test(e.file.name)) {
      message.error("Wrong file type uploaded. Please upload only images");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(e.file.originFileObj);
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      if (+aspectRatio.toFixed(2) !== 1.33) {
        message.error(
          "The file uploaded doesn't meet the aspect ratio requirement"
        );
        return;
      } else {
        if (e.file.status === "removed") {
          storageRef
            .child(e.file.name)
            .delete()
            .then(() => console.log(`${e.file.name} removed successfully`));
        } else {
          storageRef
            .child(e.file.name)
            .put(e.file.originFileObj, { contentType: e.file.type })
            .then(() => console.log("File uploaded successfully"))
            .catch((error) => console.log(error));
        }
      }
    };

    if (Array.isArray(e)) {
      return e;
    }
    return e && fileList;
  };

  const normFileDoc = (e) => {
    console.log("Upload event:", e);
    let fileList = [...e.fileList];
    fileList = fileList.slice(-1);

    if (!/\.(pdf)$/i.test(e.file.name)) {
      message.error("Wrong file type uploaded. Please upload only PDF");
      return;
    }

    if (e.file.status === "removed") {
      storageRef
        .child(e.file.name)
        .delete()
        .then(() => console.log(`${e.file.name} removed successfully`));
    } else {
      storageRef
        .child(e.file.name)
        .put(e.file.originFileObj, { contentType: e.file.type })
        .then(() => console.log("File uploaded successfully"))
        .catch((error) => console.log(error));
    }

    if (Array.isArray(e)) {
      return e;
    }
    return e && fileList;
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

  const dummyRequest = ({ file, onSuccess }) => {
    console.log(file);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Terminal ID",
      dataIndex: ["Terminal ID"],
    },
    {
      title: "Address",
      dataIndex: "Address",
    },
    {
      title: "State",
      dataIndex: "State",
    },
    {
      title: "Region",
      dataIndex: "Region",
    },
  ];

  const loadATMs = async (type) => {
    const res = await Axios.get(
      `/api/atms/${type}?type=${type}&atms=${
        type === "regions"
          ? encodeURIComponent(JSON.stringify(selectedRegions))
          : encodeURIComponent(JSON.stringify(selectedStates))
      }`
    );
    const atms = res.data;

    atms.forEach((atm) => {
      atm.key = atm._id;
    });

    setData(atms);
    setVisible(true);
  };

  return (
    <div>
      <Row>
        <Col>
          <Typography.Title level={4}>Internal Request Form</Typography.Title>
        </Col>
      </Row>
      <Row style={{ marginTop: "30px" }}>
        <Col md={18} xl={12}>
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
              approval: "false",
              atmSelect: atm,
            }}
          >
            <Form.Item
              name="requesterName"
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
                // allowClear
              />
            </Form.Item>
            <Form.Item
              name="campaignName"
              label="Campaign Name"
              rules={[
                {
                  required: true,
                  message: "Please input the campaign name!",
                },
              ]}
              help="Max character length is 20"
            >
              <Input allowClear maxLength="20" />
            </Form.Item>
            <Form.Item
              name="campaignScreen"
              label="Upload Campaign Screen"
              valuePropName="fileList"
              getValueFromEvent={normFileImage}
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
                name="campaignScreen"
                listType="picture"
                customRequest={dummyRequest}
              >
                <Button>
                  <UploadOutlined /> Click to upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="atmSelect"
              label="ATM of Interest"
              rules={[
                {
                  required: true,
                  message: "Please select ATMs of Interest!",
                },
              ]}
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
              <>
                <Form.Item
                  name="atmSelectRegion"
                  label="Select ATM Region"
                  rules={[
                    {
                      required: true,
                      message: "Please select ATMs regions!",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
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
                      .filter((x) =>
                        selectedRegions.every((o) => o !== x.region)
                      )
                      .map((item, index) => (
                        <Select.Option
                          key={`${index}-${item.region}`}
                          value={item.region}
                        >
                          {item.region} ({item.count})
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Tag
                  style={{
                    display: "inline-block",
                    marginLeft: "37.5%",
                    cursor: "pointer",
                  }}
                  icon={<EyeOutlined />}
                  color="green"
                  title="Click to view selected atms"
                  onClick={() => loadATMs("regions")}
                >
                  {count} selected
                </Tag>
              </>
            )}
            {states.length > 0 && (
              <>
                <Form.Item
                  name="atmSelectStates"
                  label="Select ATM States"
                  rules={[
                    {
                      required: true,
                      message: "Please select ATM states",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
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
                      .filter((x) => selectedStates.every((o) => o !== x.state))
                      .map((item) => (
                        <Select.Option key={item.state} value={item.state}>
                          {item.state} ({item.count})
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Tag
                  style={{
                    display: "inline-block",
                    marginLeft: "37.5%",
                    cursor: "pointer",
                  }}
                  icon={<EyeOutlined />}
                  color="green"
                  title="Click to view selected atms"
                  onClick={() => loadATMs("states")}
                >
                  {count} selected
                </Tag>
              </>
            )}
            <Form.Item
              name="dateRange"
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
                  if (e.target.value === "true") {
                    setApproval(true);
                  } else {
                    setApproval(false);
                  }
                }}
              >
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </Radio.Group>
            </Form.Item>
            {approval && (
              <Form.Item
                name="approvalDocument"
                label="Upload Approval"
                valuePropName="fileList"
                getValueFromEvent={normFileDoc}
                help="File must be PDF"
              >
                <Upload
                  name="approvalDocument"
                  accept="application/pdf"
                  customRequest={dummyRequest}
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
      <Modal
        onCancel={() => setVisible(false)}
        visible={visible}
        title="Selected ATMs"
        footer={null}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: ["5", "10", "20", "50", "100"],
          }}
          size="small"
        />
      </Modal>
    </div>
  );
};
