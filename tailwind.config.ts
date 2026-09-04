import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "surface-dim": "#131315",
        "error": "#ffb4ab",
        "primary": "#ffb1c4",
        "secondary-fixed-dim": "#ecb1ff",
        "on-secondary-container": "#480063",
        "inverse-surface": "#e5e1e4",
        "on-tertiary-fixed": "#002020",
        "on-background": "#e5e1e4",
        "secondary": "#ecb1ff",
        "tertiary": "#00dddd",
        "surface-container-low": "#1c1b1d",
        "surface-container-high": "#2a2a2c",
        "primary-fixed-dim": "#ffb1c4",
        "tertiary-fixed-dim": "#00dddd",
        "inverse-primary": "#ba005b",
        "on-primary-fixed-variant": "#8f0044",
        "surface-container": "#201f21",
        "tertiary-container": "#00a1a1",
        "on-error-container": "#ffdad6",
        "outline-variant": "#5c3f46",
        "on-error": "#690005",
        "on-surface": "#e5e1e4",
        "on-secondary-fixed-variant": "#75009e",
        "surface-bright": "#39393b",
        "on-secondary-fixed": "#320046",
        "surface": "#131315",
        "outline": "#ac878f",
        "secondary-fixed": "#f9d8ff",
        "on-surface-variant": "#e5bcc5",
        "secondary-container": "#d05bff",
        "primary-fixed": "#ffd9e1",
        "error-container": "#93000a",
        "surface-container-highest": "#353437",
        "on-primary-fixed": "#3f001a",
        "on-tertiary-fixed-variant": "#004f4f",
        "on-primary": "#65002e",
        "surface-tint": "#ffb1c4",
        "on-secondary": "#520070",
        "background": "#131315",
        "on-tertiary": "#003737",
        "inverse-on-surface": "#313032",
        "primary-container": "#ff4a8d",
        "on-primary-container": "#590028",
        "tertiary-fixed": "#00fbfb",
        "surface-container-lowest": "#0e0e10",
        "on-tertiary-container": "#002f2f"
      },
      "fontFamily": {
        "headline-lg-mobile": "Sora",
        "label-mono": "Space Mono",
        "headline-lg": "Sora",
        "headline-md": "Sora",
        "body-lg": "Hanken Grotesk",
        "display-lg": "Sora",
        "body-md": "Hanken Grotesk",
        "button-text": "Sora"
      },
      "fontSize": {
        "headline-lg-mobile": "32px",
        "label-mono": "12px",
        "headline-lg": "48px",
        "headline-md": "32px",
        "body-lg": "18px",
        "display-lg": "72px",
        "body-md": "16px",
        "button-text": "14px"
      },
      "fontWeight": {
        "headline-lg-mobile": "700",
        "label-mono": "500",
        "headline-lg": "700",
        "headline-md": "600",
        "body-lg": "400",
        "display-lg": "800",
        "body-md": "400",
        "button-text": "600"
      },
      "lineHeight": {
        "headline-lg-mobile": "1.2",
        "label-mono": "1.0",
        "headline-lg": "1.2",
        "headline-md": "1.3",
        "body-lg": "1.6",
        "display-lg": "1.1",
        "body-md": "1.6",
        "button-text": "1.0"
      },
      "letterSpacing": {
        "label-mono": "0.1em",
        "headline-lg": "-0.02em",
        "display-lg": "-0.04em",
        "button-text": "0.05em"
      },
      "spacing": {
        "stack-md": "24px",
        "stack-lg": "48px",
        "margin-desktop": "64px",
        "gutter": "24px",
        "stack-sm": "12px",
        "margin-mobile": "20px",
        "container-max": "1280px",
        "unit": "8px"
      },
      "borderRadius": {
        "ROUND_EIGHT": "0.5rem"
      }
    },
  },
  plugins: [forms],
};
export default config;
