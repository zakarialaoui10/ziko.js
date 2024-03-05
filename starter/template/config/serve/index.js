import express from "express";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import open from 'open';
import dotenv from "dotenv";
dotenv.config();

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT;
const PUBLIC_DIR = path.join(__dirname, "../../public/");
app.use(express.static(PUBLIC_DIR));


app.get("*",(req,res)=>{
    res.sendFile(`${PUBLIC_DIR}/index.html`)
})
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    if(process.env.OPEN_BROWSER)open(`http://localhost:${PORT}`);
});

