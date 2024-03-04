import fs from 'fs';
import path from 'path';

function copyFileSync(source, target) {
    let targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    const files = fs.readdirSync(source);
    files.forEach((file) => {
        const currentPath = path.join(source, file);
        const targetPath = path.join(target, file);

        if (fs.lstatSync(currentPath).isDirectory()) {
            copyFolderSync(currentPath, targetPath);
        } else {
            copyFileSync(currentPath, targetPath);
        }
    });
}

export { copyFolderSync };
