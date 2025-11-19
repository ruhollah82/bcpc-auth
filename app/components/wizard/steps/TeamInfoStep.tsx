// components/wizard/steps/TeamInfoStep.tsx
import { Form, Input, Select, Space } from "antd";
import { Icon } from "@iconify/react";
import type { StepComponentProps } from "../../../types/registration.types";

const { Option } = Select;

export const TeamInfoStep: React.FC<StepComponentProps> = ({
  formData,
  onDataChange,
}) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Form.Item
        label="نام تیم"
        name="teamname"
        rules={[
          { required: true, message: "لطفا نام تیم را وارد کنید" },
          { min: 2, message: "نام تیم باید حداقل ۲ کاراکتر باشد" },
        ]}
      >
        <Input
          size="large"
          placeholder="نام تیم"
          prefix={<Icon icon="mdi:account-group" />}
        />
      </Form.Item>

      <Form.Item
        label="توضیحات"
        name="descriptions"
        rules={[
          { max: 500, message: "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد" },
        ]}
      >
        <Input.TextArea
          rows={3}
          placeholder="توضیحات درباره تیم"
          showCount
          maxLength={500}
        />
      </Form.Item>

      <Form.Item
        label="سازمان"
        name="organization_id"
        rules={[{ required: true, message: "لطفا سازمان را انتخاب کنید" }]}
      >
        <Select
          size="large"
          placeholder="انتخاب سازمان"
          suffixIcon={<Icon icon="mdi:chevron-down" />}
        >
          <Option value="org1">سازمان ۱</Option>
          <Option value="org2">سازمان ۲</Option>
          <Option value="org3">سازمان ۳</Option>
        </Select>
      </Form.Item>
    </Space>
  );
};
