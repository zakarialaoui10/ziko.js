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
Ziko.Math.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Math).length; i++) delete globalThis[Object.keys(Ziko.Math)[i]];   
    return this;
}
Ziko.UI.ExtractAll=function(){
    for (let i = 0; i < Object.keys(Ziko.UI).length; i++) {
        globalThis[Object.keys(Ziko.UI)[i]] = Object.values(Ziko.UI)[i];
    }
    return this;
}
Ziko.UI.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.UI).length; i++) delete globalThis[Object.keys(Ziko.UI)[i]];   
    return this;
}
Ziko.ExtractAll=function(){
    Ziko.UI.ExtractAll();
    Ziko.Math.ExtractAll();
    return this;
}
Ziko.RemoveAll=function(){
    Ziko.UI.RemoveAll();
    Ziko.Math.RemoveAll();
}
export default Ziko
