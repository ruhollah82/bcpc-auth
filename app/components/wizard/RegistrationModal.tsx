// components/wizard/RegistrationModal.tsx
import { Modal, Button, Typography } from "antd";
import { Icon } from "@iconify/react";

const { Title, Paragraph } = Typography;

interface RegistrationModalProps {
  visible: boolean;
  status: "success" | "error";
  error: string | null;
  onClose: () => void;
  redirectTo: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  visible,
  status,
  error,
  onClose,
  redirectTo,
}) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="submit" type="primary" onClick={onClose}>
          {status === "success" ? "ورود به داشبورد" : "بستن"}
        </Button>,
      ]}
      centered
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        {status === "success" ? (
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
  );
};
