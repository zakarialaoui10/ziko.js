export * from "./hsplitter"
export * from "./vsplitter"
import { hSplitter } from "./hsplitter.js"
import { vSplitter } from "./vsplitter.js"
const Splitter = ({orintation = "horizontal",slides = []}) =>{
    if(["v","vertical"].includes(orintation.toLowerCase())) return vSplitter(...slides);
    else if(["h","horizontal"].includes(orintation.toLowerCase())) return hSplitter(...slides);
    else Error(`{ orientation : ${orintation}} Not supported`)
}
export{
    Splitter
}