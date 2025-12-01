import { Form, Input, Select, Button } from "antd";
import { motion, type Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import { useTeamStore } from "../../../store/team.store";
import { universities } from "~/data/universities";

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

  const onSearch = (value: string) => {
    console.log("جستجو:", value);
  };

  const onChange = (value: string) => {
    console.log(`انتخاب شده: ${value}`);
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

  return (
    <motion.div
      variants={containerVariants}
      animate="visible"
      style={{
        width: "100%",
        position: "relative",
        overflow: "visible", // مهم
        minHeight: "100%", // مهم
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
            }}
          >
            افزودن عضو جدید
          </Button>
        </motion.div>

        {/* Members */}
        {members.map((member, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Form.Item
              label={`عضو ${index + 1}`}
              name={`member${index}`}
              rules={[
                { required: true, message: "نام و نام خانوادگی را وارد کنید" },
              ]}
            >
              <Input
                size="large"
                value={member}
                onChange={(e) => updateMember(index, e.target.value)}
                placeholder="نام و نام خانوادگی"
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
        {/* University */}
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
          >
            <Select
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              size="large"
              value={university}
              onChange={(value) => {
                setUniversity(value);
                onChange(value); // اگر نیاز به log دارید
              }}
              onSearch={onSearch}
              placeholder="دانشگاه خود را انتخاب کنید"
              suffixIcon={<Icon icon="mdi:chevron-down" />}
              style={{
                borderRadius: 12,
                border: "2px solid #f0f0f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
              }}
              dropdownStyle={{
                borderRadius: 12,
              }}
              options={universities}
            />
          </Form.Item>
        </motion.div>
      </div>
    </motion.div>
  );
};
