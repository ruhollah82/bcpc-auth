// components/wizard/useWizardSteps.ts
import { useMemo } from "react";
import type { WizardStep } from "../../types/registration.types";
import { UserInfoStep } from "./steps/UserInfoStep";
import { TeamInfoStep } from "./steps/TeamInfoStep";
import { WelcomeStep } from "./steps/WelcomeStep";
import { AgreementStep } from "./steps/AgreementStep";

// Memoize steps outside component to prevent recreation
const STEPS: WizardStep[] = [
    {
      title: "خوش آمدید",
      component: WelcomeStep,
      fields: [], // No fields to validate
    },
    {
      title: "قوانین",
      component: AgreementStep,
      fields: ["agreementAccepted"], // Validate agreement acceptance
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

export const useWizardSteps = () => {
  const steps = useMemo(() => STEPS, []);

  return { steps };
};
