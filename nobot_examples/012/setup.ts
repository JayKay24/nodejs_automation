import colors from "colors";
import shell from "shelljs";
import { repository } from "../../data/012/config.json";

const { cyan } = colors;
const { delivery } = repository;

console.log(cyan(`Cloning ${delivery}`));
shell.cd(__dirname);

shell.exec(`git clone ${delivery} --progress`);
