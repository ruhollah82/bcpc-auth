// routes/auth/register/register.tsx
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../../../store/auth.store";
import { RegisterForm } from "../../../components/forms/RegisterForm";
import { useState } from "react";
import { Card, Typography, Alert, Space } from "antd";
import { Icon } from "@iconify/react";

const { Title, Paragraph } = Typography;

export default function Register() {
  const register = useAuthStore((s) => s.register);
  const createTeam = useAuthStore((s) => s.createTeam);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo = params.get("redirectTo") ?? "/dashboard";

  const handleSubmit = async (
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
  ) => {
    if (username && password) {
      try {
        setError(null);
        setIsCreatingTeam(true);

        // Step 1: Register the user
        const registerResponse = await fetch(
          "http://localhost:3001/api/v1/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
              email: teamData.email,
            }),
          }
        );

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const registerData = await registerResponse.json();

        // Call the store's register function which will set cookies
        register(
          { id: registerData.user.id, username: registerData.user.username },
          registerData.token
        );

        // Step 2: Create the team with all required data
        const usersArray = teamData.teamUsers
          .split(",")
          .map((user) => user.trim())
          .filter((user) => user.length > 0);

        await createTeam({
          teamname: teamData.teamname,
          descriptions: teamData.descriptions,
          organization_id: teamData.organization_id,
          email: teamData.email,
          phoneNumber: teamData.phoneNumber,
          users: [username, ...usersArray],
        });

        navigate(redirectTo, { replace: true });
      } catch (error) {
        console.error("Registration error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again."
        );
      } finally {
        setIsCreatingTeam(false);
      }
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <Card>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Space direction="vertical" size="small">
            <Icon
              icon="mdi:account-multiple-plus"
              width="48"
              height="48"
              style={{ color: "#1890ff" }}
            />
            <Title level={2}>ثبت نام و ایجاد تیم</Title>
            <Paragraph type="secondary">
              حساب کاربری و تیم خود را در یک مرحله ایجاد کنید
            </Paragraph>
          </Space>
        </div>

        {error && (
          <Alert
            message="خطای ثبت نام"
            description={error}
            type="error"
            showIcon
            closable
            icon={
              <Icon icon="mdi:alert-circle-outline" width="16" height="16" />
            }
            style={{ marginBottom: "16px" }}
          />
        )}

        <RegisterForm onSubmit={handleSubmit} isLoading={isCreatingTeam} />
      </Card>
    </div>
  );
}
