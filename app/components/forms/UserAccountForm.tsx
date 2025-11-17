import React from "react";
import { Form, Input, Space, Typography, Card } from "antd";
import { Icon } from "@iconify/react";

interface UserAccountFormProps {
  form: any; // Ant Design Form instance
}

export function UserAccountForm({ form }: UserAccountFormProps) {
  return (
    <Card
      title={
        <Space>
          <Icon icon="mdi:user" width="20" height="20" />
          <span>اطلاعات حساب کاربری</span>
        </Space>
      }
      style={{ marginBottom: 24 }}
      type="inner"
    >
      <Form.Item
        name="username"
        label="نام کاربری"
        rules={[
          { required: true, message: "لطفا نام کاربری خود را وارد کنید!" },
          { min: 3, message: "نام کاربری باید حداقل ۳ کاراکتر باشد!" },
        ]}
      >
        <Input
          prefix={<Icon icon="mdi:user-outline" width="16" height="16" />}
          placeholder="نام کاربری خود را وارد کنید"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="رمز عبور"
        rules={[
          { required: true, message: "لطفا رمز عبور خود را وارد کنید!" },
          { min: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد!" },
        ]}
      >
        <Input.Password
          prefix={<Icon icon="mdi:lock-outline" width="16" height="16" />}
          placeholder="رمز عبور خود را وارد کنید"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="تایید رمز عبور"
        dependencies={["password"]}
        rules={[
          { required: true, message: "لطفا رمز عبور خود را تایید کنید!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("رمز عبور و تایید رمز عبور مطابقت ندارند!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<Icon icon="mdi:lock-check-outline" width="16" height="16" />}
          placeholder="رمز عبور خود را تایید کنید"
        />
      </Form.Item>
    </Card>
  );
}
