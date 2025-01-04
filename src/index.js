import { __ExtractAll__,__RemoveAll__ } from "./__helpers__";
import Math from "./math";
import UI from "./ui";
import Time from "./time";
import Data from "./data";
import Reactivity from "./reactivity";
import Graphics from "./graphics";
import App,{__UI__,__HYDRATION_MAP__, __Config__, defineParamsGetter} from "./app";

export * from "./math";
export * from "./ui";
export * from "./time";
export * from "./data";
export * from "./reactivity"
export * from "./graphics";
export * from "./app";

[
    App,
    Math,
    UI,
    Time,
    Data,
    Reactivity,
    Graphics
].forEach(n=>Object.assign(n,{
    ExtractAll:()=>__ExtractAll__(n),
    RemoveAll:()=>__RemoveAll__(n)
}))

const Ziko={
    App,
    Math,
    UI,
    Time,
    Data,
    Reactivity,
    Graphics,

}

if ( globalThis.__Ziko__ ) {
    console.warn( 'WARNING: Multiple instances of Ziko.js being imported.' );
	} else {
		globalThis.__Ziko__={
            ...Ziko,
            __UI__,
            __HYDRATION_MAP__,
            __Config__,
            ExtractAll,
            RemoveAll
        };
        defineParamsGetter(__Ziko__)
	}
// globalThis.__Ziko__={
//     ...Ziko,
//     __UI__,
//     __Config__,
//     ExtractAll,
//     RemoveAll
// };
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

export default Ziko;



