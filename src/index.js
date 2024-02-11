import Math from "./Math";
import UI from "./UI";
import Time from "./Time";
import Data from "./Data";
import Events from "./Reactivity/Events";
import State from "./Reactivity/State";
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
    State,
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
    State.ExtractAll();
    Graphics.ExtractAll();
    Data.ExtractAll()
    return this;
}
function RemoveAll(){
    UI.RemoveAll();
    Math.RemoveAll();
    Time.RemoveAll();
    Events.RemoveAll();
    State.RemoveAll();
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
    Multi,
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


