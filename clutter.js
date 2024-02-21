import fs from "fs";
import fsp from "fs/promises";
import ps from "prompt-sync";
import path from "path";
import { error } from "console";

const prompt = ps();

// const directory_path = "C:\\Users\\himan\\WebProjects\\NodeProjects\\ClearClutterTool";
console.log();
let directory_path = prompt("Enter the path for the directory to be scanned: ");

while (!fs.existsSync(directory_path)) {
      if(directory_path==null){
            process.exit();
      }
      directory_path = prompt("Enter a vaild path: ");
}

const files = await fsp.readdir(directory_path);

if (files.length != 0) {
      console.log(`\n${files.length} Files/Folders Detected:`)
      for (const fileName of files) {
            const breaking_point = fileName.lastIndexOf(".");
            if (breaking_point == -1) {
                  console.log(`folder -> ${fileName} <=> [skipped]`)
            } else {
                  const name = fileName.slice(0, breaking_point);
                  const extension = fileName.slice(breaking_point + 1);
                  if (fileName === "package.json" || fileName === "package-lock.json" || name === "index" || name === "" || name === "README") {
                        console.log(`file -> ${name} [.${extension}] <=> [skipped]`);
                        continue;
                  }
                  console.log(`file -> ${name} [.${extension}]`);
                  if (fs.existsSync(path.join(directory_path, extension))) {
                        // console.log("renaming",fileName,"to",`/${extension}/${fileName}`)
                        const source = path.join(directory_path, fileName);
                        const destination = path.join(directory_path, `/${extension}/${fileName}`);
                        fs.rename(source, destination, error => {
                        })
                  } else {
                        const newDir = path.join(directory_path, extension);
                        try {
                              fs.mkdir(newDir, error => {
                              });
                              const source = path.join(directory_path, fileName);
                              const destination = path.join(directory_path, `/${extension}/${fileName}`);
                              fs.rename(source, destination, error => {
                              })
                        }
                        catch (e) {
                              console.log(e.message)
                        }
                  }
            }
      };
      console.log("\n100% <=> Clutter Removed Success!!")
      console.log("Your files hase been organized.\n")
} else {
      console.log("\mNo files detcted to organize");
}