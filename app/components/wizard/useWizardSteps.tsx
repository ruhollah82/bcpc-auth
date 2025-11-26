// components/wizard/useWizardSteps.ts
import type { WizardStep } from "../../types/registration.types";
import { UserInfoStep } from "./steps/UserInfoStep";
import { TeamInfoStep } from "./steps/TeamInfoStep";
import { WelcomeStep } from "./steps/WelcomeStep";

export const useWizardSteps = () => {
  const steps: WizardStep[] = [
    { title: "خوش آمدید", component: WelcomeStep },

    {
      title: "ایجاد تیم",
      component: TeamInfoStep,
    },
    {
      title: "افزودن اعضا",
      component: UserInfoStep,
    },
  ];

  return { steps };
};
