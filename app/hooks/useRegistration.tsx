// hooks/useRegistration.ts
import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import type { FormData } from "../types/registration.types";

export const useRegistration = (redirectTo: string, navigate: any) => {
  const register = useAuthStore((s) => s.register);
  const createTeam = useAuthStore((s) => s.createTeam);

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error">(
    "success"
  );
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    teamname: "",
    descriptions: "",
    organization_id: "",
    phoneNumber: "",
    teamUsers: "",
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Step 1: Register the user
      const registerResponse = await fetch(
        "http://localhost:3001/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            email: formData.email,
          }),
        }
      );

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const registerData = await registerResponse.json();

      // Call the store's register function
      register(
        { id: registerData.user.id, username: registerData.user.username },
        registerData.token
      );

      // Step 2: Create the team
      const usersArray = formData.teamUsers
        .split(",")
        .map((user: string) => user.trim())
        .filter((user: string) => user.length > 0);

      await createTeam({
        teamname: formData.teamname,
        descriptions: formData.descriptions,
        organization_id: formData.organization_id,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        users: [formData.username, ...usersArray],
      });

      setModalStatus("success");
      setModalVisible(true);
    } catch (error) {
      console.error("Registration error:", error);
      setModalStatus("error");
      setModalVisible(true);
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalStatus === "success") {
      navigate(redirectTo, { replace: true });
    }
  };

  return {
    formData,
    currentStep,
    direction,
    isSubmitting,
    error,
    modalVisible,
    modalStatus,
    handleNext,
    handleBack,
    handleSubmit,
    handleModalClose,
    updateFormData,
    setError,
  };
};
