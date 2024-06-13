import usePointerEvt from "./Global/Pointer.js";
import useMouseEvt from "./Global/Mouse.js";
import useWheelEvt from "./Global/Wheel.js";
import useKeyEvt from "./Global/Key.js";
import {useDragEvt,useDropEvt} from "./Global/Drag.js";
import useClickEvt from "./Global/Click.js";
import useClipboardEvt from "./Global/Clipboard.js";
import useFocusEvt from "./Global/Focus.js";
import Input from "./Partiel/Input.js";
import HashEvent from "./Partiel/Hash.js";
import useCustomEvt from "./Global/CustomEvent.js";
const Events={
    usePointerEvt,
    useMouseEvt,
    useWheelEvt,
    useKeyEvt,
    useDragEvt,
    useDropEvt,
    useClickEvt,
    useClipboardEvt,
    useFocusEvt,
    Input,
    HashEvent,
    useCustomEvt,
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
    usePointerEvt,
    useMouseEvt,
    useWheelEvt,
    useKeyEvt,
    useDragEvt,
    useDropEvt,
    useClickEvt,
    useClipboardEvt,
    useFocusEvt,
    Input,
    HashEvent,
    useCustomEvt
}
export default Events