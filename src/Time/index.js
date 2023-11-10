import{
    loop
} from "./loop.js"
import {
    wait,
    timeTaken,
    throttle,
    debounce,
    Ease,
    time_memory_Taken,
    waitForUIElm,
    waitForUIElmSync
} from "./utils/index.js"
const Time={
    wait,
    timeTaken,
    throttle,
    debounce,
    Ease,
    time_memory_Taken,
    loop,
    waitForUIElm,
    waitForUIElmSync,
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
export default Time;
