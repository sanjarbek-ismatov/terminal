import readline from "readline";
import { exec } from "child_process";
import path from "path";
import os from "os";
import { fileCopy, fileList, fileMove, fileReader } from "./helpers/fileReader";
const rl = readline.createInterface(process.stdin, process.stdout);
let currentPath = __dirname;
const changeDir = (location: string) => {
  try {
    process.chdir(location);
    return process.cwd();
  } catch (ex: any) {
    console.log(new Error(ex).message);
  }
  return currentPath;
};

const terminal = () => {
  rl.question(currentPath + ">", (answer) => {
    const input = answer.split(" ");
    switch (input[0]) {
      case "cd":
        const ln = input;
        currentPath = changeDir(ln[1]);
        break;
      case "os":
        console.log(os.type());
        break;
      case "echo":
        console.log(input[1]);
        break;
      case "cat":
        const read = fileReader(currentPath + "\\" + input[1]);
        console.log(read);
        break;
      case "ls":
        const list = fileList(currentPath);
        console.table(list);
        break;
      case "move":
        const moveStatus = fileMove(
          path.resolve(currentPath, input[1]),
          path.resolve(currentPath, input[2], input[1])
        );
        console.log(moveStatus);
        break;
      case "copy":
        const copyStatus = fileCopy(
          path.resolve(currentPath, input[1]),
          input[2],
          input[1]
        );
        console.log(copyStatus);
        break;
      case "exit":
        rl.close();
        process.exit(0);
      case "clear":
        console.log("terminal has cleaned");
        break;
      default:
        console.log("Invalid command");
    }
    if (answer !== "exit") terminal();
  });
};
terminal();
rl.on("close", () => {
  console.log("Terminal closed");
});