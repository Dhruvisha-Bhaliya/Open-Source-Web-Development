const promise = new Promise((resolve, reject) => {
  let success = true; // Change this to false to see the rejection case
  if (success) {
    resolve("Operation successful!");
  } else {
    reject("Operation failed!");
  }
});
promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
