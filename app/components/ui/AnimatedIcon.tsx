// components/AnimatedIcon.tsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export interface AnimatedIconProps {
  icon: string;
  size?: number;
  color?: string;
  animation?: "rotate" | "pulse" | "bounce" | "float" | "spin";
  duration?: number;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = React.memo(({
  icon,
  size = 24,
  color = "currentColor",
  animation = "rotate",
  duration = 8,
  className = "",
}) => {
  const animationProps = useMemo(() => {
    switch (animation) {
      case "rotate":
        return {
          animate: { rotate: 360 },
          transition: { duration, repeat: Infinity, ease: "linear" },
        };
      case "pulse":
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: { duration, repeat: Infinity },
        };
      case "bounce":
        return {
          animate: { y: [0, -10, 0] },
          transition: { duration, repeat: Infinity },
        };
      case "float":
        return {
          animate: {
            y: [0, -15, 0],
            x: [0, 5, 0],
          },
          transition: {
            duration,
            repeat: Infinity,
            repeatType: "reverse" as const,
          },
        };
      case "spin":
        return {
          animate: {
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          },
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      default:
        return {};
    }
  }, [animation, duration]);

  return (
    <motion.span
      className={className}
      style={{ display: "inline-flex", fontSize: size, color }}
      {...animationProps}
    >
      <Icon icon={icon} />
    </motion.span>
  );
});
