import Math from "./Math/index.js";
import UI from "./UI/index.js";
import Time from "./Time/index.js";
import Data from "./Data/index.js";
import Reactivity from "./Reactivity/index.js";
import Graphics from "./Graphics/index.js";
import {SPA} from "./app/router/index.js";
import { 
    __UI__,
    __Config__
 } from "./app/globals/index.js";
import ZikoUIElement from "./UI/elements/primitives/ZikoUIElement.js";
import { 
    App,
 } from "./app";
const Ziko={
    App,
    Math,
    UI,
    Time,
    Graphics,
    Reactivity,
    Data,
    SPA,
}

// if ( globalThis.__Ziko__ ) {
//     console.warn( 'WARNING: Multiple instances of Ziko.js being imported.' );
// 	} else {
// 		globalThis.__Ziko__={
//             ...Ziko,
//             __UI__,
//             __Config__,
//             ExtractAll,
//             RemoveAll
//         };
// 	}
globalThis.__Ziko__={
    ...Ziko,
    __UI__,
    __Config__,
    ExtractAll,
    RemoveAll
};
if(globalThis?.document){
    document?.addEventListener("DOMContentLoaded", __Ziko__.__Config__.init());
}
function ExtractAll(){
    UI.ExtractAll();
    Math.ExtractAll();
    Time.ExtractAll();
    Reactivity.ExtractAll();
    Graphics.ExtractAll();
    Data.ExtractAll()
    return this;
}
function RemoveAll(){
    UI.RemoveAll();
    Math.RemoveAll();
    Time.RemoveAll();
    Reactivity.RemoveAll();
    Graphics.RemoveAll();
    Data.RemoveAll()
}
export * from "./Math/index.js";
export * from "./UI/index.js";
export * from "./Graphics/index.js";
export * from "./Time/index.js";
export * from "./Data/index.js";
export * from "./App";
export * from "./Reactivity/index.js"
export {
    App,
    Math,
    UI,
    Time,
    Graphics,
    Reactivity,
    Data,
    ZikoUIElement,
    SPA,
    ExtractAll,
    RemoveAll
};
export default Ziko;



