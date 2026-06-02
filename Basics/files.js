import { log } from "console";
import fs from "fs";
//? Write file
// Sync...
// fs.writeFileSync('./testFile.txt', "hi there")

//Async ...
// fs.writeFile("./testFile2.txt", "async", (err) => {});

//? Read file

const read = fs.readFileSync("./testFile.txt", "utf-8");
// console.log(read); //hi there

fs.readFile("./testFile2.txt", "utf-8", (err, result) => {
  if (err) {
    // console.log("Error:", err);
  } else {
    // console.log(result);  
  }
});

// fs.appendFileSync('./testFile.txt', 'Hi there\n')
// fs.cpSync('./testFile.txt', './copyFile.txt')

// fs.unlinkSync('./toDelete.txt')

console.log(fs.statSync('./testFile.txt'))