// routes/auth/register/register.tsx
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../../../store/auth.store";
import { useState } from "react";
import { Card, Typography, Space } from "antd";
import { Icon } from "@iconify/react";
import { RegistrationWizard } from "../../../components/wizard/RegistrationWizard";
import { RegistrationModal } from "../../../components/wizard/RegistrationModal";
import { useRegistration } from "../../../hooks/useRegistration";

const { Title, Paragraph } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirectTo = params.get("redirectTo") ?? "/dashboard";

  const {
    formData,
    currentStep,
    direction,
    isSubmitting,
    error,
    modalVisible,
    modalStatus,
    handleNext,
    handleBack,
    handleSubmit,
    handleModalClose,
    updateFormData,
  } = useRegistration(redirectTo, navigate);

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
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
              حساب کاربری و تیم خود را در چند مرحله ایجاد کنید
            </Paragraph>
          </Space>
        </div>

        <RegistrationWizard
          currentStep={currentStep}
          direction={direction}
          isSubmitting={isSubmitting}
          error={error}
          formData={formData}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
          onFormDataChange={updateFormData}
        />
      </Card>

      <RegistrationModal
        visible={modalVisible}
        status={modalStatus}
        error={error}
        onClose={handleModalClose}
        redirectTo={redirectTo}
      />
    </div>
  );
}
