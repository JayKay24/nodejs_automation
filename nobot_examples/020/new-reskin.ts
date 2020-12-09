import path from "path";

import colors from "colors";
import minimist from "minimist";
import readLineSync from "readline-sync";
import fse from "fs-extra";
import opn from "better-opn";

const { red, green, blue } = colors;
const [, , ...args] = process.argv;
const argv = minimist(args);

const GAME_JSON_FILENAME = "game.json";
let { gameName, gamePrimaryColor, gameSecondaryColor } = argv;

if (gameName === undefined) {
  gameName = readLineSync.question("What is the name of the new reskin? ", {
    limit: (input) => input.trim().length > 0,
    limitMessage: red("This project has to have a name, try again"),
  });
}

const confirmColorInput = (color: string, colorType = "primary") => {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexColorRegex.test(color)) {
    return color;
  }

  return readLineSync.question(
    `Enter a Hex Code for the game ${colorType} color`,
    {
      limit: hexColorRegex,
      limitMessage: blue("Enter a valid hex code: #efefef"),
    }
  );
};

gamePrimaryColor = confirmColorInput(gamePrimaryColor);
gameSecondaryColor = confirmColorInput(gameSecondaryColor, "secondary");

console.log(
  `Creating a new reskin '${gameName}' with skin color: Primary: '${gamePrimaryColor}' Secondary: '${gameSecondaryColor}'`
);

const src = path.join(__dirname, "template");
const destination = path.join(__dirname, "releases", gameName);
const configurationFilePath = path.join(destination, GAME_JSON_FILENAME);
const projectToOpen = path.join(
  "http://localhost:8080",
  "nobot-examples",
  "020",
  "core",
  "releases",
  gameName,
  "index.html"
);

type Config = { primaryColor: string; secondaryColor: string };

const openGameIfAgreed = (fileToOpen: string) => {
  const isOpeningGame = readLineSync.keyInYN(
    "Would you like to open the game? "
  );
  if (isOpeningGame) {
    opn(fileToOpen);
  }
};

fse
  .copy(src, destination)
  .then(() => {
    console.log(green(`Successfully created ${destination}`));
    return fse.readJson(configurationFilePath);
  })
  .then((config: Config) => {
    const newConfig = config;
    newConfig.primaryColor = gamePrimaryColor;
    newConfig.secondaryColor = gameSecondaryColor;

    return fse.writeJson(configurationFilePath, newConfig);
  })
  .then(() => {
    console.log(green(`Updated configuration file ${configurationFilePath}`));
    openGameIfAgreed(projectToOpen);
  });
