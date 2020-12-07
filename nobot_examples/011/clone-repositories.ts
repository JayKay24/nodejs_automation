import path from "path";
import shell from "shelljs";
import colors from "colors";
import repositories from "../../data/011/config.json";

const { cyan, green, blue, red } = colors;

const repositoryDirectory = path.join(__dirname, "my-repositories");

const cloneRepositories = (
  repositoryPath: string,
  repositoryList: string[]
) => {
  const repositoryCount = repositoryList.length;

  if (!repositoryPath || repositoryCount === 0) {
    console.log(red("Invalid path or repository list"));
    return;
  }

  console.log(blue(`Cloning repositories to: ${repositoryDirectory}`));

  shell.cd(repositoryPath);

  repositoryList.forEach((repositoryUrl: string, idx) => {
    console.log(cyan(`Cloning ${idx + 1} of ${repositoryCount}`));
    shell.exec(`git clone ${repositoryUrl} --progress -b master`, {
      shell: "/bin/bash",
    });
  });

  console.log(green("Completed cloning of repositories"));
};

cloneRepositories(repositoryDirectory, repositories.repositories);
