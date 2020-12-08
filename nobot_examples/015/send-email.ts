import dotenv from "dotenv";
import colors from "colors";
import nodemailer from "nodemailer";

import config from "../../data/015/config.json";

dotenv.config();

const { red, green, cyan } = colors;
const [, , ...args] = process.argv;
const REQUIRED_FIELDS_COUNT = 2;

if (args.length !== REQUIRED_FIELDS_COUNT) {
  console.log(
    red("Two arguments required: subject and body"),
    cyan("e.g node send-email.ts 'Where's my tea?' 'So yeah...where is it?'")
  );

  process.exit(0);
}

const [subject, body] = args;
const { HOST, PORT } = JSON.parse(JSON.stringify(config));

const main = async () => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const message = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject,
    body,
    html: `<p>${body}</p>`,
  };

  let info = await transporter.sendMail(message);

  console.log(green(`Message sent: ${info.messageId}`));
};

main().catch((err) => console.error(`Error occurred: ${err.message}`));
