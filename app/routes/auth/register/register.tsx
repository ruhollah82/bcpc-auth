import { useNavigate, useSearchParams } from "react-router";
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
  Image,
} from "antd";

import { RegistrationWizard } from "../../../components/wizard/RegistrationWizard";
import { AppModal } from "../../../components/wizard/RegistrationModal";
import { useRegistration } from "../../../hooks/useRegistration";
import { FloatingIcons } from "~/components/ui/FloatingIcons";
import { useMemo } from "react";

// ICPC-related floating icons with optimized configuration
const floatingIconsConfig = [
  // Programming & Code Icons
  { icon: "mdi:code-braces", color: "#1890ff", minSize: 18, maxSize: 26 },
  { icon: "mdi:xml", color: "#52c41a", minSize: 16, maxSize: 24 },
  { icon: "mdi:language-cpp", color: "#0050b3", minSize: 20, maxSize: 28 },
  { icon: "mdi:language-java", color: "#fa8c16", minSize: 18, maxSize: 26 },
  { icon: "mdi:language-python", color: "#389e0d", minSize: 19, maxSize: 27 },

  // Competition & Achievement Icons
  // { icon: "mdi:trophy", color: "#faad14", minSize: 22, maxSize: 30 },
  // { icon: "mdi:medal", color: "#fadb14", minSize: 20, maxSize: 28 },
  { icon: "mdi:star", color: "#ffe58f", minSize: 16, maxSize: 24 },
  { icon: "mdi:star-four-points", color: "#ff7875", minSize: 16, maxSize: 22 },
  // { icon: "mdi:crown", color: "#ffd666", minSize: 18, maxSize: 26 },

  // Ballon Icons
  { icon: "tabler:ballon", color: "#722ed1", minSize: 20, maxSize: 28 },
  { icon: "tabler:ballon", color: "#13c2c2", minSize: 18, maxSize: 26 },
  { icon: "tabler:ballon", color: "#eb2f96", minSize: 19, maxSize: 27 },

  // Algorithm & Logic Icons
  { icon: "mdi:brain", color: "#cf1322", minSize: 16, maxSize: 24 },
  { icon: "mdi:puzzle", color: "#7cb305", minSize: 14, maxSize: 20 },
  { icon: "mdi:lightbulb-on", color: "#ffd666", minSize: 13, maxSize: 21 },

  // Technology & Computer Icons
  { icon: "mdi:desktop-classic", color: "#40a9ff", minSize: 22, maxSize: 30 },
  { icon: "mdi:cpu-64-bit", color: "#36cfc9", minSize: 19, maxSize: 27 },
  // { icon: "mdi:database", color: "#95de64", minSize: 20, maxSize: 28 },
];

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirectTo = params.get("redirectTo") ?? "/dashboard";

  // Memoize floating icons config to prevent recreation on every render
  const memoizedFloatingIcons = useMemo(() => floatingIconsConfig, []);

  const {
    formData,
    currentStep,
    direction,
    isSubmitting,
    error,
    handleNext,
    handleBack,
    handleSubmit,
    updateFormData,
  } = useRegistration(redirectTo, navigate);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100%",
        }}
      >
        <FloatingIcons count={15} icons={memoizedFloatingIcons} zIndex={0} />
        <div
          className="w-full flex justify-center items-start"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            className="
          w-full p-3 
          md:w-[70%] md:p-6 
          max-w-4xl
        "
          >
            <div className="text-center mb-6">
              <Space direction="vertical" size="small">
                <Image
                  src="/favicon.svg"
                  preview={false}
                  style={{
                    padding: "10px",
                    alignItems: "center",
                  }}
                />
              </Space>
            </div>

            <RegistrationWizard
              currentStep={currentStep}
              direction={direction}
              isSubmitting={isSubmitting}
              error={error}
              formData={formData}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={handleSubmit}
              onFormDataChange={updateFormData}
            />
          </div>

          <AppModal />
        </div>
      </div>
    </>
  );
}
