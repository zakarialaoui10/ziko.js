import Math from "./Math/index.js";
import UI from "./UI/index.js";
import Time from "./Time/index.js";
import Data from "./Data/index.js";
import Events from "./Events/index.js";
import Graphics from "./Graphics/index.js";
import Multi from "./Worker/index.js";
import {Watch} from "./Reactivity/index.js"
import {SPA} from "./Router/index.js";
import ALL_UI_ELEMENTS from "./UI/all.js";
import ZikoUIElement from "./UI/ZikoUIElement.js";
const Ziko={
    Math,
    UI,
    Time,
    Graphics,
    Events,
    Data,
    Multi,
    SPA,
    Watch,
    ALL_UI_ELEMENTS,
}
function ExtractAll(){
    UI.ExtractAll();
    Math.ExtractAll();
    Time.ExtractAll();
    Events.ExtractAll();
    Graphics.ExtractAll();
    return this;
}
function RemoveAll(){
    UI.RemoveAll();
    Math.RemoveAll();
    Time.ExtractAll();
    Events.RemoveAll();
    Graphics.RemoveAll();
}
export {
    Ziko,
    ZikoUIElement,
    Math,
    UI,
    Time,
    Graphics,
    Events,
    Data,
    Multi,
    SPA,
    Watch,
    ExtractAll,
    RemoveAll
};

