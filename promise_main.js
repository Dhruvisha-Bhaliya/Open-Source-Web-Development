var fs = require("fs");

function readFile(fpath, enc) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, enc, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFile("./files/file1.txt", "utf-8")
  .then((data) => {
    console.log("File Contents: ");
    console.log(data);
  })
  .catch((err) => {
    console.log("Error: ", err);
    console.log(err);
  });

const fspromise = require("fs/promises");
fspromise.readFile("./files/file1.txt", "utf-8")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//Traditional callback-based approach
fs.readFile("./files/file1.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else console.log(data);
});
