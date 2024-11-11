import { FILTER_INPUT_CHECKED_FLAG } from "./constant.js";

export const getCurrentFilter = () =>
  document.querySelector(FILTER_INPUT_CHECKED_FLAG).value;
