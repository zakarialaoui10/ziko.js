import usePointerEvent from "./Global/Pointer.js";
import useMouseEvent from "./Global/Mouse.js";
import useWheelEvent from "./Global/Wheel.js";
import useKeyEvent from "./Global/Key.js";
import {useDragEvent,useDropEvent} from "./Global/Drag.js";
import useClickEvent from "./Global/Click.js";
import useClipboardEvent from "./Global/Clipboard.js";
import useFocusEvent from "./Global/Focus.js";
import useInputEvent from "./Partiel/Input.js";
import useHashEvent from "./Partiel/Hash.js";
import useCustomEvent from "./Global/CustomEvent.js";
const Events={
    usePointerEvent,
    useMouseEvent,
    useWheelEvent,
    useKeyEvent,
    useDragEvent,
    useDropEvent,
    useClickEvent,
    useClipboardEvent,
    useFocusEvent,
    useInputEvent,
    useHashEvent,
    useCustomEvent,
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
    usePointerEvent,
    useMouseEvent,
    useWheelEvent,
    useKeyEvent,
    useDragEvent,
    useDropEvent,
    useClickEvent,
    useClipboardEvent,
    useFocusEvent,
    useInputEvent,
    useHashEvent,
    useCustomEvent
}
export default Events