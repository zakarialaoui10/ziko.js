import Events from "./Events";
import Observer from "./Observer"
import Use from "./Use"
const Reactivity={
    Events,
    Observer,
    Use,
    ExtractAll: function () {
        this.Events.ExtractAll();
        this.Observer.ExtractAll();
        this.Use.ExtractAll();
    },
    RemoveAll: function () {
        this.Events.RemoveAll();
        this.Observer.RemoveAll();
        this.Use.RemoveAll();
    }
}
export * from "./Events";
export * from "./Observer";
export * from "./Use";
export default Reactivity;