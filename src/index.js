import Math from "./Math/index.js";
import UI from "./UI/index.js";
import Time from "./Time/index.js";
import Events from "./Events/index.js";
import Graphics from "./Graphics/index.js";
import Multi from "./Worker/index.js";
import {Watch} from "./Reactivity/index.js"
import {SPA} from "./Router/index.js";
const Ziko={
    Math,
    UI,
    Time,
    Graphics,
    Events,
    Multi,
    SPA,
    Watch
}
Ziko.ExtractAll=function(){
    Ziko.UI.ExtractAll();
    Ziko.Math.ExtractAll();
    Ziko.Time.ExtractAll();
    Ziko.Events.ExtractAll();
    Ziko.Graphics.ExtractAll();
    return this;
}
Ziko.RemoveAll=function(){
    Ziko.UI.RemoveAll();
    Ziko.Math.RemoveAll();
    Ziko.Time.ExtractAll();
    Ziko.Events.RemoveAll();
    Ziko.Graphics.RemoveAll();
}
export default Ziko
