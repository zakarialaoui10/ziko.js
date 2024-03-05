import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import open from 'open';
import dotenv from "dotenv"
dotenv.config();
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT;
console.log(PORT)
const PUBLIC_DIR = path.join(__dirname, "../../public/");

const server = http.createServer((req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    let contentType = 'text/html';

    // Check if the requested file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        // Read the file and send its content as response
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    if(process.env.OPEN_BROWSER)open(`http://localhost:${PORT}`);
});
