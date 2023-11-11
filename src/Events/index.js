import Pointer from "./Pointer.js";
import Key from "./Key.js";
import {Drag} from "./Drag.js"
const Events={
    Pointer,
    Key,
    Drag,
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
    Key
}
export default Events