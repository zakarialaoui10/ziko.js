const __init__=()=>document.documentElement.setAttribute("data-engine","zikojs");
if(globalThis?.document){
    document.addEventListener("DOMContentLoaded", __init__);
    document.removeEventListener("DOMContentLoaded", __init__);
}
export {
    __init__
}
export{
    App,
} from "./app.js"
export { 
    Themes,
    LightThemes,
    DarkThemes
 } from "./Themes";