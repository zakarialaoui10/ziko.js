import {ZikoUIElement,p,text} from "../dist/ziko.mjs";
// console.log(clamp(0,1,2))
// console.log(globalThis)
// console.log(__Ziko__)
import { JSDOM } from 'jsdom';
const dom = new JSDOM(`
   <!doctype html>
   <html>
   <body>
   <script>
    console.log(1)
   </script>
   </body>
   </html>
`);

globalThis.document = dom.window.document;
const ui=p(text(12));

console.log(ui.VisibleArea)
