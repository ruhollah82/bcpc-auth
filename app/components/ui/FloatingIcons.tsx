// components/FloatingIcons.tsx
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export interface FloatingIconConfig {
  icon: string;
  color?: string;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  opacity?: number;
}

interface FloatingIconsProps {
  count?: number;
  icons: FloatingIconConfig[];
  className?: string;
  zIndex?: number;
}

const FloatingIcon: React.FC<{
  config: FloatingIconConfig;
  id: number;
}> = ({ config, id }) => {
  const {
    icon,
    color = "#ffd666",
    minSize = 16,
    maxSize = 24,
    minDuration = 15,
    maxDuration = 30,
    opacity = 0.4,
  } = config;

  const position = {
    x: Math.random() * 100,
    y: Math.random() * 100,
  };

  const size = minSize + Math.random() * (maxSize - minSize);
  const duration = minDuration + Math.random() * (maxDuration - minDuration);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        fontSize: `${size}px`,
        color: color,
        opacity: opacity,
        pointerEvents: "none",
      }}
      animate={{
        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
        rotate: [0, 180, 360],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <Icon icon={icon} />
    </motion.div>
  );
};

export const FloatingIcons: React.FC<FloatingIconsProps> = ({
  count = 8,
  icons,
  className = "",
  zIndex = 0,
}) => {
  // Randomly select icons from the provided list
  const selectedIcons = Array.from({ length: count }, (_, index) => {
    const randomConfig = icons[Math.floor(Math.random() * icons.length)];
    return {
      ...randomConfig,
      id: index,
    };
  });

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: zIndex,
        overflow: "hidden",
      }}
    >
      {/* <h1>skclslkdnc</h1> */}
      {selectedIcons.map((config) => (
        <FloatingIcon
          key={`floating-icon-${config.id}`}
          config={config}
          id={config.id}
        />
      ))}
    </div>
  );
};
