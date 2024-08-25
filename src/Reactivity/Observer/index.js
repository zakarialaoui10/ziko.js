import { watchIntersection } from "./intersection.js";
import { 
    watch,
    // watchAttr,
    // watchChildren
 } from "./mutation.js";
import { watchSize } from "./resize.js";
import { watchScreen } from "./screen.js";
import { watchAttr } from "./attributes.js";
import { watchChildren } from "./children.js";
const Observer={
    watch,
    watchAttr,
    watchChildren,
    watchIntersection,
    watchSize,
    watchScreen,
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
export * from "./intersection";
export * from "./attributes.js";
export * from "./children.js";
export * from "./resize";
export * from "./screen";
export default Observer;