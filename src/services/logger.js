import bunyan from "bunyan";

import { LOG_LEVEL } from "../config";

export const log = bunyan.createLogger({
  name: "c2w-lambda-api-clubs",
  level:
    process.env.NODE_ENV === "test" && !process.env.LOG_LEVEL
      ? "fatal"
      : LOG_LEVEL
});
