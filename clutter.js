import fs from "fs";
import fsp from "fs/promises";
import ps from "prompt-sync";
import path from "path";

// retreiving logs
let logs = JSON.parse(fs.readFileSync("logs.json"));

// creating a prompt object to get input
const prompt = ps();
console.log();
let directory_path = prompt("Enter the path for the directory to be scanned: ");

// vailidating inpput path and ask for re-input
while (!fs.existsSync(directory_path)) {
      if (directory_path == null) {
            process.exit();
      }
      directory_path = prompt("Enter a vaild path: ");
}
// replacing path with exact path
directory_path = path.resolve(directory_path);

// adding entered path in thr logs
logs[directory_path] = [];

// getting files and folders present in the directory
const files = await fsp.readdir(directory_path);

// checking for empty directory 
if (files.length != 0) {
      console.log(`\n${files.length} Files/Folders Detected:`)

      // showing files and folders to user and performing actions
      for (const fileName of files) {
            // finding the name and extension seperator
            const breaking_point = fileName.lastIndexOf(".");

            // checking for folder and skipping if true
            if (breaking_point == -1) {
                  console.log(`folder -> ${fileName} <=> [skipped]`)
            } else {
                  //geting name and extension
                  const name = fileName.slice(0, breaking_point);
                  const extension = fileName.slice(breaking_point + 1);

                  // validating files and skipping for a specific file
                  if (fileName === "package.json" || fileName === "package-lock.json" || fileName == "logs.json" || fileName === "undo.js" || fileName === "clutter.js" || name === "index" || name === "" || name === "README") {
                        console.log(`file -> ${name} [.${extension}] <=> [skipped]`);
                        continue;
                  }

                  // showing file to user
                  console.log(`file -> ${name} [.${extension}]`);

                  // finding folder with extension name and replace file if true 
                  // else create first and then replace
                  if (fs.existsSync(path.resolve(directory_path, extension))) {
                        // getting source and destination
                        const source = path.join(directory_path, fileName);
                        const destination = path.join(directory_path, `/${extension}/${fileName}`);

                        // replacing file to the extension folder
                        try { fs.renameSync(source, destination) }
                        catch (e) {
                              console.log(e.message);
                        }

                        // adding operations to dir array
                        logs[`${path.resolve(directory_path)}`].push(`file <#> ${source} <#> ${destination}`);
                  } else {
                        // getting new folder path
                        const newDir = path.resolve(directory_path, extension);

                        // creating new folder
                        try { fs.mkdirSync(newDir) }
                        catch (e) {
                              console.log(e.message);
                        }

                        // adding opperations to dir array
                        logs[`${path.resolve(directory_path)}`].unshift(`folder <#> ${newDir}`);

                        // getting source and destination
                        const source = path.join(directory_path, fileName);
                        const destination = path.join(directory_path, `/${extension}/${fileName}`);

                        // replacing file to the extension folder
                        try { fs.renameSync(source, destination) }
                        catch (e) {
                              console.log(e.message);
                        }

                        // adding operations to dir array
                        logs[`${path.resolve(directory_path)}`].unshift(`file <#> ${source} <#> ${destination}`);

                  }
            }
      };

      // saving logs details to log.json
      fs.writeFileSync("logs.json", JSON.stringify(logs));

      // showing status to user
      console.log("\n100% <=> Clutter Removed Success!!")
      console.log("Your files hase been organized.\n")
} else {
      // showing status to user
      console.log("\nNo files detcted to organize");
}
