import Pointer from "./Global/Pointer.js";
import Mouse from "./Global/Mouse.js";
import Key from "./Global/Key.js";
import {Drag,Drop} from "./Global/Drag.js";
import Click from "./Global/Click.js";
import Clipboard from "./Global/Clipboard.js";
import Focus from "./Global/Focus.js";
import Input from "./Partiel/Input.js";
import CustomEvent from "./Global/CustomEvent.js";
const Events={
    Pointer,
    Mouse,
    Key,
    Drag,
    Drop,
    Click,
    Clipboard,
    Focus,
    Input,
    CustomEvent,
    ExtractAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'ExtractAll' && key !== 'RemoveAll') {
                globalThis[key] = this[key];
            }
        }
        return this;
    },
    RemoveAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'RemoveAll') {
                delete globalThis[key];
            }
        }
        return this;
    }
}
export {
    Pointer,
    Mouse,
    Key,
    Drag,
    Drop,
    Click,
    Clipboard,
    Focus,
    Input,
    CustomEvent
}
export default Events