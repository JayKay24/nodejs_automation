import path from "path";

// helpers
import { writeJson } from "./helpers/write-json";
import { fetchDataFromJira as getJiraData } from "./helpers/get-jira-data";

const [, , ...args] = process.argv;
const [ticket] = args;

const CONFIG_FILE = "config.json";
const jiraTicket = ticket || "GS-1000";
const jiraData = getJiraData(jiraTicket);

if (jiraData === undefined) {
  console.log(`JIRA Ticket ${jiraTicket} not found`);
  process.exit(0);
}

const newConfigFile = path.join(__dirname, "..", "..", "data", CONFIG_FILE);

writeJson(newConfigFile, jiraData)
  .then((msg) => console.log(msg))
  .catch((err) => {
    throw err;
  });
