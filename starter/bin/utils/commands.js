import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
const Execute_Commande=commande=>exec(commande, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

const createFolder=(FolderName="")=>{
  if (fs.existsSync(FolderName))fs.rmSync(FolderName, { recursive: true });
  fs.mkdirSync(FolderName);
}

const copyFolder=(source, target)=>{
  (!fs.existsSync(target)) && fs.mkdirSync(target);
  const files = fs.readdirSync(source);
  files.forEach((file) => {
      const currentPath = path.join(source, file);
      const targetPath = path.join(target, file);
      (fs.lstatSync(currentPath).isDirectory())?copyFolder(currentPath, targetPath):fs.copyFileSync(currentPath, targetPath);
  });
}
export {
  createFolder,
  copyFolder
}