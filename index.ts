import readline from "readline";
import { execSync } from "child_process";
import path from "path";
import os from "os";
import "colors";
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
const defaultTerminal = process.argv[2];
const getStartSymbol = () => {
  const path = currentPath === __dirname;
  return defaultTerminal === "--linux" || os.type() === "Linux"
    ? (os.userInfo({ encoding: "utf-8" }).username + "@" + os.hostname())
        .green +
        ":".white +
        `${path ? "~" : currentPath}$ `.blue
    : currentPath + "> ";
};
const terminal = () => {
  const startSymbol = getStartSymbol();

  rl.question(startSymbol, (answer) => {
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
        try {
          const commStatus = execSync(input[0]);
          console.log(commStatus.toString("utf-8"));
        } catch (ex: any) {
          // console.log(new Error(ex).message);
        }
    }
    if (answer !== "exit") terminal();
  });
};
terminal();
rl.on("close", () => {
  console.log("Terminal closed");
});
