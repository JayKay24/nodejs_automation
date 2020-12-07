import fs from "fs";
import readline from "readline";
import { stdin, stdout } from "process";
import path from "path";

const interfaceInstance = readline.createInterface({
  input: stdin,
  output: stdout,
});

const createProjectDirectory = (enteredName: string) => {
  const name = enteredName.trim();
  if (name === "") {
    console.log("Cannot create a project without a name");
    process.exit(0);
  }
  const projectPath = path.join(__dirname, name);
  if (fs.existsSync(projectPath)) {
    console.log(`${name} already exists`);
    process.exit(0);
  }
  console.log(`Creating a new project called ${name}`);
  fs.mkdirSync(projectPath);
};

const onProjectInput = (name: string) => {
  interfaceInstance.close();
  stdin.destroy();
  createProjectDirectory(name);
};

interfaceInstance.question(
  "What is the name of your project? ",
  onProjectInput
);
