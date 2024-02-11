import EventEmitter from "../../Events/EventEmitter";
class ZikoUseEventEmitter {
    constructor(){
        this.__Emitter__=new EventEmitter();
    }
    on(event, listener){
        this.__Emitter__.on(event,listener);
        return this;
    }
    once(event,listener){
        this.__Emitter__.once(event,listener);
        return this;
    }
    off(event,listener){
        this.__Emitter__.off(event,listener);
        return this;
    }
    emit(event,data){
        this.__Emitter__.emit(event,data);
        return this;
    }
}
const useEventEmitter=()=>new ZikoUseEventEmitter()
export{useEventEmitter}