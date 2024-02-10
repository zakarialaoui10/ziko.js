import Math from "./Math";
import UI from "./UI";
import Time from "./Time";
import Data from "./Data";
import Events from "./Reactivity/Events";
import Graphics from "./Graphics";
import Multi from "./Worker";
import {SPA} from "./App/Router";
import ALL_UI_ELEMENTS from "./UI/all.js";
import ZikoUIElement from "./UI/ZikoUIElement.js";
import { App } from "./App";
const Ziko={
    App,
    Math,
    UI,
    Time,
    Graphics,
    Events,
    Data,
    Multi,
    SPA,
    ALL_UI_ELEMENTS,
}
globalThis.__Ziko__=Ziko;
function ExtractAll(){
    UI.ExtractAll();
    Math.ExtractAll();
    Time.ExtractAll();
    Events.ExtractAll();
    Graphics.ExtractAll();
    Data.ExtractAll()
    return this;
}
function RemoveAll(){
    UI.RemoveAll();
    Math.RemoveAll();
    Time.ExtractAll();
    Events.RemoveAll();
    Graphics.RemoveAll();
    Data.ExtractAll()
}
export {
    Ziko,
    App,
    Math,
    UI,
    Time,
    Graphics,
    Events,
    Data,
    ZikoUIElement,
    Multi,
    SPA,
    ExtractAll,
    RemoveAll
};
 export * from "./Math/index.js"
 export * from "./UI/index.js";
 export * from "./Graphics/index.js";
 export * from "./Time"
 export * from "./Data"
 export * from "./App"


