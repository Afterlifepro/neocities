import { map } from "nanostores";
import log from "@/logs";

const settings = {
  value: map<{
    scale: number;
    pixel: boolean;
  }>({
    scale: 1,
    pixel: true,
  }),

  set scale(scale: number) {
    log("setting", "indigo", "scale")
    this.value.setKey("scale", scale);
  },
  get scale() {
    log("getting", "blueviolet", "scale")
    return this.value.get().scale;
  },

  set pixel(pixel: boolean) {
    log("setting", "indigo", "pixel")
    this.value.setKey("pixel", pixel);
  },
  get pixel() {
    log("getting", "blueviolet", "pixel")
    return this.value.get().pixel;
  },
};

export default settings;
