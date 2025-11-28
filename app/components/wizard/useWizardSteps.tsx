// components/wizard/useWizardSteps.ts
import type { WizardStep } from "../../types/registration.types";
import { UserInfoStep } from "./steps/UserInfoStep";
import { TeamInfoStep } from "./steps/TeamInfoStep";
import { WelcomeStep } from "./steps/WelcomeStep";

export const useWizardSteps = () => {
  const steps: WizardStep[] = [
    {
      title: "خوش آمدید",
      component: WelcomeStep,
      fields: [], // No fields to validate
    },
    {
      title: "ایجاد تیم",
      component: TeamInfoStep,
      fields: ["teamname"], // Only validate required fields
    },
    {
      title: "افزودن اعضا",
      component: UserInfoStep,
      fields: [
        "leaderName",
        "leaderEmail",
        "leaderPhone",
        "university",
        "member0",
        "member1",
      ], // All required fields including members
    },
  ];

  return { steps };
};
