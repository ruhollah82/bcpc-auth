import { Modal, Button, Typography } from "antd";
import { Icon } from "@iconify/react";
import { useUIStore } from "../../store/ui.store";

const { Title, Paragraph } = Typography;

export const AppModal = () => {
  const { modal, closeModal } = useUIStore();

  if (!modal) return null;

  const iconProps = {
    width: 64,
    height: 64,
    style: { marginBottom: 16 },
  };

  const getIcon = () => {
    switch (modal.type) {
      case "success":
        return (
          <Icon
            icon="mdi:check-circle"
            {...iconProps}
            style={{ color: "#52c41a" }}
          />
        );
      case "error":
        return (
          <Icon
            icon="mdi:alert-circle"
            {...iconProps}
            style={{ color: "#ff4d4f" }}
          />
        );
      default:
        return (
          <Icon
            icon="mdi:information"
            {...iconProps}
            style={{ color: "#1890ff" }}
          />
        );
    }
  };

  const handleConfirm = () => {
    closeModal();
    modal.onConfirm?.();
  };

  return (
    <Modal
      open={true}
      onCancel={handleConfirm}
      footer={[
        <Button key="submit" type="primary" onClick={handleConfirm}>
          {modal.type === "success" ? "تایید" : "بستن"}
        </Button>,
      ]}
      centered
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        {getIcon()}
        <Title
          level={3}
          style={{
            color:
              modal.type === "success"
                ? "#52c41a"
                : modal.type === "error"
                ? "#ff4d4f"
                : "#1890ff",
          }}
        >
          {modal.title}
        </Title>
        <Paragraph>{modal.message}</Paragraph>
      </div>
    </Modal>
  );
};
