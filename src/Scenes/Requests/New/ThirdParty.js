import React from 'react'
import { Row, Col, Typography, Upload, Button, Input, DatePicker, Select, Radio, Form, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker

export const ThirdParty = () => {
  const [form] = Form.useForm();

  const handleForm = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onCreate(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  const onCreate = values => {
    message.success('Campaign name was created successfully')
    console.log('Received values of form: ', values)
  }

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Row>
        <Col>
          <Typography.Title level={4}>3rd Party Request Form</Typography.Title>
        </Col>
      </Row>
      <Row style={{ marginTop: '30px' }}>
        <Col>
          <Form
            form={form}
            size="large"
            labelCol={{
              xs: {
                span: 24,
              },
              sm: {
                span: 10,
              }
            }}
            wrapperCol={{
              xs: {
                span: 24,
              },
              sm: {
                span: 16,
              }
            }}
            name="request-form"
            initialValues={{
              approval: 'no',
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
              <Input />
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
              <Input />
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
              <Input />
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
            >
              <Upload accept="image/*,video/*" name="logo" action="/upload.do" listType="picture">
                <Button>
                  <UploadOutlined /> Click to upload
            </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="atm-reqion"
              label="ATM of Interest"
              rules={[
                {
                  required: true,
                  message: "Please select ATMs of Interest!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date-range"
              label="Select Date Range"
              rules={[
                {
                  required: true,
                  message: "Please select date range!",
                },
              ]}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
              name="region"
              label="Select Region"
              rules={[
                {
                  required: true,
                  message: 'Please select your country!',
                },
              ]}
            >
              <Select placeholder="Please select a region">
                <Select.Option value="lagos-island">Lagos Island</Select.Option>
                <Select.Option value="lagos-mainland">Lagos Mainland</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="approval" className="request-create-form_last-form-item" label="Has GH Approval?">
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 14,
                offset: 10
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleForm}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
