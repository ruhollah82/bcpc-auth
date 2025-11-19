// components/wizard/steps/UserInfoStep.tsx
import { Form, Input, Space } from "antd";
import { Icon } from "@iconify/react";
import type { StepComponentProps } from "../../../types/registration.types";

export const UserInfoStep: React.FC<StepComponentProps> = ({
  formData,
  onDataChange,
}) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Form.Item
        label="نام کاربری"
        name="username"
        rules={[
          { required: true, message: "لطفا نام کاربری را وارد کنید" },
          { min: 3, message: "نام کاربری باید حداقل ۳ کاراکتر باشد" },
        ]}
      >
        <Input
          size="large"
          placeholder="نام کاربری"
          prefix={<Icon icon="mdi:user" />}
        />
      </Form.Item>

      <Form.Item
        label="رمز عبور"
        name="password"
        rules={[
          { required: true, message: "لطفا رمز عبور را وارد کنید" },
          { min: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
        ]}
      >
        <Input.Password
          size="large"
          placeholder="رمز عبور"
          prefix={<Icon icon="mdi:lock" />}
          className="ltr-input"
        />
      </Form.Item>

      <Form.Item
        label="ایمیل"
        name="email"
        rules={[
          { required: true, message: "لطفا ایمیل را وارد کنید" },
          { type: "email", message: "لطفا یک ایمیل معتبر وارد کنید" },
        ]}
      >
        <Input
          size="large"
          placeholder="ایمیل"
          prefix={<Icon icon="mdi:email" />}
          className="ltr-input"
        />
      </Form.Item>
    </Space>
  );
};
