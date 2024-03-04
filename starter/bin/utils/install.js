import { exec } from 'child_process';

// Execute npm install command
const install=(...packages)=>exec(`npm install ${packages.join(" ")}`, (error, stdout, stderr) => {
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

export {
  install
}