export type Theme = {
  colorType: ThemeColorType;
  name: string;
  fromColor?: string;
  toColor?: string;
  gradientDirection: GradientDirection;
  color?: string;
  textColor: string;
  buttonRoundness: string;
  buttonColor: string;
};

export type ThemeColorType = "gradient" | "flat";

export type GradientDirection = "t" | "b";
