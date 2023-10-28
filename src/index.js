import {Math} from "./Math/index.js";
import UI from "./UI/index.js"
const Ziko={
    Math,
    UI
}
Ziko.Math.ExtractAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Math).length; i++) {
        globalThis[Object.keys(Ziko.Math)[i]] = Object.values(Ziko.Math)[i];
    }
    return this;
}
Ziko.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Math).length; i++) delete globalThis[Object.keys(Ziko.Math)[i]];   
    return this;
}
export default Ziko
