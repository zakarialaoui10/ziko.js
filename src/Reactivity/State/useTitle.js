import { useEventEmitter } from "./useEventEmmiter";
class ZikoUseTitle{
    constructor(useEventEmitter=false){
        this.cache={
            Emitter:null
        }
        if(useEventEmitter)this.useEventEmitter();
    }
    useEventEmitter(){
        this.cache.Emitter=useEventEmitter();
        return this;
    }
    set(title){
        if(title!==document.title){
            document.title=title;
            if(this.cache.Emitter)this.cache.Emitter.emit("ziko:title-changed");
        }
        return this;
    }
    get current(){
        return document.title;
    }
    onChange(callback){
        if(this.cache.Emitter)this.cache.Emitter.on("ziko:title-changed",callback);
        return this;
    }
}
const useTitle=(useEventEmitter)=>new ZikoUseTitle(useEventEmitter);
export{ useTitle }