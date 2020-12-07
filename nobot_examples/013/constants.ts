import path from "path";

export const constants = {
  JSON_WHITESPACE: 4,
  NO_CHOICE_MADE: -1,
};

export const remindersPath = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "013",
  ".reminders.json"
);
