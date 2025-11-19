// components/wizard/useWizardSteps.ts
import type { WizardStep } from "../../types/registration.types";
import { UserInfoStep } from "./steps/UserInfoStep";
import { TeamInfoStep } from "./steps/TeamInfoStep";
import { ContactInfoStep } from "./steps/ContactInfoStep";

export const useWizardSteps = () => {
  const steps: WizardStep[] = [
    {
      title: "اطلاعات کاربر",
      component: UserInfoStep,
      fields: ["username", "password", "email"],
    },
    {
      title: "اطلاعات تیم",
      component: TeamInfoStep,
      fields: ["teamname", "organization_id"],
    },
    {
      title: "اطلاعات تماس",
      component: ContactInfoStep,
      fields: ["phoneNumber"],
    },
  ];

  return { steps };
};
