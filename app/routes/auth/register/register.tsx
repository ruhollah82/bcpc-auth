// routes/auth/register/register.tsx
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../../../store/auth.store";
import { useState } from "react";
import {
  Card,
  Typography,
  Alert,
  Space,
  Steps,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const { Title, Paragraph } = Typography;
const { Option } = Select;

// Animation variants for Framer Motion
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

interface FormData {
  username: string;
  password: string;
  email: string;
  teamname: string;
  descriptions: string;
  organization_id: string;
  phoneNumber: string;
  teamUsers: string;
}

export default function Register() {
  const register = useAuthStore((s) => s.register);
  const createTeam = useAuthStore((s) => s.createTeam);
  const navigate = useNavigate();
  const [params] = useSearchParams();
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

  const [form] = Form.useForm();

  const redirectTo = params.get("redirectTo") ?? "/dashboard";

  const steps = [
    {
      title: "اطلاعات کاربر",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Form.Item
              label="نام کاربری"
              name="username"
              rules={[
                { required: true, message: "لطفا نام کاربری را وارد کنید" },
              ]}
            >
              <Input
                size="large"
                placeholder="نام کاربری"
                prefix={<Icon icon="mdi:user" />}
              />
            </Form.Item>

            <Form.Item
              label="رمز عبور"
              name="password"
              rules={[
                { required: true, message: "لطفا رمز عبور را وارد کنید" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="رمز عبور"
                prefix={<Icon icon="mdi:lock" />}
              />
            </Form.Item>

            <Form.Item
              label="ایمیل"
              name="email"
              rules={[
                { required: true, message: "لطفا ایمیل را وارد کنید" },
                { type: "email", message: "لطفا یک ایمیل معتبر وارد کنید" },
              ]}
            >
              <Input
                size="large"
                placeholder="ایمیل"
                prefix={<Icon icon="mdi:email" />}
              />
            </Form.Item>
          </Space>
        </motion.div>
      ),
    },
    {
      title: "اطلاعات تیم",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Form.Item
              label="نام تیم"
              name="teamname"
              rules={[{ required: true, message: "لطفا نام تیم را وارد کنید" }]}
            >
              <Input
                size="large"
                placeholder="نام تیم"
                prefix={<Icon icon="mdi:account-group" />}
              />
            </Form.Item>

            <Form.Item label="توضیحات" name="descriptions">
              <Input.TextArea rows={3} placeholder="توضیحات درباره تیم" />
            </Form.Item>

            <Form.Item
              label="سازمان"
              name="organization_id"
              rules={[
                { required: true, message: "لطفا سازمان را انتخاب کنید" },
              ]}
            >
              <Select
                size="large"
                placeholder="انتخاب سازمان"
                suffixIcon={<Icon icon="mdi:chevron-down" />}
              >
                <Option value="org1">سازمان ۱</Option>
                <Option value="org2">سازمان ۲</Option>
                <Option value="org3">سازمان ۳</Option>
              </Select>
            </Form.Item>
          </Space>
        </motion.div>
      ),
    },
    {
      title: "اطلاعات تماس",
      content: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Form.Item
              label="شماره تماس"
              name="phoneNumber"
              rules={[
                { required: true, message: "لطفا شماره تماس را وارد کنید" },
              ]}
            >
              <Input
                size="large"
                placeholder="شماره تماس"
                prefix={<Icon icon="mdi:phone" />}
              />
            </Form.Item>

            <Form.Item
              label="اعضای تیم"
              name="teamUsers"
              extra="اعضا را با کاما جدا کنید"
            >
              <Input.TextArea
                rows={3}
                placeholder="نام کاربری اعضای تیم (با کاما جدا کنید)"
              />
            </Form.Item>
          </Space>
        </motion.div>
      ),
    },
  ];

  const handleNext = async () => {
    try {
      // Validate current step fields
      const values = await form.validateFields();
      setFormData((prev) => ({ ...prev, ...values }));

      setDirection(1);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Get all form values
      const values = form.getFieldsValue();
      const finalData = { ...formData, ...values };

      // Step 1: Register the user
      const registerResponse = await fetch(
        "http://localhost:3001/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: finalData.username,
            password: finalData.password,
            email: finalData.email,
          }),
        }
      );

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const registerData = await registerResponse.json();

      // Call the store's register function which will set cookies
      register(
        { id: registerData.user.id, username: registerData.user.username },
        registerData.token
      );

      // Step 2: Create the team with all required data
      const usersArray = finalData.teamUsers
        .split(",")
        .map((user: string) => user.trim())
        .filter((user: string) => user.length > 0);

      await createTeam({
        teamname: finalData.teamname,
        descriptions: finalData.descriptions,
        organization_id: finalData.organization_id,
        email: finalData.email,
        phoneNumber: finalData.phoneNumber,
        users: [finalData.username, ...usersArray],
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

  const handleFormValuesChange = (changedValues: any, allValues: any) => {
    setFormData((prev) => ({ ...prev, ...changedValues }));
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Card>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Space direction="vertical" size="small">
            <Icon
              icon="mdi:account-multiple-plus"
              width="48"
              height="48"
              style={{ color: "#1890ff" }}
            />
            <Title level={2}>ثبت نام و ایجاد تیم</Title>
            <Paragraph type="secondary">
              حساب کاربری و تیم خود را در چند مرحله ایجاد کنید
            </Paragraph>
          </Space>
        </div>

        {error && (
          <Alert
            message="خطای ثبت نام"
            description={error}
            type="error"
            showIcon
            closable
            icon={
              <Icon icon="mdi:alert-circle-outline" width="16" height="16" />
            }
            style={{ marginBottom: "16px" }}
          />
        )}

        <Steps
          current={currentStep}
          items={steps.map((step) => ({ title: step.title }))}
          style={{ marginBottom: "32px" }}
        />

        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleFormValuesChange}
          initialValues={formData}
        >
          <div
            style={{
              minHeight: "300px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                style={{ width: "100%" }}
              >
                {steps[currentStep].content}
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              size="large"
              onClick={handleBack}
              disabled={currentStep === 0}
              icon={<Icon icon="mdi:arrow-right" />}
            >
              بازگشت
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="primary"
                size="large"
                onClick={handleNext}
                icon={<Icon icon="mdi:arrow-left" />}
              >
                ادامه
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                loading={isSubmitting}
                icon={<Icon icon="mdi:check" />}
              >
                ثبت نهایی
              </Button>
            )}
          </div>
        </Form>
      </Card>

      <Modal
        open={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="submit" type="primary" onClick={handleModalClose}>
            {modalStatus === "success" ? "ورود به داشبورد" : "بستن"}
          </Button>,
        ]}
        centered
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          {modalStatus === "success" ? (
            <>
              <Icon
                icon="mdi:check-circle"
                width="64"
                height="64"
                style={{ color: "#52c41a", marginBottom: "16px" }}
              />
              <Title level={3} style={{ color: "#52c41a" }}>
                ثبت نام موفق
              </Title>
              <Paragraph>
                ثبت نام و ایجاد تیم با موفقیت انجام شد. در حال انتقال به
                داشبورد...
              </Paragraph>
            </>
          ) : (
            <>
              <Icon
                icon="mdi:alert-circle"
                width="64"
                height="64"
                style={{ color: "#ff4d4f", marginBottom: "16px" }}
              />
              <Title level={3} style={{ color: "#ff4d4f" }}>
                خطا در ثبت نام
              </Title>
              <Paragraph>
                {error ||
                  "متاسفانه در ثبت نام مشکلی پیش آمده است. لطفا مجددا تلاش کنید."}
              </Paragraph>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
