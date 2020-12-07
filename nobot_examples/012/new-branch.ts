import shell from "shelljs";
import readLineSync from "readline-sync";
import path from "path";

import { repository } from "../../data/012/config.json";

const { delivery, baseBranch } = repository;
const repoName = delivery.substring(delivery.lastIndexOf("/") + 1);

const repoPath = path.join(__dirname, repoName);
shell.cd(repoPath);

// Checkout to base branch
shell.exec(`git checkout ${baseBranch}`);

// Making sure we have the latest changes from the remote origin
shell.exec(`git pull origin ${baseBranch}`);

// Prompt for the ticket ID
const ticketId = readLineSync.question("What is the ticket ID?", {
  limit: (input: string) => input.trim().length > 0,
  limitMessage: "Please enter a ticket ID (e.g. GOT-123)",
});

// Create a new branch
shell.exec(`git checkout -b ${ticketId}`);
