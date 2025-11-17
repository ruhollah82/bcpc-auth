import React from "react";
import { Form, Input, Space, Typography, Card } from "antd";
import { Icon } from "@iconify/react";

const { TextArea } = Input;

interface TeamInformationFormProps {
  form: any; // Ant Design Form instance
  teamUsers: string;
  setTeamUsers: (value: string) => void;
}

export function TeamInformationForm({
  form,
  teamUsers,
  setTeamUsers,
}: TeamInformationFormProps) {
  return (
    <Card
      title={
        <Space>
          <Icon icon="mdi:account-group" width="20" height="20" />
          <span>اطلاعات تیم</span>
        </Space>
      }
      style={{ marginBottom: 24 }}
      type="inner"
    >
      <Form.Item
        name="teamname"
        label="نام تیم"
        rules={[{ required: true, message: "لطفا نام تیم خود را وارد کنید!" }]}
      >
        <Input
          prefix={
            <Icon icon="mdi:account-group-outline" width="16" height="16" />
          }
          placeholder="نام تیم را وارد کنید"
        />
      </Form.Item>

      <Form.Item
        name="descriptions"
        label="توضیحات تیم"
        rules={[{ required: true, message: "لطفا توضیحات تیم را وارد کنید!" }]}
      >
        <TextArea
          rows={3}
          placeholder="هدف و اهداف تیم خود را شرح دهید"
          showCount
          maxLength={500}
        />
      </Form.Item>

      <Form.Item
        name="organization_id"
        label="سازمان"
        rules={[{ required: true, message: "لطفا سازمان خود را وارد کنید!" }]}
      >
        <Input
          prefix={
            <Icon icon="mdi:office-building-outline" width="16" height="16" />
          }
          placeholder="مثال: دانشگاه بیرجند"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="ایمیل"
        rules={[
          { required: true, message: "لطفا ایمیل خود را وارد کنید!" },
          { type: "email", message: "لطفا یک ایمیل معتبر وارد کنید!" },
        ]}
      >
        <Input
          prefix={<Icon icon="mdi:email-outline" width="16" height="16" />}
          placeholder="team@example.com"
        />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="شماره تلفن"
        rules={[
          { required: true, message: "لطفا شماره تلفن خود را وارد کنید!" },
        ]}
      >
        <Input
          prefix={<Icon icon="mdi:phone-outline" width="16" height="16" />}
          placeholder="شماره تلفن"
        />
      </Form.Item>

      <Form.Item
        name="teamUsers"
        label={
          <Space>
            <Icon icon="mdi:account-multiple-plus" width="16" height="16" />
            <span>اعضای تیم اضافی</span>
          </Space>
        }
        extra="نام‌های کاربری را با کاما جدا کنید (اختیاری)"
      >
        <Input
          placeholder="کاربر۱, کاربر۲, کاربر۳"
          value={teamUsers}
          onChange={(e) => setTeamUsers(e.target.value)}
        />
      </Form.Item>
    </Card>
  );
}
