import { baseTokens } from "./tokens";
import { theme } from "antd";

export const darkTheme = {
  ...baseTokens,
  algorithm: theme.darkAlgorithm,
  token: {
    ...baseTokens.token,

    // Color roles
    colorPrimary: baseTokens.token.primary5,
    colorSecondary: baseTokens.token.secondary5,
    colorWarning: baseTokens.token.warning5,
    colorError: baseTokens.token.danger5,
    colorSuccess: baseTokens.token.success5,
    colorInfo: baseTokens.token.primary5,

    // Backgrounds
    colorBgBase: "#121212",
    colorBgContainer: "#1d1d1d",
    colorBgElevated: "#242424",
    colorBgLayout: "#1a1a1a",
    colorBgSpotlight: "#383838",

    // Texts
    colorText: "rgba(255, 255, 255, 0.85)",
    colorTextSecondary: "rgba(255, 255, 255, 0.65)",
    colorTextTertiary: "rgba(255, 255, 255, 0.45)",
    colorTextQuaternary: "rgba(255, 255, 255, 0.25)",

    // Borders
    colorBorder: "#424242",
    colorBorderSecondary: "#303030",

    // Primary states
    colorPrimaryHover: baseTokens.token.primary4,
    colorPrimaryActive: baseTokens.token.primary6,
    colorPrimaryBg: baseTokens.token.primary9,

    // Warning states
    colorWarningHover: baseTokens.token.warning4,
    colorWarningActive: baseTokens.token.warning6,
    colorWarningBg: baseTokens.token.warning9,

    // Danger states
    colorErrorHover: baseTokens.token.danger4,
    colorErrorActive: baseTokens.token.danger6,
    colorErrorBg: baseTokens.token.danger9,

    // Success states
    colorSuccessHover: baseTokens.token.success4,
    colorSuccessActive: baseTokens.token.success6,
    colorSuccessBg: baseTokens.token.success9,

    // Disabled states
    colorBgDisabled: "#2a2a2a",
    colorTextDisabled: "rgba(255, 255, 255, 0.3)",

    // Controls
    controlItemBgHover: "rgba(255, 255, 255, 0.08)",
    controlItemBgActive: baseTokens.token.primary7,
    controlItemBgActiveHover: baseTokens.token.primary6,

    // Links
    colorLink: baseTokens.token.primary5,
    colorLinkHover: baseTokens.token.primary4,
    colorLinkActive: baseTokens.token.primary6,
  },
  components: {
    ...baseTokens.components,
    Button: {
      ...baseTokens.components.Button,
      colorPrimaryBg: baseTokens.token.primary9,
      colorPrimaryHover: baseTokens.token.primary8,
      colorPrimaryActive: baseTokens.token.primary7,
      colorPrimaryBorder: baseTokens.token.primary7,
    },
    Card: {
      ...baseTokens.components.Card,
      colorBgContainer: "#1d1d1d",
      colorBorderSecondary: "#303030",
    },
    Input: {
      ...baseTokens.components.Input,
      colorBgContainer: "#1d1d1d",
      colorBorder: "#424242",
      colorText: "rgba(255, 255, 255, 0.85)",
    },
    Table: {
      ...baseTokens.components.Table,
      colorBgContainer: "#1d1d1d",
      colorBorderSecondary: "#303030",
      headerBg: "#242424",
      rowHoverBg: "rgba(255, 255, 255, 0.08)",
    },
  },
};
