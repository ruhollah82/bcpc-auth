import React, { useState, useEffect } from "react";
import { Checkbox, Form, Card } from "antd";
import type { StepComponentProps } from "../../../types/registration.types";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

/* ---------- Safe Icon (fallback-proof) ---------- */
const SafeIcon = ({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) => {
  try {
    return <Icon icon={icon} className={className} />;
  } catch {
    return <Icon icon="mdi:alert-circle-outline" className={className} />;
  }
};

export const AgreementStep: React.FC<StepComponentProps> = ({
  formData,
  onDataChange,
}) => {
  const [isAgreed, setIsAgreed] = useState(formData.agreementAccepted || false);

  useEffect(() => {
    setIsAgreed(formData.agreementAccepted || false);
  }, [formData.agreementAccepted]);

  const handleCheckboxChange = (e: any) => {
    const checked = e.target.checked;
    setIsAgreed(checked);
    onDataChange({ agreementAccepted: checked });
  };

  /* ---------- Animations ---------- */
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  /* ---------- Rules ---------- */
  const rules = {
    participants: [
      {
        text: "شرکت کنندگان باید دانشجو در مقطع کارشناسی یا تحصیلات تکمیلی باشند یا حداکثر یک سال از فارغ‌التحصیلی آن‌ها گذشته باشد.",
        icon: "mdi:account-group-outline",
      },
      {
        text: "هر تیم حداکثر شامل ۳ عضو است و فقط یکی از اعضا می‌تواند دانشجوی تحصیلات تکمیلی باشد.",
        icon: "mdi:account-multiple-outline",
      },
      {
        text: "هر دانشجو فقط می‌تواند در یک تیم ثبت‌نام کند.",
        icon: "mdi:account-lock-outline",
      },
      {
        text: "اعضای یک تیم می‌توانند از دانشگاه‌های مختلف باشند.",
        icon: "mdi:school-outline",
      },
    ],
    competition: [
      {
        text: "مسابقه به صورت حضوری برگزار می‌شود.",
        icon: "mdi:map-marker-outline",
      },
      {
        text: "هر تیم باید لپ‌تاپ شخصی همراه داشته باشد.",
        icon: "mdi:laptop",
      },
      {
        text: "مدت زمان مسابقه ۱ ساعت است.",
        icon: "mdi:timer-outline",
      },
      {
        text: "هر تیم می‌تواند از یک کامپیوتر استفاده کند.",
        icon: "mdi:desktop-classic",
      },
      {
        text: "استفاده از اینترنت ممنوع است.",
        icon: "mdi:wifi-off",
      },
      {
        text: "استفاده از کتابخانه‌ها یا منابع غیرمجاز ممنوع است.",
        icon: "mdi:book-off-outline",
      },
      {
        text: "در صورت تخلف، تیم از مسابقه حذف خواهد شد.",
        icon: "mdi:close-circle-outline",
      },
      {
        text: "در صورت بروز مشکل فنی، تصمیم نهایی با کمیته برگزاری است.",
        icon: "mdi:account-tie-outline",
      },
    ],
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* ---------- Participants ---------- */}
      <motion.div variants={itemVariants}>
        <Card
          bordered={false}
          className="rounded-2xl"
          bodyStyle={{ padding: "20px 24px" }}
          style={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
          title={
            <div className="flex items-center gap-2">
              <SafeIcon
                icon="mdi:account-multiple-check"
                className="text-xl text-blue-600"
              />
              <span className="font-semibold">قوانین شرکت‌کنندگان</span>
            </div>
          }
        >
          <AnimatePresence>
            {rules.participants.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-4 py-2"
              >
                <SafeIcon
                  icon={rule.icon}
                  className="text-lg text-blue-500 mt-1"
                />
                <span className="leading-relaxed">{rule.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* ---------- Competition ---------- */}
      <motion.div variants={itemVariants}>
        <Card
          bordered={false}
          className="rounded-2xl"
          bodyStyle={{ padding: "20px 24px" }}
          style={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
          title={
            <div className="flex items-center gap-2">
              <SafeIcon
                icon="mdi:trophy-outline"
                className="text-xl text-amber-600"
              />
              <span className="font-semibold">قوانین مسابقه</span>
            </div>
          }
        >
          <AnimatePresence>
            {rules.competition.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-4 py-2"
              >
                <SafeIcon
                  icon={rule.icon}
                  className="text-lg text-amber-500 mt-1"
                />
                <span className="leading-relaxed">{rule.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* ---------- Agreement Checkbox ---------- */}
      <Form.Item
        name="agreementAccepted"
        valuePropName="checked"
        className="mt-10 flex justify-center"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("برای ادامه باید با قوانین موافقت کنید")
                  ),
          },
        ]}
      >
        <motion.div whileHover={{ scale: 1.02 }} className="w-full max-w-xl">
          <Checkbox
            checked={isAgreed}
            onChange={handleCheckboxChange}
            className="
              w-full
              flex
              justify-center
              rounded-2xl
              px-6
              py-5
              bg-slate-50
              border
              border-slate-200
              hover:border-blue-400
              transition-all
            "
          >
            <span className="text-base md:text-lg font-medium text-center leading-relaxed">
              قوانین را خوانده‌ام و با آن‌ها موافقم
            </span>
          </Checkbox>
        </motion.div>
      </Form.Item>
    </motion.div>
  );
};
