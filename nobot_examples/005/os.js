const os = require("os");

const homeDirectory = os.homedir();
console.log(`Your home directory is: ${homeDirectory}`);

const osPlatform = os.platform();
console.log(`The OS platform is: ${osPlatform}`);

const cpuCores = os.cpus();
const coreCount = cpuCores.length;
console.log(`Core Count: ${coreCount}`);

for (const core of cpuCores) {
  console.log(`Model: ${core.model}`);
  console.log(`Speed: ${core.speed / 1000}GHz`);
  console.log("==========");
}
