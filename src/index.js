import Math from "./Math/index.js";
import UI from "./ui/index.js";
import Time from "./time/index.js";
import Data from "./data/index.js";
import Reactivity from "./reactivity/index.js";
import Graphics from "./graphics/index.js";
import {SPA} from "./global/router/index.js";
import { 
    __UI__,
    __Config__
 } from "./global/globals/index.js";
import ZikoUIElement from "./ui/elements/primitives/ZikoUIElement.js";
// import { 
//     App,
//  } from "./Global";
const Ziko={
    // App,
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
export * from "./ui/index.js";
export * from "./graphics/index.js";
export * from "./time/index.js";
export * from "./data/index.js";
export * from "./global/index.js";
export * from "./reactivity/index.js"
export {
    // App,
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



