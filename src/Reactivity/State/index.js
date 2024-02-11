import { useStyle } from "./useStyle";
import { useTheme } from "./useTheme";
import { useBattery } from "./useBattery";
const State={
    useStyle,
    useTheme,
    useBattery,
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
export default State;
export{
    useStyle,
    useTheme,
    useBattery
}
