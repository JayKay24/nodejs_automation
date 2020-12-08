import fs from "fs";
import path from "path";
import { stdout } from "process";

import { parse, transform } from "csv";
import colors from "colors";

const { bgGreen, bgBlue } = colors;

const DELAY_TIME = 0;
const CSV_FILE = "game-releases.csv";
const parser = parse({ delimiter: "," });
const gameReleasesPath = path.join(__dirname, CSV_FILE);
const input = fs.createReadStream(gameReleasesPath);
let iterator = 1;

const processRecords = (record: string[], callback: Function) => {
  const [game, template] = record;
  let message = `Deploying game ${iterator} '${game}' with template: ${template}`;
  message = iterator % 2 === 0 ? bgGreen(message) : bgBlue(message);
  iterator++;
  setTimeout(() => {
    // build game here
    callback(null, `${message}\n`);
  }, DELAY_TIME);
};

const transformer = transform(processRecords);

input.pipe(parser).pipe(transformer).pipe(stdout);
