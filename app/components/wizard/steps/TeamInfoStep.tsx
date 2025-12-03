import React, { useCallback } from "react";
import { Form, Input } from "antd";
import { motion, type Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import { useTeamStore } from "../../../store/team.store";
import type { StepComponentProps } from "../../../types/registration.types";

// Static values moved outside component to prevent recreation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94], // cubic-bezier equivalent of easeOut
      },
    },
  };

export const TeamInfoStep: React.FC<StepComponentProps> = React.memo(({
  onDataChange,
}) => {
  const { setTeamName, setTeamDescription } = useTeamStore();

  const handleTeamNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeamName(value);
    onDataChange?.({ teamname: value });
  }, [setTeamName, onDataChange]);

  const handleDescriptionChange = useCallback((
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setTeamDescription(value);
    onDataChange?.({ descriptions: value });
  }, [setTeamDescription, onDataChange]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      {/* Form content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={itemVariants}>
          <Form.Item
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#1f1f1f",
                }}
              >
                <Icon
                  icon="mdi:crown"
                  style={{
                    color: "#ffd666",
                    fontSize: "20px",
                  }}
                />
                نام تیم
              </span>
            }
            name="teamname"
            rules={[
              { required: true, message: "لطفا نام تیم را وارد کنید" },
              { min: 2, message: "نام تیم باید حداقل ۲ کاراکتر باشد" },
            ]}
            style={{ marginBottom: 32 }}
          >
            <Input
              size="large"
              placeholder="نام تیم خود را وارد کنید..."
              prefix={
                <Icon
                  icon="mdi:account-group"
                  style={{
                    color: "#1890ff",
                    fontSize: "20px",
                  }}
                />
              }
              suffix={
                <Icon
                  icon="mdi:sparkles"
                  style={{
                    color: "#52c41a",
                    fontSize: "20px",
                  }}
                />
              }
              onChange={handleTeamNameChange}
            />
          </Form.Item>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Form.Item
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#1f1f1f",
                }}
              >
                <Icon
                  icon="mdi:lightbulb-on"
                  style={{
                    color: "#ffd666",
                    fontSize: "20px",
                  }}
                />
                شعار تیم
                <span
                  style={{
                    fontSize: "12px",
                    color: "#8c8c8c",
                    fontWeight: "normal",
                  }}
                >
                  (اختیاری)
                </span>
              </span>
            }
            name="descriptionsteam"
            rules={[
              {
                max: 100,
                message: "توضیحات نمی‌تواند بیشتر از 100 کاراکتر باشد",
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input.TextArea
              rows={4}
              placeholder="شعار یا ماموریت تیم خود را بنویسید..."
              showCount
              maxLength={100}
              onChange={handleDescriptionChange}
              style={{
                resize: "none",
              }}
            />
          </Form.Item>
        </motion.div>
      </div>
    </motion.div>
  );
});
