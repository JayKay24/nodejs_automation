import fs from "fs";
import path from "path";

import archiver from "archiver";

const ZLIB_BEST_COMPRESSION = 9;

// create a file to stream archive data to
const zipPath = path.join(__dirname, "..", "..", "data", "zipped", "files.zip");
const output = fs.createWriteStream(zipPath);
const archive = archiver("zip", { zlib: { level: ZLIB_BEST_COMPRESSION } });

// listen for all archive data to be written
output.on("close", () => {
  console.log(`Total bytes: ${archive.pointer()}`);
  console.log("archiving has now finished.");
});

// good practice to catch this error explicitly
archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

// add files (read the copy.txt and logo.jpg and output with different names)
const textPath = path.join(__dirname, "..", "..", "input", "copy.txt");
const logoPath = path.join(__dirname, "..", "..", "input", "batman.jpeg");
const textStream = fs.createReadStream(textPath);
const logoStream = fs.createReadStream(logoPath);

archive.append(textStream, { name: "context.txt" });
archive.append(logoStream, { name: "batman.jpeg" });

// finalize the archive (i.e we are done appending the files but streams have to finish yet)
archive.finalize();
