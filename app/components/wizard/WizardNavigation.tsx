import { Button } from "antd";
import { Icon } from "@iconify/react";
import type { FormInstance } from "antd";
import { useTeamStore } from "../../store/team.store";
import { useUIStore } from "../../store/ui.store";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isStepValid, setIsStepValid] = useState(currentStep === 0);
  const isLast = currentStep === totalSteps - 1;
  const isFirst = currentStep === 0;

  // Function to check step validity
  const checkStepValidity = useCallback(async () => {
    if (currentStep === 0) {
      setIsStepValid(true);
      return;
    }

    if (!stepFields || stepFields.length === 0) {
      setIsStepValid(true);
      return;
    }

    try {
      await form.validateFields(stepFields);
      setIsStepValid(true);
    } catch (error) {
      setIsStepValid(false);
    }
  }, [currentStep, stepFields, form]);

  // Check validity when step changes
  useEffect(() => {
    checkStepValidity();
  }, [checkStepValidity]);

  // Check validity when form values change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkStepValidity();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [form.getFieldsValue(), checkStepValidity]);

  const handleNext = async () => {
    try {
      if (stepFields && stepFields.length > 0) {
        await form.validateFields(stepFields);
      }
      onNext();
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isLast) {
        await form.validateFields();
      }

      if (onSubmit) {
        await onSubmit();
      }
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 16,
        minHeight: 40,
        width: "100%",
      }}
    >
      {/* Left Column - Back Button (only visible after first step) */}
      <div style={{ gridColumn: "1", justifySelf: "start" }}>
        <AnimatePresence>
          {!isFirst && (
            <motion.div
              key="back-button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="large"
                onClick={onBack}
                icon={
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon icon="mdi:arrow-right" />
                  </motion.div>
                }
              >
                بازگشت
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center Column - Enter Button (only visible in first step) */}
      <div style={{ gridColumn: "2", justifySelf: "center" }}>
        <AnimatePresence>
          {isFirst && (
            <motion.div
              key="enter-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button type="primary" size="large" onClick={handleNext}>
                <motion.span
                  whileHover={{
                    textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                  }}
                >
                  ورود به دنیای BCPC
                </motion.span>
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon icon="mdi:arrow-left" />
                </motion.div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column - Next/Submit Button (only visible after first step) */}
      <div style={{ gridColumn: "3", justifySelf: "end" }}>
        <AnimatePresence>
          {!isFirst && (
            <motion.div
              key="action-button"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {!isLast ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={
                    !isStepValid
                      ? {
                          x: [0, -3, 3, -3, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    repeat: !isStepValid ? 1 : 0,
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleNext}
                    disabled={!isStepValid}
                  >
                    <motion.span transition={{ duration: 0.4 }}>
                      ادامه
                    </motion.span>
                    <motion.div
                      whileHover={{ x: -3 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Icon icon="mdi:arrow-left" />
                    </motion.div>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={
                    isStepValid && !isSubmitting ? { scale: 1.02 } : {}
                  }
                  whileTap={isStepValid && !isSubmitting ? { scale: 0.98 } : {}}
                  animate={
                    !isStepValid && !isSubmitting
                      ? {
                          x: [0, -3, 3, -3, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    repeat: !isStepValid && !isSubmitting ? 1 : 0,
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    disabled={!isStepValid || isSubmitting}
                    loading={isSubmitting}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          در حال ثبت...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="submit-text"
                          transition={{ duration: 0.4 }}
                        >
                          ثبت نهایی
                        </motion.span>
                      )}
                      <motion.div
                        animate={
                          isStepValid && !isSubmitting
                            ? {
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <Icon icon="mdi:check" />
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
