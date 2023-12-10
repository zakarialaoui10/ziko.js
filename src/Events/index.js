import Pointer from "./Global/Pointer.js";
import Key from "./Global/Key.js";
import {Drag,Drop} from "./Global/Drag.js";
import Click from "./Global/Click.js";
import Clipboard from "./Global/Clipboard.js";
import Focus from "./Global/Focus.js";
import Input from "./Partiel/Input.js";
import CustomEvent from "./Global/CustomEvent.js";
import { Channel } from "./Channel.js";
window.CE=CustomEvent
const Events={
    Pointer,
    Key,
    Drag,
    Drop,
    Click,
    Clipboard,
    Focus,
    Input,
    CustomEvent,
    Channel,
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
    Clipboard,
    Focus,
    Input
}
export default Events