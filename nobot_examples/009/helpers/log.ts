import colors from "colors";
import { MESSAGE_TYPES } from "../constants/message-types";

const { red, green, yellow } = colors;

export const log = (message: string, type: MESSAGE_TYPES) => {
  let colorMessage: string;

  switch (type) {
    case MESSAGE_TYPES.ERROR:
      colorMessage = `[ERROR] ${red(message)}`;
      break;
    case MESSAGE_TYPES.WARNING:
      colorMessage = `[WARNING] ${yellow(message)}`;
      break;
    case MESSAGE_TYPES.SUCCESS:
      colorMessage = `[SUCCESS] ${green(message)}`;
      break;
    default:
      colorMessage = `[INFO] ${message}`;
  }

  console.log(colorMessage);
};
