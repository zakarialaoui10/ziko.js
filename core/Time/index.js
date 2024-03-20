import{
    loop
} from "./loop.js"
import{
    animation
} from "./animation.js"
import {
    wait,
    timeTaken,
    useThrottle,
    useDebounce,
    Ease,
    time_memory_Taken,
    waitForUIElm,
    waitForUIElmSync
} from "./utils/index.js";
const Time={
    wait,
    timeTaken,
    useThrottle,
    useDebounce,
    Ease,
    time_memory_Taken,
    loop,
    animation,
    waitForUIElm,
    waitForUIElmSync,
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
export * from "./utils/index.js"
export {
    loop,
    animation
}
export default Time;