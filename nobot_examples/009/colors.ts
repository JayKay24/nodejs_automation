import { log } from "./helpers/log";
import { MESSAGE_TYPES } from "./constants/message-types";

log("This is a success message", MESSAGE_TYPES.SUCCESS);
log("This is a warning message", MESSAGE_TYPES.WARNING);
log("This is an error message", MESSAGE_TYPES.ERROR);
log("This is an info message", MESSAGE_TYPES.INFO);
