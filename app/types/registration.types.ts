// types/registration.types.ts
import React from "react";

export interface FormData {
  username: string;
  password: string;
  email: string;
  teamname: string;
  descriptions: string;
  organization_id: string;
  phoneNumber: string;
  teamUsers: string;
}

export interface StepComponentProps {
  formData: FormData;
  onDataChange: (data: Partial<FormData>) => void;
}

export interface WizardStep {
  title: string;
  component: React.ComponentType<StepComponentProps>;
  fields?: string[]; // Fields to validate in this step
}

export interface RegistrationResponse {
  user: {
    id: string;
    username: string;
  };
  token: string;
}

export interface TeamCreationData {
  teamname: string;
  descriptions: string;
  organization_id: string;
  email: string;
  phoneNumber: string;
  users: string[];
}
