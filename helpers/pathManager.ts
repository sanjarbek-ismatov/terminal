import path from "path";
class PathManager {
  public currentPath: string;
  constructor() {
    this.currentPath = __dirname;
  }
  /**
   * Converts a Windows path to a Linux path.
   *
   * @param {string} path - The Windows path to be converted.
   * @returns {string} The converted Linux path.
   */
  pathToLinux(path: string): string {
    // Split the path using the backslash as the delimiter
    const parts = path.split("\\");

    // Remove the first part (drive letter) and join the remaining parts using the forward slash as the delimiter
    const linuxPath = "/" + parts.slice(1).join("/");

    // Return the converted Linux path
    return linuxPath;
  }
  changeDir(givenPath: string) {
    this.currentPath = path.resolve(this.currentPath, givenPath);
  }
  changeTempDir(tmpPath: string) {
    return path.resolve(this.currentPath, tmpPath);
  }
}
export default PathManager;
