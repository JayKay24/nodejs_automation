const { platform } = require("os");
const { exec } = require("child_process");

const WINDOWS_PLATFORM = "win32";

const osPlatform = platform();
export const [, , ...args] = process.argv;
const [url] = args;

if (url === undefined) {
  console.error("Please enter a URL, e.g. 'http://opencanvas.co.uk'");
  process.exit(0);
}

let command: string;

if (osPlatform === WINDOWS_PLATFORM) {
  command = `start microsoft-edge:${url}`;
} else {
  command = `open -a "Google Chrome" ${url}`;
}

console.log(`executing command: ${command}`);

exec(command);
