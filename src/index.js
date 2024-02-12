import Math from "./Math/index.js";
import UI from "./UI/index.js";
import Time from "./Time/index.js";
import Data from "./Data/index.js";
import Events from "./Reactivity/Events/index.js";
import Use from "./Reactivity/Use/index.js";
import Graphics from "./Graphics/index.js";
import {SPA} from "./App/Router/index.js";
import __UI__ from "./UI/all.js";
import ZikoUIElement from "./UI/ZikoUIElement.js";
import { App } from "./App/index.js";
const Ziko={
    App,
    Math,
    UI,
    Time,
    Graphics,
    Events,
    Use,
    Data,
    SPA,
    __UI__,
}
globalThis.__Ziko__=Ziko;
function ExtractAll(){
    UI.ExtractAll();
    Math.ExtractAll();
    Time.ExtractAll();
    Events.ExtractAll();
    Use.ExtractAll();
    Graphics.ExtractAll();
    Data.ExtractAll()
    return this;
}
function RemoveAll(){
    UI.RemoveAll();
    Math.RemoveAll();
    Time.RemoveAll();
    Events.RemoveAll();
    Use.RemoveAll();
    Graphics.RemoveAll();
    Data.RemoveAll()
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
    SPA,
    ExtractAll,
    RemoveAll
};
 export * from "./Math"
 export * from "./UI";
 export * from "./Graphics";
 export * from "./Time"
 export * from "./Data"
 export * from "./App"


