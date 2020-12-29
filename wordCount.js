function mergeObjectsInUnique(array, property) {
  const newArray = new Map();

  array.forEach((item) => {
    const propertyValue = item[property];
    newArray.has(propertyValue)
      ? newArray.set(propertyValue, { ...item, ...newArray.get(propertyValue) })
      : newArray.set(propertyValue, item);
  });

  return Array.from(newArray.values());
}

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const readingTime = require("reading-time");

const projectRoot = path.join(__dirname);

const logFilePath = path.join(projectRoot, "_data/logfile.json");

glob(
  "_posts/*.md",
  { ignore: ["**/node_modules/**", "**/README.md"] },
  function (err, files) {
    if (err) {
      throw new Error(err.message);
    }

    files.forEach((file) => {
      const logFileContent = fs.readFileSync(`${logFilePath}`, "utf8");
      const markdownFileContent = fs.readFileSync(`${file}`, "utf8");

      const initialWordCount = readingTime(markdownFileContent).words;

      const parsedFile = JSON.parse(logFileContent);
      const fileName = file.replace("_posts/", "").split(".")[0];

      const existingFileObject = parsedFile.find(
        (file) => file.name === fileName
      );

      if (!existingFileObject) {
        console.info(
          `'${fileName}' seems to be a new file, adding to wordCount.js log file...`
        );

        const newContent = [
          ...parsedFile,
          {
            name: fileName,
            initialWords: initialWordCount,
          },
        ];

        fs.writeFileSync(logFilePath, JSON.stringify(newContent, null, 2));
      } else {
        const latestTimestamp = Object.keys(existingFileObject)[
          Object.keys(existingFileObject).length - 1
        ];

        const currentWords = existingFileObject[latestTimestamp].currentWords;

        const wordCountExisting =
          currentWords != null ? currentWords : existingFileObject.initialWords;
        const wordCountNew = readingTime(markdownFileContent).words;

        const diffTimestamp = new Date().toISOString();
        const diffInWords = wordCountNew - wordCountExisting;

        if (diffInWords !== 0) {
          console.info(`Changes found in '${fileName}', creating diff...`);

          const updatingFileWithDiffContent = mergeObjectsInUnique(
            [
              ...parsedFile,
              {
                ...existingFileObject,
                [diffTimestamp]: {
                  diff: diffInWords,
                  currentWords: wordCountNew,
                },
              },
            ],
            "name"
          );

          fs.writeFileSync(
            logFilePath,
            JSON.stringify(updatingFileWithDiffContent, null, 2)
          );
        }
      }
    });
  }
);
