import fs from 'fs';
import path from 'path';

const copyFolder=(source, target)=>{
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    const files = fs.readdirSync(source);
    files.forEach((file) => {
        const currentPath = path.join(source, file);
        const targetPath = path.join(target, file);

        if (fs.lstatSync(currentPath).isDirectory()) {
            copyFolder(currentPath, targetPath);
        } else {
            fs.copyFileSync(currentPath, targetPath);
        }
    });
}

// Example usage:
// copyFolder('sourceFolder', 'destinationFolder');
export{
    copyFolder
}