const querystring = require("querystring");

const apiHost = "http://jira.my-company.com/rest/api/latest/search?jql=";

const jqlParams = {
  assignee: "james.njuguna",
  startAt: 2,
  maxResults: 2,
};

const apiUrl = `${apiHost}"${querystring.stringify(jqlParams)}"`;

console.log(`My JQL api call is: ${apiUrl}`);
