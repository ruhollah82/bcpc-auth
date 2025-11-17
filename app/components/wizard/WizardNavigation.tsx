// components/wizard/WizardNavigation.tsx
import { Button } from "antd";
import { Icon } from "@iconify/react";
import type { FormInstance } from "antd";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  form: FormInstance;
  stepFields?: string[];
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
  form,
  stepFields,
}) => {
  const handleNext = async () => {
    try {
      if (stepFields) {
        await form.validateFields(stepFields);
      }
      onNext();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <div
      style={{
        marginTop: "24px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button
        size="large"
        onClick={onBack}
        disabled={currentStep === 0}
        icon={<Icon icon="mdi:arrow-right" />}
      >
        بازگشت
      </Button>

      {currentStep < totalSteps - 1 ? (
        <Button
          type="primary"
          size="large"
          onClick={handleNext}
          icon={<Icon icon="mdi:arrow-left" />}
        >
          ادامه
        </Button>
      ) : (
        <Button
          type="primary"
          size="large"
          onClick={onSubmit}
          loading={isSubmitting}
          icon={<Icon icon="mdi:check" />}
        >
          ثبت نهایی
        </Button>
      )}
    </div>
  );
};
