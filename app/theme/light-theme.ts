import { baseTokens } from "./tokens";
import { theme } from "antd";

export const lightTheme = {
  ...baseTokens,
  algorithm: theme.defaultAlgorithm,
  token: {
    ...baseTokens.token,

    // Color roles
    colorPrimary: baseTokens.token.primary6,
    colorSecondary: baseTokens.token.secondary6,
    colorWarning: baseTokens.token.warning6,
    colorError: baseTokens.token.danger6,
    colorSuccess: baseTokens.token.success6,
    colorInfo: baseTokens.token.primary6,

    // Backgrounds
    colorBgBase: baseTokens.token.neutral1,
    colorBgContainer: baseTokens.token.neutral1,
    colorBgElevated: baseTokens.token.neutral2,
    colorBgLayout: baseTokens.token.neutral2,
    colorBgSpotlight: baseTokens.token.neutral4,

    // Texts
    colorText: baseTokens.token.neutral10,
    colorTextSecondary: baseTokens.token.neutral8,
    colorTextTertiary: baseTokens.token.neutral7,
    colorTextQuaternary: baseTokens.token.neutral6,

    // Borders
    colorBorder: baseTokens.token.neutral5,
    colorBorderSecondary: baseTokens.token.neutral4,

    // Primary states
    colorPrimaryHover: baseTokens.token.primary5,
    colorPrimaryActive: baseTokens.token.primary7,
    colorPrimaryBg: baseTokens.token.primary1,

    // Warning states
    colorWarningHover: baseTokens.token.warning5,
    colorWarningActive: baseTokens.token.warning7,
    colorWarningBg: baseTokens.token.warning1,

    // Danger states
    colorErrorHover: baseTokens.token.danger5,
    colorErrorActive: baseTokens.token.danger7,
    colorErrorBg: baseTokens.token.danger1,

    // Success states
    colorSuccessHover: baseTokens.token.success5,
    colorSuccessActive: baseTokens.token.success7,
    colorSuccessBg: baseTokens.token.success1,

    // Disabled states
    colorBgDisabled: baseTokens.token.neutral3,
    colorTextDisabled: baseTokens.token.neutral6,

    // Controls
    controlItemBgHover: baseTokens.token.primary1,
    controlItemBgActive: baseTokens.token.primary2,
    controlItemBgActiveHover: baseTokens.token.primary3,

    // Links
    colorLink: baseTokens.token.primary6,
    colorLinkHover: baseTokens.token.primary5,
    colorLinkActive: baseTokens.token.primary7,
  },
  components: {
    ...baseTokens.components,
    Button: {
      ...baseTokens.components.Button,
    },
    Card: {
      ...baseTokens.components.Card,
      colorBgContainer: baseTokens.token.neutral1,
      colorBorderSecondary: baseTokens.token.neutral4,
    },
    Input: {
      ...baseTokens.components.Input,
      colorBgContainer: baseTokens.token.neutral1,
      colorBorder: baseTokens.token.neutral5,
    },
    Table: {
      ...baseTokens.components.Table,
      colorBgContainer: baseTokens.token.neutral1,
      colorBorderSecondary: baseTokens.token.neutral4,
      headerBg: baseTokens.token.neutral2,
      rowHoverBg: baseTokens.token.neutral2,
    },
  },
};
