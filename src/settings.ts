import { map } from "nanostores";

const settings = {
  value: map<{
    scale: number;
    pixel: boolean;
  }>({
    scale: 1,
    pixel: true,
  }),

  set scale(scale: number) {
    this.value.setKey("scale", scale);
  },
  get scale() {
    return this.value.get().scale;
  },

  set pixel(pixel: boolean) {
    this.value.setKey("pixel", pixel);
  },
  get pixel() {
    return this.value.get().pixel;
  },
};

export default settings;
