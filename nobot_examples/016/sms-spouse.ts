import readLineSync from "readline-sync";
import twilio from "twilio";
import colors from "colors";

import config from "../../data/016/config.json";

const { red, green, cyan } = colors;
const NO_CHOICE_MADE = -1;

const {
  TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  MY_SPOUSE_NUMBER,
} = config;

const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const foodChoices = [
  "spag bowl 2nite",
  "chinese takeaway 2nite",
  "pie n mash 2nite",
  "mushroom risotto",
  "pizza and fries",
  "2 recover from my lunch, no food plz!",
  "2 cook 2nite",
];

const index = readLineSync.keyInSelect(
  foodChoices,
  "What would you like for dinner? "
);

if (index === NO_CHOICE_MADE) {
  console.log(red("No choice made. Aborting..."));
  process.exit(0);
}

const smsMessage = {
  body: `Hi babe, I'd like ${foodChoices[index]}`,
  from: TWILIO_PHONE_NUMBER,
  to: MY_SPOUSE_NUMBER,
};

console.log(cyan(`sending message: ${smsMessage.body}`));

client.messages
  .create(smsMessage)
  .then(({ sid }) => {
    console.log(green(`SMS sent. Id: ${sid}`));
  })
  .catch((err) => console.error("Error sending Twilio message", err));
