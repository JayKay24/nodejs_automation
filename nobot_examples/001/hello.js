const [, , ...args] = process.argv;
const [name] = args;

if (name === undefined) {
  console.error("Please pass a name, e.g node hello.js James");
  process.exit(0);
}

console.log(`Good day to you, ${name}`);
