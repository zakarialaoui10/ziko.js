import PointerEvent from "./Global/Pointer.js";
import KeyEvent from "./Global/Key.js";
import {DragEvent,DropEvent} from "./Global/Drag.js"
import ClickEvent from "./Global/Click.js"
import ClipboardEvent from "./Global/Clipboard.js"
const Events={
    PointerEvent,
    KeyEvent,
    DragEvent,
    DropEvent,
    ClickEvent,
    ClipboardEvent,
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
    PointerEvent,
    KeyEvent,
    DragEvent,
    DropEvent,
    ClickEvent,
    ClipboardEvent
}
export default Events