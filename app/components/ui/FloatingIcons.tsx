// components/FloatingIcons.tsx
import React, { useMemo } from "react";
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
}> = React.memo(({ config, id }) => {
  const {
    icon,
    color = "#ffd666",
    minSize = 16,
    maxSize = 24,
    minDuration = 15,
    maxDuration = 30,
    opacity = 0.4,
  } = config;

  // Memoize position and size calculations to prevent recreation on re-renders
  const { position, size, duration } = useMemo(
    () => ({
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      size: minSize + Math.random() * (maxSize - minSize),
      duration: minDuration + Math.random() * (maxDuration - minDuration),
    }),
    [minSize, maxSize, minDuration, maxDuration]
  );

  // Memoize animation values to prevent recreation
  const { animationValues, animationTransition } = useMemo(
    () => ({
      animationValues: {
        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
        rotate: [0, 180, 360],
        scale: [0.8, 1.2, 0.8],
      },
      animationTransition: {
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    }),
    [duration]
  );

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
      animate={animationValues}
      transition={animationTransition}
    >
      <Icon icon={icon} />
    </motion.div>
  );
});

export const FloatingIcons: React.FC<FloatingIconsProps> = React.memo(
  ({ count = 8, icons, className = "", zIndex = 0 }) => {
    // Memoize selected icons to prevent recreation on re-renders
    const selectedIcons = useMemo(
      () =>
        Array.from({ length: count }, (_, index) => {
          const randomConfig = icons[Math.floor(Math.random() * icons.length)];
          return {
            ...randomConfig,
            id: index,
          };
        }),
      [count, icons]
    );

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
  }
);
