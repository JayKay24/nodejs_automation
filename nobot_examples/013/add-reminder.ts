import fs from "fs";
import colors from "colors";

import { constants, remindersPath } from "./constants";
import { reminders } from "../../data/013/.reminders.json";

const { red, green, yellow } = colors;
const { JSON_WHITESPACE } = constants;

const [, , ...args] = process.argv;
let [reminder] = args;

if (reminder === undefined) {
  console.log(red("Pass a reminder e.g 'pick up a rabbit"));
  process.exit(0);
}

reminder = reminder.trim();

const hasReminderAlready = reminders.indexOf(reminder) > -1;

if (hasReminderAlready) {
  console.log(yellow(`Doh! Already have the reminder '${reminder}' set`));
  process.exit(0);
}

reminders.push(reminder);

fs.writeFileSync(
  remindersPath,
  JSON.stringify({ reminders }, null, JSON_WHITESPACE)
);

console.log(green("Yes! Added reminder"));
