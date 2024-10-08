import{
    useTimeLoop
} from "./loop.js"
import{
    useAnimation
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
    useTimeLoop,
    useAnimation,
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
    useTimeLoop,
    useAnimation
}
export default Time;