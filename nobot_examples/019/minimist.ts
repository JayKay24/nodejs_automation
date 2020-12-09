import minimist from "minimist";
import readLineSync from "readline-sync";
import colors from "colors";

const { red, green, yellow, blue } = colors;
const NO_CHOICE_MADE = -1;
const [, , ...args] = process.argv;
const argv = minimist(args);

let { name, template, ticket } = argv;
const templates = ["pick-of-three", "tic-tac-toe", "spin-the-wheel"];

console.log(argv);

if (name === undefined) {
  name = readLineSync.question("What is the name of the new game? ", {
    limit: (input) => input.trim().length > 0,
    limitMessage: "The game must have a name",
  });
}

if (template === undefined || !templates.includes(template)) {
  const templateIndex = readLineSync.keyInSelect(
    templates,
    yellow("Choose your template: ")
  );
  if (templateIndex === NO_CHOICE_MADE) {
    console.log(templateIndex);
    console.log(blue("No template chosen. Stopping execution"));
    process.exit(0);
  }
  template = templates[templateIndex];
}

if (ticket === undefined || ticket.indexOf("GS-") < 0) {
  ticket = `GS-${readLineSync.question("Enter ticket number: GS-", {
    limit: (input) => input.trim().length > 0,
    limitMessage: red("Cannot continue without a ticket number"),
  })}`;
}

console.log(
  green(
    `Creating game '${name}' with template '${template}' on branch '${ticket}'`
  )
);
