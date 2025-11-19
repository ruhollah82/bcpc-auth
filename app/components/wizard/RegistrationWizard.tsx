// components/wizard/RegistrationWizard.tsx
import { Steps, Button, Form, Alert } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { WizardStepComponent } from "./WizardStepComponent";
import { WizardNavigation } from "./WizardNavigation";
import { useWizardSteps } from "./useWizardSteps";
import type { FormData } from "../../types/registration.types";

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

  const handleFormValuesChange = (changedValues: any) => {
    onFormDataChange(changedValues);
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

      {/* <Steps
        current={currentStep}
        items={steps.map((step) => ({ title: step.title }))}
        style={{ marginBottom: "32px" }}
      /> */}

      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormValuesChange}
        initialValues={formData}
      >
        <div
          style={{
            height: "380px", // ارتفاع ثابت
            overflowY: "auto", // اسکرول عمودی
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
          onSubmit={onSubmit}
          form={form}
          stepFields={steps[currentStep].fields}
        />
      </Form>
    </>
  );
};
