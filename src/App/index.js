const __init__=()=>document.documentElement.setAttribute("data-engine","zikojs");
if(globalThis?.document){
    document.addEventListener("DOMContentLoaded", __init__);
    document.removeEventListener("DOMContentLoaded", __init__);
}
export{
    App,
    __init__
} from "./app.js"