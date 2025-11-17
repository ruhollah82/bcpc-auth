// components/forms/RegisterForm.tsx
import { useState } from "react";
import { Form, Button, Alert } from "antd";
import { Icon } from "@iconify/react";
import { UserAccountForm } from "./UserAccountForm";
import { TeamInformationForm } from "./TeamInformationForm";

interface RegisterFormProps {
  onSubmit: (
    username: string,
    password: string,
    teamData: {
      teamname: string;
      descriptions: string;
      organization_id: string;
      email: string;
      phoneNumber: string;
      teamUsers: string;
    }
  ) => void;
  isLoading?: boolean;
}

export function RegisterForm({
  onSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const [form] = Form.useForm();
  const [teamUsers, setTeamUsers] = useState("");

  const onFinish = (values: any) => {
    onSubmit(values.username, values.password, {
      teamname: values.teamname,
      descriptions: values.descriptions,
      organization_id: values.organization_id,
      email: values.email,
      phoneNumber: values.phoneNumber,
      teamUsers: values.teamUsers || "",
    });
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      layout="vertical"
      size="large"
      scrollToFirstError
    >
      <UserAccountForm form={form} />
      <TeamInformationForm
        form={form}
        teamUsers={teamUsers}
        setTeamUsers={setTeamUsers}
      />

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          size="large"
          icon={<Icon icon="mdi:account-plus" width="16" height="16" />}
        >
          {isLoading
            ? "در حال ایجاد حساب کاربری و تیم..."
            : "ثبت نام و ایجاد تیم"}
        </Button>
      </Form.Item>
    </Form>
  );
}
