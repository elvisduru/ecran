import React, { useState } from 'react'
import { DeleteOutlined, CheckOutlined, LoadingOutlined, EyeOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';

const ViewDetails = ({ onDecline, details, onApprove, visible, declineLoading, confirmLoading, handleCancel, okText, cancelBtn }) => {
  const [preview, setPreview] = useState(false)
  const handlePreview = () => setPreview(!preview)

  return <Modal
    title={`Campaign ID ${details.key}`}
    visible={visible}
    onCancel={handleCancel}
    footer={[
      <Button key="decline" type={cancelBtn ? "default" : "primary"} danger={!cancelBtn} disabled={declineLoading} onClick={cancelBtn ? handleCancel : onDecline} icon={declineLoading ? <LoadingOutlined /> : !cancelBtn ? <DeleteOutlined /> : null}>{cancelBtn ? "Cancel" : "Decline"}</Button>,
      <Button key="approve" type="primary" disabled={confirmLoading} onClick={onApprove} icon={confirmLoading ? <LoadingOutlined /> : <CheckOutlined />}>{okText}</Button>
    ]}
  >
    <h4>Requester's Name</h4>
    <p>{details.requester}</p>
    {details.customer && <>
      <h4>Customer's Name</h4>
      <p>{details.customer}</p>
    </>}
    <h4>Campaign Name</h4>
    <p>{details.name}</p>
    <h4>Campaign Screen</h4>
    <div className="preview-card" onClick={handlePreview}>
      <img src={details.screen} alt="campaign" />
      <span>
        <Button icon={<EyeOutlined />} type="ghost" style={{ border: 0, color: "#fff" }} />
      </span>
    </div>
    <h4>ATM of Interest</h4>
    <p>{details.atms}</p>
    <Modal
      visible={preview}
      title={details.name}
      footer={null}
      onCancel={handlePreview}
    >
      <img alt="campaign" style={{ width: '100%' }} src={details.screen} />
    </Modal>
  </Modal>
}

export default ViewDetails
