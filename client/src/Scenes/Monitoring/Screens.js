import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import {} from "@ant-design/icons";
import { useParams } from "react-router-dom";

export const Screens = () => {
  const { id } = useParams();

  useEffect(() => {
    // Find ATM
    console.log("Finding ATM");
  }, [id]);
  return (
    <div>
      <Row>
        <Col span={24}>
          <Row gutter={[16, 32]}>
            <Col flex="auto">
              <Typography.Title level={4}>
                Monitoring - ATM ({id})
              </Typography.Title>
            </Col>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    </div>
  );
};
