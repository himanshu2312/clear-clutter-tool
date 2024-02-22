import { error } from "console";
import fs, { rm } from "fs";
import path from "path";
import ps from "prompt-sync"

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

// checking for cluttering undo if true
// else promt a message to user to clutter first
if (logs[directory_path]) {
      if (logs[directory_path].length !== 0) {
            //accessing and performing actions on dir array
            const operationArray = logs[directory_path];
            operationArray.forEach(operation => {
                  // removing seperator from buffer
                  const F_S_D = operation.split(" <#> ");
                  const type = F_S_D[0];

                  // checking the type of entey in logs
                  // removing folder in type == folder
                  // else moving files
                  if (type === "folder") {
                        // getting folder path
                        const dir = F_S_D[1];

                        // removing folder
                        try {
                              fs.rm(dir, { recursive: true }, error => {
                                    if (error) { console.log(error) }
                              })
                        }
                        catch (e) {
                              console.log(e.message);
                        }
                  } else {
                        // getting source and dstination
                        const destination = F_S_D[1]
                        const source = F_S_D[2];

                        // moving file
                        try { fs.renameSync(source, destination) }
                        catch (e) {
                              console.log(e.message)
                        }
                  }
            });

            // removing directory log from logs.json
            delete logs[directory_path]
      } else {
            delete logs[directory_path]

            // showing status to user
            console.log("\nNotthing is altered by 'Clear_Clutter_tool'.");
      }

      // saving logs details to log.json
      fs.writeFileSync("logs.json", JSON.stringify(logs));

      // showing status to user
      console.log("\n100% <=> Undo Success!!")
      console.log("Your files hase been retreived.\n")
} else {
      // showing status to user
      console.log("\nThis directory is not organized by 'Clear_Clutter_tool'.");
      console.log("First, run 'node clutter' / 'node clutter.js' to organise this directory.\n")
}