// components/wizard/WizardStepComponent.tsx
import type {
  StepComponentProps,
  WizardStep,
} from "../../types/registration.types";

interface WizardStepComponentProps {
  step: WizardStep;
  formData: StepComponentProps["formData"];
  onDataChange: StepComponentProps["onDataChange"];
}

export const WizardStepComponent: React.FC<WizardStepComponentProps> = ({
  step,
  formData,
  onDataChange,
}) => {
  const StepComponent = step.component;

  return <StepComponent formData={formData} onDataChange={onDataChange} />;
};
