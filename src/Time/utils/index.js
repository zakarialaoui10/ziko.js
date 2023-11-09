import Ease from "./ease.js";
const wait=(delayInMS)=>{
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
}
const timeTaken = callback => {
    console.time('timeTaken');
    const r = callback();
    console.timeEnd('timeTaken');
    return r;
}
export{
    wait,
    timeTaken,
    Ease
}
export{
    throttle,
    debounce
} from "./decorators.js";
export {
    time_memory_Taken
} from "./performance.js"