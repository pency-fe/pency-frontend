import { RGBColor } from "colorthief";

export const rgbToHex = (rgb: RGBColor) =>
  "#" +
  rgb
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");
