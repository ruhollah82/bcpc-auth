const radiusBase = 16;
const componentRadius = 12; // Specific radius for form components

export const baseTokens = {
  token: {
    // Primary Colors (Pink)
    primary1: "#fff3e1",
    primary2: "#ffe0b2",
    primary3: "#ffcc80",
    primary4: "#ffb74d",
    primary5: "#ffa726",
    primary6: "#ff8000",
    primary7: "#f57c00",
    primary8: "#ef6c00",
    primary9: "#e65100",
    primary10: "#ff5722",

    // Secondary Colors (Purple)
    secondary1: "#f3e5f5",
    secondary2: "#e1bee7",
    secondary3: "#ce93d8",
    secondary4: "#ba68c8",
    secondary5: "#ab47bc",
    secondary6: "#9c27b0",
    secondary7: "#8e24aa",
    secondary8: "#7b1fa2",
    secondary9: "#6a1b9a",
    secondary10: "#4a148c",

    // Warning Colors (Amber)
    warning1: "#fff8e1",
    warning2: "#ffecb3",
    warning3: "#ffe082",
    warning4: "#ffd54f",
    warning5: "#ffca28",
    warning6: "#ffc107",
    warning7: "#ffb300",
    warning8: "#ffa000",
    warning9: "#ff8f00",
    warning10: "#ff6f00",

    // Danger Colors (Red)
    danger1: "#ffebee",
    danger2: "#ffcdd2",
    danger3: "#ef9a9a",
    danger4: "#e57373",
    danger5: "#ef5350",
    danger6: "#f44336",
    danger7: "#e53935",
    danger8: "#d32f2f",
    danger9: "#c62828",
    danger10: "#b71c1c",

    // Success Colors (Green)
    success1: "#e8f5e9",
    success2: "#c8e6c9",
    success3: "#a5d6a7",
    success4: "#81c784",
    success5: "#66bb6a",
    success6: "#4caf50",
    success7: "#43a047",
    success8: "#388e3c",
    success9: "#2e7d32",
    success10: "#1b5e20",

    // Neutral Colors
    neutral1: "#ffffff",
    neutral2: "#fafafa",
    neutral3: "#f5f5f5",
    neutral4: "#f0f0f0",
    neutral5: "#d9d9d9",
    neutral6: "#bfbfbf",
    neutral7: "#8c8c8c",
    neutral8: "#595959",
    neutral9: "#434343",
    neutral10: "#262626",

    // Typography
    borderRadius: radiusBase,
    fontFamily: "Vazirmatn, Vazir, Tahoma, sans-serif",
    fontSize: 16,
    fontSizeSM: 14,
    fontSizeLG: 16,

    // Custom Design Tokens
    componentBorderRadius: componentRadius,
    componentBorderWidth: 2,
    componentPadding: "12px 16px",
    componentBoxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    componentBackground: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
    componentBorderColor: "#f0f0f0",
    buttonHeight: 48,
    buttonFontWeight: 600,
  },

  components: {
    Button: {
      borderRadius: componentRadius,
      controlHeight: 48,
      fontWeight: 600,
    },
    Input: {
      borderRadius: componentRadius,
      controlHeight: 40,
      paddingBlock: 12,
      paddingInline: 16,
      fontSize: 16,
    },
    TextArea: {
      borderRadius: componentRadius,
      paddingBlock: 12,
      paddingInline: 16,
      fontSize: 16,
      lineHeight: 1.6,
    },
    Select: {
      borderRadius: componentRadius,
      controlHeight: 40,
      paddingBlock: 12,
      paddingInline: 16,
      fontSize: 16,
    },
    Card: {
      borderRadius: radiusBase * 1.5,
    },
    Modal: {
      borderRadius: radiusBase * 1.5,
    },
    Table: {
      borderRadius: radiusBase,
    },
    // سایر کامپوننت‌ها...
  },
};
