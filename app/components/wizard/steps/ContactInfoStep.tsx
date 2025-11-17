// components/wizard/steps/ContactInfoStep.tsx
import { Form, Input, Space } from "antd";
import { Icon } from "@iconify/react";
import type { StepComponentProps } from "../../../types/registration.types";

export const ContactInfoStep: React.FC<StepComponentProps> = ({
  formData,
  onDataChange,
}) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Form.Item
        label="شماره تماس"
        name="phoneNumber"
        rules={[{ required: true, message: "لطفا شماره تماس را وارد کنید" }]}
      >
        <Input
          size="large"
          placeholder="شماره تماس"
          prefix={<Icon icon="mdi:phone" />}
        />
      </Form.Item>

      <Form.Item
        label="اعضای تیم"
        name="teamUsers"
        extra="اعضا را با کاما جدا کنید"
      >
        <Input.TextArea
          rows={3}
          placeholder="نام کاربری اعضای تیم (با کاما جدا کنید)"
        />
      </Form.Item>
    </Space>
  );
};
