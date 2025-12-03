// components/wizard/RegistrationWizard.tsx
import { Form, Alert, Spin } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { WizardStepComponent } from "./WizardStepComponent";
import { WizardNavigation } from "./WizardNavigation";
import { useWizardSteps } from "./useWizardSteps";
import type { FormData } from "../../types/registration.types";
import { useTeamStore } from "../../store/team.store";
import { useUIStore } from "../../store/ui.store";
import { useCallback, useEffect, useRef } from "react"; // Add this import
import { FloatingIcons } from "../ui/FloatingIcons";
import { Navigate, redirect } from "react-router";

interface RegistrationWizardProps {
  currentStep: number;
  direction: number;
  isSubmitting: boolean;
  error: string | null;
  formData: FormData;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  onFormDataChange: (data: Partial<FormData>) => void;
}

const floatingIconsConfig = [
  { icon: "mdi:star", color: "#ffe58f", minSize: 12, maxSize: 20 },
  { icon: "mdi:heart", color: "#ff9c6e", minSize: 14, maxSize: 22 },
  { icon: "mdi:diamond-stone", color: "#ffd666", minSize: 14, maxSize: 22 },
  {
    icon: "mdi:star-four-points",
    color: "#ff7875",
    minSize: 12,
    maxSize: 18,
  },
];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export const RegistrationWizard: React.FC<RegistrationWizardProps> = ({
  currentStep,
  direction,
  isSubmitting,
  error,
  formData,
  onNext,
  onBack,
  onSubmit,
  onFormDataChange,
}) => {
  const { steps } = useWizardSteps();
  const [form] = Form.useForm();
  const submitTeam = useTeamStore((state) => state.submitTeam);
  const resetTeamForm = useTeamStore((state) => state.resetTeamForm);
  const { setLoading, openModal, loading } = useUIStore();

  // Set form initial values when step changes
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [currentStep, form, formData]);

  const handleFormValuesChange = useCallback(
    (changedValues: any, allValues: any) => {
      onFormDataChange(changedValues);
    },
    [onFormDataChange]
  );

  function translateErrorMessage(error: string) {
    if (!error) return "مشکلی در ثبت نام به وجود آمده است.";

    if (error.includes("already exists")) {
      return "تیمی با این نام قبلا ثبت شده است.";
    }

    if (error.includes("Failed to create team")) {
      return "خطایی در ایجاد تیم رخ داده است. لطفاً دوباره تلاش کنید.";
    }

    // fallback
    return "مشکلی در ثبت نام به وجود آمده است.";
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await submitTeam();

      if (response?.success === true) {
        const message = `تیم شما با موفقیت ثبت شد.

مشخصات ورود به حساب کاربری:

USERNAME: ${response.username}
PASSWORD: ${response.password}
${response.email ? `EMAIL: ${response.email}` : ""}`;

        openModal({
          type: "success",
          title: "ثبت نام موفق",
          message,
          onConfirm: () => {
            resetTeamForm();
            location.reload();
            window.location.href = "https://bircpc.ir";
          },
        });

        return;
      }

      openModal({
        type: "error",
        title: "خطا در ثبت نام",
        message: translateErrorMessage(response?.error),
        onConfirm: () => {
          resetTeamForm();
          location.reload();
        },
      });
    } catch (err: any) {
      console.log("Submit failed:", err);

      let errorMessage = "مشکلی در ثبت نام به وجود آمده است.";

      if (err.response?.data?.error) {
        errorMessage = translateErrorMessage(err.response.data.error);
      } else if (err.message) {
        errorMessage = translateErrorMessage(err.message);
      }

      openModal({
        type: "error",
        title: "خطا در ثبت نام",
        message: errorMessage,
        onConfirm: () => {
          resetTeamForm();
          location.reload();
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <FloatingIcons count={15} icons={floatingIconsConfig} zIndex={50} /> */}
      {error && (
        <Alert
          message="خطای ثبت نام"
          description={error}
          type="error"
          showIcon
          closable
          icon={<Icon icon="mdi:alert-circle-outline" width="16" height="16" />}
          style={{ marginBottom: "16px" }}
        />
      )}
      <Spin spinning={loading} tip="درحال ارسال اطلاعات تیم ...">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleFormValuesChange}
          initialValues={formData}
          validateTrigger="onBlur"
        >
          <div
            style={{
              height: "380px",
              overflowY: "auto",
              overflowX: "hidden",
              position: "relative",
              paddingRight: "1rem",
              paddingLeft: "1rem",
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                style={{ width: "100%" }}
              >
                <WizardStepComponent
                  step={steps[currentStep]}
                  formData={formData}
                  onDataChange={onFormDataChange}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <WizardNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            isSubmitting={isSubmitting}
            onBack={onBack}
            onNext={onNext}
            onSubmit={handleSubmit}
            form={form}
            stepFields={steps[currentStep].fields}
          />
        </Form>
      </Spin>
    </>
  );
};
