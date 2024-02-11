import { useStyle } from "./useStyle";
import { useTheme } from "./useTheme";
import { useBattery } from "./useBattery";
import { useEventEmitter } from "./useEventEmmiter";
import { useTitle } from "./useTitle";
import { useFavIcon } from "./useFavIcon";
const State={
    useStyle,
    useTheme,
    useBattery,
    useEventEmitter,
    useTitle,
    useFavIcon,
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
    useBattery,
    useEventEmitter,
    useTitle,
    useFavIcon
}
