import { Button } from "antd";
import { Icon } from "@iconify/react";
import type { FormInstance } from "antd";
import { useTeamStore } from "../../store/team.store";
import { useUIStore } from "../../store/ui.store";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit?: () => Promise<void>;
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
      if (stepFields) await form.validateFields(stepFields);
      onNext();
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  const submitTeam = useTeamStore((state) => state.submitTeam);
  const { setLoading, openModal } = useUIStore();

  return (
    <div
      style={{
        marginTop: 24,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {isFirst ? (
        <Button
          type="primary"
          size="large"
          onClick={handleNext}
          icon={<Icon icon="mdi:arrow-right" />}
        >
          ورود به دنیای BCPC
        </Button>
      ) : (
        <Button
          size="large"
          onClick={onBack}
          icon={<Icon icon="mdi:arrow-right" />}
        >
          بازگشت
        </Button>
      )}

      {!isFirst && !isLast ? (
        <Button
          type="primary"
          size="large"
          onClick={handleNext}
          icon={<Icon icon="mdi:arrow-left" />}
        >
          ادامه
        </Button>
      ) : isLast ? (
        <Button
          type="primary"
          size="large"
          onClick={onSubmit}
          loading={isSubmitting}
          icon={<Icon icon="mdi:check" />}
        >
          ثبت نهایی
        </Button>
      ) : null}
    </div>
  );
};
