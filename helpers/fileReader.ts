import fs from "fs";
export function fileReader(filePath: string) {
  try {
    return fs.readFileSync(filePath, {
      encoding: "utf-8",
    });
  } catch (ex: any) {
    return new Error(ex).message;
  }
}
export function fileList(path: string) {
  return fs.readdirSync(path, { encoding: "utf-8", withFileTypes: true });
}
export function fileMove(oldPath: string, newPath: string) {
  try {
    fs.renameSync(oldPath, newPath);
    return "File movied!";
  } catch (ex: any) {
    return new Error(ex).message;
  }
}
export function fileCopy(
  oldPath: string,

  newPath: string,
  filename: string
) {
  let status = "File copied!";
  try {
    process.chdir(newPath);
    fs.copyFileSync(oldPath, process.cwd() + "\\" + filename);
  } catch (ex: any) {
    status = new Error(ex).message;
  }
  return status;
}
