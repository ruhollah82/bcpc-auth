import { Form, Input, Select, Button } from "antd";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useTeamStore } from "../../../store/team.store";
import type { Variants } from "framer-motion";

const { Option } = Select;

export const UserInfoStep = () => {
  const {
    leaderName,
    leaderEmail,
    leaderPhone,
    university,
    members,
    setLeader,
    setUniversity,
    addMember,
    updateMember,
    removeMember,
  } = useTeamStore();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

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
        ease: [0.25, 0.46, 0.45, 0.94], // cubic-bezier equivalent of "easeOut"
      },
    },
  };

  // لیست دانشگاه‌ها با قابلیت جستجو
  const universities = [
    {
      value: "university-of-birjand",
      label: "دانشگاه بیرجند",
    },
    {
      value: "university-of-tehran",
      label: "دانشگاه تهران",
    },
    {
      value: "sharif-university",
      label: "دانشگاه صنعتی شریف",
    },
    {
      value: "amirkabir-university",
      label: "دانشگاه صنعتی امیرکبیر",
    },
    {
      value: "kharazmi-university",
      label: "دانشگاه خوارزمی",
    },
    {
      value: "shahid-beheshti-university",
      label: "دانشگاه شهید بهشتی",
    },
    {
      value: "allameh-tabatabai-university",
      label: "دانشگاه علامه طباطبایی",
    },
    {
      value: "tabriz-university",
      label: "دانشگاه تبریز",
    },
    {
      value: "isfahan-university",
      label: "دانشگاه اصفهان",
    },
    {
      value: "shiraz-university",
      label: "دانشگاه شیراز",
    },
    {
      value: "mashhad-university",
      label: "دانشگاه فردوسی مشهد",
    },
    {
      value: "sistan-and-baluchestan-university",
      label: "دانشگاه سیستان و بلوچستان",
    },
    {
      value: "azad-university",
      label: "دانشگاه آزاد اسلامی",
    },
    {
      value: "payame-noor-university",
      label: "دانشگاه پیام نور",
    },
    {
      value: "university-of-applied-science",
      label: "دانشگاه علمی کاربردی",
    },
    {
      value: "elmo-sanaat-university",
      label: "دانشگاه علم و صنعت ایران",
    },
    {
      value: "khajeh-nasir-university",
      label: "دانشگاه خواجه نصیرالدین طوسی",
    },
    {
      value: "shahrood-university",
      label: "دانشگاه صنعتی شاهرود",
    },
    {
      value: "yazd-university",
      label: "دانشگاه یزد",
    },
    {
      value: "kerman-university",
      label: "دانشگاه شهید باهنر کرمان",
    },
    {
      value: "other",
      label: "سایر دانشگاه‌ها",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      // initial="hidden"
      animate="visible"
      style={{
        width: "100%",
        position: "relative",
        overflow: "visible",
        minHeight: "100%",
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Leader Name */}
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
                  icon="mdi:account"
                  style={{ color: "#ffd666", fontSize: "20px" }}
                />
                نام و نام خانوادگی سرگروه
              </span>
            }
            name="leaderName"
            rules={[
              {
                required: true,
                message: "لطفا نام و نام خانوادگی را وارد کنید",
              },
            ]}
            style={{ marginBottom: 28 }}
          >
            <Input
              size="large"
              value={leaderName}
              onChange={(e) => setLeader({ name: e.target.value })}
              placeholder="نام و نام خانوادگی"
              prefix={
                <Icon
                  icon="mdi:user"
                  style={{ color: "#1890ff", fontSize: 20 }}
                />
              }
              style={{
                borderRadius: 12,
                fontSize: 16,
                padding: "12px 16px",
                border: "2px solid #f0f0f0",
                background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
          </Form.Item>
        </motion.div>

        {/* Leader Email */}
        <motion.div variants={itemVariants}>
          <Form.Item
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#1f1f1f",
                }}
              >
                <Icon
                  icon="mdi:email-check"
                  style={{ color: "#ffd666", fontSize: 20 }}
                />
                ایمیل سرگروه
              </span>
            }
            name="leaderEmail"
            rules={[
              { required: true, message: "لطفا ایمیل را وارد کنید" },
              { pattern: emailRegex, message: "ایمیل معتبر نیست" },
            ]}
            style={{ marginBottom: 28 }}
          >
            <Input
              size="large"
              value={leaderEmail}
              onChange={(e) => setLeader({ email: e.target.value })}
              placeholder="ایمیل"
              prefix={
                <Icon
                  icon="mdi:email"
                  style={{ color: "#1890ff", fontSize: 20 }}
                />
              }
              style={{
                borderRadius: 12,
                fontSize: 16,
                padding: "12px 16px",
                border: "2px solid #f0f0f0",
                background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
          </Form.Item>
        </motion.div>

        {/* Leader Phone */}
        <motion.div variants={itemVariants}>
          <Form.Item
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#1f1f1f",
                }}
              >
                <Icon
                  icon="mdi:phone"
                  style={{ color: "#ffd666", fontSize: 20 }}
                />
                شماره تماس
              </span>
            }
            name="leaderPhone"
            rules={[
              { required: true, message: "شماره تماس را وارد کنید" },
              { pattern: phoneRegex, message: "شماره تماس معتبر نیست" },
            ]}
            style={{ marginBottom: 28 }}
          >
            <Input
              size="large"
              value={leaderPhone}
              onChange={(e) => setLeader({ phone: e.target.value })}
              placeholder="شماره تماس"
              prefix={
                <Icon
                  icon="mdi:phone"
                  style={{ color: "#1890ff", fontSize: 20 }}
                />
              }
              style={{
                borderRadius: 12,
                fontSize: 16,
                padding: "12px 16px",
                border: "2px solid #f0f0f0",
                background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
          </Form.Item>
        </motion.div>

        {/* Add Member Button */}
        <motion.div variants={itemVariants}>
          <Button
            type="primary"
            onClick={addMember}
            disabled={members.length >= 2}
            icon={<Icon icon="mdi:account-plus" />}
            style={{
              borderRadius: 12,
              height: 48,
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 24,
              width: "100%",
              // background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
              border: "none",
              // boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
            }}
          >
            افزودن عضو جدید (حداکثر ۲ عضو)
          </Button>
        </motion.div>

        {/* Members */}
        {members.map((member, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Form.Item
              label={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#1f1f1f",
                  }}
                >
                  <Icon
                    icon="mdi:account-group"
                    style={{ color: "#ffd666", fontSize: 20 }}
                  />
                  عضو {index + 1}
                </span>
              }
              name={`member${index}`}
              rules={[
                { required: true, message: "نام و نام خانوادگی را وارد کنید" },
              ]}
              style={{ marginBottom: 28 }}
            >
              <Input
                size="large"
                value={member}
                onChange={(e) => updateMember(index, e.target.value)}
                placeholder="نام و نام خانوادگی عضو"
                prefix={
                  <Icon
                    icon="mdi:user-plus"
                    style={{ color: "#1890ff", fontSize: 20 }}
                  />
                }
                suffix={
                  <Icon
                    icon="mdi:delete"
                    style={{
                      color: "#ff4d4f",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                    onClick={() => removeMember(index)}
                  />
                }
                style={{
                  borderRadius: 12,
                  fontSize: 16,
                  padding: "12px 16px",
                  border: "2px solid #f0f0f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              />
            </Form.Item>
          </motion.div>
        ))}

        {/* University Select with Search */}
        <motion.div variants={itemVariants}>
          <Form.Item
            label={
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#1f1f1f",
                }}
              >
                <Icon
                  icon="mdi:school"
                  style={{ color: "#ffd666", fontSize: 20 }}
                />
                دانشگاه
              </span>
            }
            name="university"
            rules={[{ required: true, message: "دانشگاه را انتخاب کنید" }]}
            style={{ marginBottom: 28 }}
          >
            <div style={{ position: "relative" }}>
              <Icon
                icon="mdi:magnify"
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 20,
                  color: "#1890ff",
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
              <Select
                size="large"
                showSearch
                value={university}
                onChange={setUniversity}
                placeholder="دانشگاه خود را جستجو و انتخاب کنید..."
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                suffixIcon={
                  <Icon
                    icon="mdi:chevron-down"
                    style={{
                      fontSize: 20,
                      color: "#666",
                      transition: "transform 0.3s",
                    }}
                  />
                }
                style={{
                  width: "100%",
                  borderRadius: 12,
                  fontSize: 16,
                  border: "2px solid #f0f0f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  height: "auto",
                  minHeight: 40,
                  paddingLeft: 40,
                }}
                dropdownStyle={{
                  borderRadius: 12,
                  border: "2px solid #f0f0f0",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  marginTop: 4,
                  maxHeight: 300,
                  overflow: "auto",
                }}
                optionRender={(option) => (
                  <div
                    style={{
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Icon
                      icon="mdi:school-outline"
                      style={{ color: "#1890ff", fontSize: 18 }}
                    />
                    {option.label}
                  </div>
                )}
                options={universities}
              />
            </div>
          </Form.Item>
        </motion.div>
      </div>
    </motion.div>
  );
};
