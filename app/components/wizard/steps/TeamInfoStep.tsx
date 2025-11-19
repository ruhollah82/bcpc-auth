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
        label="شعار تیم"
        name="descriptionsteam"
        rules={[
          { max: 100, message: "توضیحات نمی‌تواند بیشتر از 100 کاراکتر باشد" },
        ]}
      >
        <Input.TextArea
          rows={2}
          placeholder="شعار تیم"
          showCount
          maxLength={100}
        />
      </Form.Item>

     
    </Space>
  );
};
