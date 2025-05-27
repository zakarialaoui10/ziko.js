import { getEvent } from "./utils.js"
function event_controller(e, event_name, details_setter, push_object){
    // let a=details_setter.call(this)
    // console.log(a)
    details_setter?.call(this)
    if(this.cache.preventDefault[event_name]) e.preventDefault()
    if(this.cache.stream.enabled[event_name]&&push_object)this.cache.stream.history[event_name].push(push_object)
    this.cache.callbacks[event_name].map(n=>n(this));

}
class __ZikoEvent__ {
    constructor(target = null, Events = [], details_setter){
        this.target = target;
        this.cache = {
            details: null,
            preventDefault : {},
            paused : {},
            stream : {
                enabled : {},
                clear : {},
                history : {}
            },
            callbacks : {

            },
            __controllers__:{

            }
        }
        const events = Events.map(n=>getEvent(n))
        events.forEach((event,i)=>{
            Object.assign(this.cache.preventDefault, {[event] : false});
            Object.assign(this.cache.paused, {[event] : false});
            Object.assign(this.cache.stream.enabled, {[event] : false});
            Object.assign(this.cache.stream.clear, {[event] : false});
            Object.assign(this.cache.stream.history, {[event] : []});
            Object.assign(this.cache.__controllers__, {[event] : e=>event_controller.call(this, e, event, details_setter)});
            Object.assign(this, { [`on${Events[i]}`] : (...callbacks)=> this.__onEvent(event, {}, ...callbacks)})
        })
    }
    get targetElement(){
        return this.target?.element;
    }
    __handle(event, handler, dispose){
        this.targetElement?.addEventListener(event, handler);
        return this;
    }
    __onEvent(event, dispose, ...callbacks){
        if(callbacks.length===0){
            console.log("00")
            if(this.cache.callbacks[event]){
                console.log("Call")
                // this.cache.callbacks.map(n=>e=>n.call(this,e));
                this.cache.callbacks[event].map(n=>e=>n.call(this,e))
            }   
            else {
                return this;
            }
        }
        else this.cache.callbacks[event] = callbacks.map(n=>e=>n.call(this,e));
        this.__handle(event,this.cache.__controllers__[event],dispose)
        return this;  
    }
    preventDefault(){

    }
    pause(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        for(let key in config){
            if(config[key]){
                this.targetElement?.removeEventListener(key, this.cache.__controllers__[key]);
                this.cache.paused[key]=true;
            }
        }
        return this;
    }
    resume(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        for(let key in config){
            if(config[key]){
                this.targetElement?.addEventListener(key,this.cache.__controllers__[key]);
                this.cache.paused[key]=false;
            }
        }
        return this;
     }
    stream(config={}){
        this.cache.stream.t0=Date.now();
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        Object.assign(this.cache.stream.enabled,config);
        return this;
     }
    clear(){

    }
    dispose(){

    }
}

export {
    __ZikoEvent__,
    getEvent
}