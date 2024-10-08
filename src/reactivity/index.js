import Events from "./events";
import Observer from "./observer"
import Hooks from "./hooks"
const Reactivity={
    Events,
    Observer,
    Hooks,
    ExtractAll: function () {
        this.Events.ExtractAll();
        this.Observer.ExtractAll();
        this.Hooks.ExtractAll();
    },
    RemoveAll: function () {
        this.Events.RemoveAll();
        this.Observer.RemoveAll();
        this.Hooks.RemoveAll();
    }
}
export * from "./events";
export * from "./observer";
export * from "./hooks";
export default Reactivity;