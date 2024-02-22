# Clear Clutter Tool:
This is a command line application that can clear clutters present in a directory. It is like a Directory Management Tool that simply takes the directory path and arranges the files present in that directory based on their extension in a separate directory.

# Pre-requirements:
Node should be installed on your system to use this tool. [Install Node](https://nodejs.org/en/download)

# Tools and Technologies Used:
- Node
- Visual Studio Code
- Node Package Manager (NPM)
- Prompt-Sync (Node Package)

# How to use this tool?

## Clone/Install this tool
open the terminal go to the directory where you want to install it and run the following command
``````
git clone https://github.com/himanshu2312/clear-clutter-tool.git
``````
alternatively, you can download the zip folder of this application and extract the tool where you want to install it

## Install the Dependencies
open the application directory in your terminal and run
``````
npm i
``````
or you may do the same using the VsCode terminal

## Run the tool
Now run 
```````
node clutter
```````
or
```````
node clutter.js
```````
Now a Prompt will appear asking for the directory path. Provide the path to the directory for the clutter cleaning and directory management and the tool will dynamically detect the files and arrange them for you.

# Warning & Suggestions 
Be careful if you are using version 1.0.0. Please don't try this with your User or System directories. As this Tool alters the file locations and this version does not support any functionality to reverse or undo the operation, you won't be able to get files back to the previous location. you can use version 2.0.0 because that supports an undo functionality.
For the best experience try this tool on your device's download directory or the directory with lots of files with different extensions.

###### Made by [@Himanshu](https://www.linkedin.com/in/himanshu2312/)
