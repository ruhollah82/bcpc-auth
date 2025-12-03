import { Modal, Button, Typography, Alert, Space, Divider } from "antd";
import { Icon } from "@iconify/react";
import { useUIStore } from "../../store/ui.store";
import { CopyOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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

  // Function to check if message contains credentials pattern
  const hasCredentials = (message: string) => {
    return (
      message && message.includes("USERNAME:") && message.includes("PASSWORD:")
    );
  };

  // Parse credentials from message string
  const parseCredentials = (message: string) => {
    if (!message) return null;

    const usernameMatch = message.match(/USERNAME:\s*([^\n]+)/);
    const passwordMatch = message.match(/PASSWORD:\s*([^\n]+)/);
    const emailMatch = message.match(/EMAIL:\s*([^\n]+)/);

    if (usernameMatch && passwordMatch) {
      return {
        username: usernameMatch[1].trim(),
        password: passwordMatch[1].trim(),
        email: emailMatch ? emailMatch[1].trim() : undefined,
      };
    }
    return null;
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: Add a toast notification here if you have one
    // toast.success('کپی شد');
  };

  // Extract message without credentials
  const getMainMessage = (message: string) => {
    if (!message) return "";

    // Find the part before credentials markers
    const credentialIndex = message.indexOf("USERNAME:");
    if (credentialIndex !== -1) {
      return message.substring(0, credentialIndex).trim();
    }
    return message;
  };

  // Render credentials display
  const renderCredentials = (message: string) => {
    const credentials = parseCredentials(message);
    if (!credentials) return null;

    return (
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <div
            style={{
              backgroundColor: "#f6ffed",
              padding: 16,
              borderRadius: 8,
              border: "1px solid #b7eb8f",
              direction: "rtl",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text strong style={{ minWidth: 80 }}>
                نام کاربری:
              </Text>
              <Space style={{ flex: 1, justifyContent: "flex-end" }}>
                <Text
                  code
                  style={{
                    fontSize: 14,
                    padding: "4px 8px",
                    backgroundColor: "#fff",
                    borderRadius: 4,
                  }}
                >
                  {credentials.username}
                </Text>
                <Button
                  icon={<CopyOutlined />}
                  size="small"
                  onClick={() => copyToClipboard(credentials.username)}
                  type="text"
                  style={{ color: "#1890ff" }}
                />
              </Space>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text strong style={{ minWidth: 80 }}>
                رمز عبور:
              </Text>
              <Space style={{ flex: 1, justifyContent: "flex-end" }}>
                <Text
                  code
                  style={{
                    fontSize: 14,
                    padding: "4px 8px",
                    backgroundColor: "#fff",
                    borderRadius: 4,
                  }}
                >
                  {credentials.password}
                </Text>
                <Button
                  icon={<CopyOutlined />}
                  size="small"
                  onClick={() => copyToClipboard(credentials.password)}
                  type="text"
                  style={{ color: "#1890ff" }}
                />
              </Space>
            </div>

            {credentials.email && (
              <>
                <Divider style={{ margin: "12px 0" }} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text strong style={{ minWidth: 80 }}>
                    ایمیل:
                  </Text>
                  <Text style={{ textAlign: "left", direction: "ltr" }}>
                    {credentials.email}
                  </Text>
                </div>
              </>
            )}
          </div>

          <Alert
            message="توجه:"
            description="برای ورود به پنل کاربری خود به این اطلاعات نیاز خواهید داشت. لطفا آنها را در جایی امن یادداشت کنید."
            type="warning"
            showIcon
          />
        </Space>
      </div>
    );
  };

  const showCredentials = modal.message && hasCredentials(modal.message);
  const mainMessage = getMainMessage(modal.message);

  return (
    <Modal
      open={true}
      onCancel={handleConfirm}
      footer={[
        <Button key="submit" type="primary" onClick={handleConfirm}>
          {modal.type === "success" ? "تایید و ادامه" : "بستن"}
        </Button>,
      ]}
      centered
      width={showCredentials ? 500 : undefined}
      style={showCredentials ? { maxWidth: "90%" } : {}}
    >
      <div
        style={{
          textAlign: "center",
          padding: showCredentials ? "20px 0" : "20px",
          direction: "rtl",
        }}
      >
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
            marginBottom: showCredentials ? 20 : 16,
          }}
        >
          {modal.title}
        </Title>

        {mainMessage && (
          <div
            style={{
              textAlign: "center",
              marginBottom: showCredentials ? 20 : 0,
            }}
          >
            <Text style={{ fontSize: 16 }}>{mainMessage}</Text>
          </div>
        )}

        {showCredentials && renderCredentials(modal.message)}

        {/* {!showCredentials && modal.message && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text>{modal.message}</Text>
          </div>
        )} */}
      </div>
    </Modal>
  );
};
