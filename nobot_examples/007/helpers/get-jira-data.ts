import * as jiraData from "../../../data/mock-jira-data.json";

const someData = JSON.parse(JSON.stringify(jiraData));
// Imagine this data being retrieved from jira and transformed
export const fetchDataFromJira = (ticketNumber: string) =>
  someData[ticketNumber];
