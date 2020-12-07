import fs from "fs";
import path from "path";
import colors from "colors";
import readLineSync from "readline-sync";

import { constants, remindersPath } from "./constants";
import { reminders } from "../../data/013/.reminders.json";

const { green, red } = colors;
const { JSON_WHITESPACE, NO_CHOICE_MADE } = constants;

if (reminders.length === 0) {
  console.log(green("No reminders!"));
  process.exit(0);
}

const index = readLineSync.keyInSelect(
  reminders,
  "What reminder have you dealt with? "
);

if (index === NO_CHOICE_MADE) {
  process.exit(0);
}

console.log(red(`you removed ${reminders[index]}`));

reminders.splice(index, 1);

fs.writeFileSync(
  remindersPath,
  JSON.stringify({ reminders }, null, JSON_WHITESPACE)
);
