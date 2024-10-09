import { useClickEvent } from "./click.js";
import {usePointerEvent} from "./pointer.js";
import {useMouseEvent} from "./mouse.js";
import {useWheelEvent} from "./wheel.js";
import {useKeyEvent} from "./key.js";
import {useDragEvent,useDropEvent} from "./drag.js";
import {useClipboardEvent} from "./clipboard.js";
import {useFocusEvent} from "./focus.js";
import {useInputEvent} from "./Input.js";
import {useHashEvent} from "./hash.js";
import {useCustomEvent} from "./custom-event.js";
import {useSwipeEvent} from "./swipe.js"
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
    useSwipeEvent,
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
    useCustomEvent,
    useSwipeEvent
}
export default Events