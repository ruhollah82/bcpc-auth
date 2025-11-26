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

  const handleFormValuesChange = (changedValues: any) => {
    onFormDataChange(changedValues);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // validate فرم قبل submit
      await form.validateFields();

      const response = await submitTeam();
      console.log("API RESPONSE:", response);

      openModal({
        type: "success",
        title: "ثبت نام موفق",
        message: "تیم شما با موفقیت ثبت شد.",
        onConfirm: () => {
          // مثلا navigate به داشبورد
          // navigate("/dashboard");
        },
      });
      resetTeamForm(); // ریست فرم بعد از موفقیت
    } catch (err: any) {
      console.error("Submit failed:", err);
      openModal({
        type: "error",
        title: "ریدی",
        message: "ریدم تو فرانت",
        onConfirm: () => {
          // مثلا navigate به داشبورد
          // navigate("/dashboard");
        },
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
          onSubmit={handleSubmit}
          form={form}
          stepFields={steps[currentStep].fields}
        />
      </Form>
    </>
  );
};
