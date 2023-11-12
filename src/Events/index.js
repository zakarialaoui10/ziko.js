import Pointer from "./Pointer.js";
import Key from "./Key.js";
import {Drag,Drop} from "./Drag.js"
import {Click} from "./Click.js"
const Events={
    Pointer,
    Key,
    Drag,
    Drop,
    Click,
    ExtractAll:function(){
            for (let i = 0; i < Object.keys(this).length; i++) {
                globalThis[Object.keys(this)[i]] = Object.values(this)[i];
        }
        return this;
    },
    RemoveAll:function(){
            for (let i = 0; i < Object.keys(this).length; i++) delete globalThis[Object.keys(this)[i]];   
        return this;
    }
}
export {
    Pointer,
    Key,
    Drag,
    Drop,
    Click,
}
export default Events