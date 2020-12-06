import fs from "fs";

const JSON_WHITESPACE = 4;

export const writeJson = (file: string, contents: object) =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      file,
      JSON.stringify(contents, null, JSON_WHITESPACE),
      (err) => {
        if (err) {
          reject(err);
        }
        resolve(`${file} written`);
      }
    );
  });
