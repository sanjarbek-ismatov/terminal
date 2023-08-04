import readline from "readline";
import { execSync } from "child_process";
import path from "path";
import os from "os";
import "colors";
import {
  createFolder,
  fileCopy,
  fileCreate,
  fileList,
  fileMove,
  fileReader,
  fileRemove,
  folderRemove,
} from "./helpers/fileReader";
import PathManager from "./helpers/pathManager";
const rl = readline.createInterface(process.stdin, process.stdout);

const defaultTerminal = process.argv[2];
const pathManager = new PathManager();
const getStartSymbol = () => {
  const currentPath = pathManager.currentPath;
  return defaultTerminal === "--linux" || os.type() === "Linux"
    ? (os.userInfo({ encoding: "utf-8" }).username + "@" + os.hostname())
        .green +
        ":".white +
        `${" ~" + pathManager.pathToLinux(currentPath)} $ `.blue
    : currentPath + "> ";
};
const terminal = () => {
  const startSymbol = getStartSymbol();
  rl.question(startSymbol, (answer) => {
    const input = answer.split(" ");
    switch (input[0]) {
      case "cd":
        const ln = input;
        pathManager.changeDir(ln[1]);
        break;
      case "os":
        console.log(os.type());
        break;
      case "echo":
        console.log(input[1]);
        break;
      case "cat":
        const read = fileReader(pathManager.currentPath + "\\" + input[1]);
        console.log(read);
        break;
      case "touch":
        console.log(fileCreate(pathManager.currentPath, input[1]));
        break;
      case "ls":
        const list = fileList(pathManager.currentPath);
        console.table(list);
        break;
      case "mv":
        const moveStatus = fileMove(
          path.resolve(pathManager.currentPath, input[1]),
          path.resolve(pathManager.currentPath, input[2], input[1])
        );
        console.log(moveStatus);
        break;
      case "cp":
        const copyStatus = fileCopy(
          path.resolve(pathManager.currentPath, input[1]),
          input[2],
          input[1]
        );
        console.log(copyStatus);
        break;
      case "mkdir":
        console.log(createFolder(pathManager.currentPath, input[1]));
        break;
      case "rm":
        console.log(fileRemove(pathManager.currentPath, input[1]));
        break;
      case "rmdir":
        console.log(folderRemove(pathManager.currentPath, input[1]));
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
