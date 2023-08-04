import fs from "fs";
import PathManager from "./pathManager";
const pathManager = new PathManager();
/**
 * Read the contents of a file.
 * @param filePath - The path to the file.
 * @returns The contents of the file, or an error message if the file cannot be read.
 */
export function fileReader(filePath: string): string {
  try {
    // Read the file synchronously and return its contents
    return fs.readFileSync(filePath, {
      encoding: "utf-8",
    });
  } catch (ex: any) {
    // If an error occurs, return the error message
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
/**
 * Copy a file from an old path to a new path.
 *
 * @param oldPath - The path of the file to be copied.
 * @param newPath - The path where the file should be copied to.
 * @param filename - The name of the file.
 * @returns A string indicating the status of the file copy operation.
 */
export function fileCopy(oldPath: string, newPath: string, filename: string) {
  let status = "File copied!";
  try {
    fs.copyFileSync(
      oldPath,
      pathManager.changeTempDir(newPath) + "\\" + filename
    ); // Copy the file to the new path
  } catch (ex: any) {
    status = new Error(ex).message; // If an error occurs, set the status to the error message
  }
  return status;
}

/**
 * Create a new file at the specified path with the given filename.
 * @param {string} currentPath - The current path where the file will be created.
 * @param {string} filename - The name of the file to be created.
 * @returns {string} - A message indicating whether the file was successfully created or an error message if it failed.
 */
export function fileCreate(currentPath: string, filename: string): string {
  try {
    fs.writeFileSync(`${currentPath}/${filename}`, "", { encoding: "utf-8" });
    return "File created";
  } catch (ex: any) {
    return new Error(ex).message.red;
  }
}

/**
 * Remove a file from the specified path.
 * @param currentPath - The current path where the file is located.
 * @param filename - The name of the file to be removed.
 * @returns A string indicating whether the file was successfully removed or an error message.
 */
export function fileRemove(currentPath: string, filename: string) {
  try {
    // Remove the file from the specified path
    fs.unlinkSync(currentPath + "\\" + filename);
    return "File removed";
  } catch (ex: any) {
    // Return the error message if an error occurs during the file removal
    return new Error(ex).message.red;
  }
}
export function folderRemove(currentPath: string, folderName: string) {
  try {
    // Remove the folder from the specified path
    fs.rmSync(currentPath + "\\" + folderName, {
      recursive: true,
    });
    return "Folder removed";
  } catch (ex: any) {
    // Return the error message if an error occurs during the folder removal
    return new Error(ex).message.red;
  }
}
export function createFolder(currentPath: string, folderName: string) {
  try {
    fs.mkdirSync(currentPath + "\\" + folderName);
    return "Folder created";
  } catch (ex: any) {
    return new Error(ex).message.red;
  }
}
