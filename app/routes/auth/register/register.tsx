import { useNavigate, useSearchParams } from "react-router";
import {
  Card,
  Typography,
  Alert,
  Space,
  Steps,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Image,
} from "antd";

import { RegistrationWizard } from "../../../components/wizard/RegistrationWizard";
import { AppModal } from "../../../components/wizard/RegistrationModal";
import { useRegistration } from "../../../hooks/useRegistration";

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
    handleNext,
    handleBack,
    handleSubmit,
    updateFormData,
  } = useRegistration(redirectTo, navigate);

  return (
    <div className="w-full  flex justify-center items-start ">
      <div
        className="
          w-full p-3 
          md:w-[60%] md:p-6 
          max-w-4xl
        "
      >
        <div className="text-center mb-6">
          <Space direction="vertical" size="small">
            <Image
              src="/favicon.svg"
              preview={false}
              style={{
                padding: "10px",
                alignItems: "center",
              }}
            />
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
      </div>

      <AppModal />
    </div>
  );
}
