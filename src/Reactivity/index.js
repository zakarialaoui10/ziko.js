import Events from "./Events";
import Observer from "./Observer"
import Hooks from "./Hooks"
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
export * from "./Events";
export * from "./Observer";
export * from "./Hooks";
export default Reactivity;