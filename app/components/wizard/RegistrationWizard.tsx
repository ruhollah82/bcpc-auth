// components/wizard/RegistrationWizard.tsx
import { Form, Alert } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { WizardStepComponent } from "./WizardStepComponent";
import { WizardNavigation } from "./WizardNavigation";
import { useWizardSteps } from "./useWizardSteps";
import type { FormData } from "../../types/registration.types";
import { useTeamStore } from "../../store/team.store";
import { useUIStore } from "../../store/ui.store";
import { useCallback, useEffect, useRef } from "react"; // Add this import

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
  const { setLoading, openModal } = useUIStore();

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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Final validation before API call
      await form.validateFields();

      const response = await submitTeam();
      console.log("API RESPONSE:", response);

      openModal({
        type: "success",
        title: "ثبت نام موفق",
        message: "تیم شما با موفقیت ثبت شد.",
        onConfirm: () => {
          // navigate to dashboard
        },
      });
      resetTeamForm();
    } catch (err: any) {
      console.error("Submit failed:", err);

      // Extract validation errors if any
      let errorMessage = "مشکلی در ثبت نام به وجود آمده است.";
      if (err.errorFields && err.errorFields.length > 0) {
        errorMessage = "لطفا تمام فیلدهای ضروری را به درستی پر کنید.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      openModal({
        type: "error",
        title: "خطا در ثبت نام",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            paddingRight: "8px",
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
    </>
  );
};
