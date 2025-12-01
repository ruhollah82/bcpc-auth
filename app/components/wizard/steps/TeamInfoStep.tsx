import { Form, Input } from "antd";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useTeamStore } from "../../../store/team.store";
import type { StepComponentProps } from "../../../types/registration.types";
import { FloatingIcons } from "~/components/ui/FloatingIcons";

export const TeamInfoStep: React.FC<StepComponentProps> = ({
  onDataChange,
}) => {
  const { setTeamName, setTeamDescription } = useTeamStore();

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeamName(value);
    onDataChange?.({ teamname: value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setTeamDescription(value);
    onDataChange?.({ descriptionsteam: value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Configuration for floating icons

  const floatingIconsConfig = [
    { icon: "mdi:star", color: "#ffe58f", minSize: 12, maxSize: 20 },
    { icon: "mdi:heart", color: "#ff9c6e", minSize: 14, maxSize: 22 },
    { icon: "mdi:diamond-stone", color: "#ffd666", minSize: 14, maxSize: 22 },
    {
      icon: "mdi:star-four-points",
      color: "#ff7875",
      minSize: 12,
      maxSize: 18,
    },
  ];

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        {/* Floating Icons Background */}
        {/* <FloatingIcons count={15} icons={floatingIconsConfig} zIndex={0} /> */}

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
                style={{
                  borderRadius: 12,
                  fontSize: "16px",
                  padding: "12px 16px",
                  border: "2px solid #f0f0f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
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
                  borderRadius: 12,
                  resize: "none",
                  fontSize: "16px",
                  // padding: "16px",
                  border: "2px solid #f0f0f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                  lineHeight: 1.6,
                }}
              />
            </Form.Item>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
