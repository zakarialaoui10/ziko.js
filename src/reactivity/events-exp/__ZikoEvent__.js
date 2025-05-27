import { getEvent } from "./utils.js"
function event_controller(e, event_name, custom_details_setter, push_object){
    this.cache.currentEvent = event_name;
    custom_details_setter?.call(this);
    if(this.cache.preventDefault[event_name]) e.preventDefault();
    if(this.cache.stopPropagation[event_name]) e.stopPropagation();
    if(this.cache.stopImmediatePropagation[event_name]) e.stopImmediatePropagation();
    
    if(this.cache.stream.enabled[event_name]&&push_object)this.cache.stream.history[event_name].push(push_object);
    this.cache.callbacks[event_name]?.map(n=>n(this));
    this.cache.event = e;
}
class __ZikoEvent__ {
    constructor(target = null, Events = [], custom_details_setter){
        this.target = target;
        this.cache = {
            currentEvent : null,
            event: null,
            options : {},
            preventDefault : {},
            stopPropagation : {},
            stopImmediatePropagation : {},
            event_flow : {},
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
            Object.assign(this.cache.options, {[event] : {}});
            Object.assign(this.cache.paused, {[event] : false});
            Object.assign(this.cache.stream.enabled, {[event] : false});
            Object.assign(this.cache.stream.clear, {[event] : false});
            Object.assign(this.cache.stream.history, {[event] : []});
            Object.assign(this.cache.__controllers__, {[event] : e=>event_controller.call(this, e, event, custom_details_setter)});
            Object.assign(this, { [`on${Events[i]}`] : (...callbacks)=> this.__onEvent(event, this.cache.options[event], {}, ...callbacks)})
        })
    }
    get targetElement(){
        return this.target?.element;
    }
    get currentEvent(){
        return this.cache.currentEvent;
    }
    get event(){
        return this.cache.event;
    }
    setTarget(UI){
        this.target=UI;
        return this;
    }
    __handle(event, handler, options, dispose){
        this.targetElement?.addEventListener(event, handler, options);
        return this;
    }
    __onEvent(event, options, dispose, ...callbacks){
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
        this.__handle(event, this.cache.__controllers__[event],options, dispose)
        return this;  
    }
    #override(methode, defaultValue, overrides){
        if(defaultValue === "default") Object.assign(this.cache[methode], {...this.cache[methode], ...overrides})
        const all=Object.fromEntries(Object.keys(this.cache.preventDefault).map(n=>[n,defaultValue]))
        Object.assign(this.cache[methode], {...all,...overrides});
        return this       
    }
    preventDefault(defaultValue = true, overrides = {}){
        this.#override("preventDefault", defaultValue, overrides);
        // const all=Object.fromEntries(Object.keys(this.cache.preventDefault).map(n=>[n,defaultValue]))
        // Object.assign(this.cache.preventDefault, {...all,...overrides});
        return this;
    }
    stopPropagation(defaultValue = true, overrides = {}){
        this.#override("stopPropagation", defaultValue, overrides);
        return this;
    }
    stopImmediatePropagation(defaultValue = true, overrides = {}){
        this.#override("stopImmediatePropagation", defaultValue, overrides);
        return this;
    }
    setEventOptions(event, options){
        this.pause("default", {[event] : true})
        Object.assign(this.cache.options[getEvent(event)], options);
        this.resume("default", {[event] : true})
        return this;
    }
    pause(defaultValue = true, overrides = {}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,defaultValue]));
        overrides={...all,...overrides};
        for(let key in overrides){
            if(overrides[key]){
                this.targetElement?.removeEventListener(key, this.cache.__controllers__[key], this.cache.options[key]);
                this.cache.paused[key]=true;
            }
        }
        return this;
    }
    resume(defaultValue = true, overrides = {}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,defaultValue]));
        overrides={...all,...overrides};
        for(let key in overrides){
            if(overrides[key]){
                this.targetElement?.addEventListener(key,this.cache.__controllers__[key], this.cache.options[key]);
                this.cache.paused[key]=false;
            }
        }
        return this;
     }
    stream(defaultValue = true, overrides = {}){
        this.cache.stream.t0=Date.now();
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,defaultValue]))
        overrides={...all,...overrides}
        Object.assign(this.cache.stream.enabled,overrides);
        return this;
     }
    clear(){

    }
    dispose(defaultValue = true, overrides = {}){
        this.pause(defaultValue, overrides);

        return this;
    }
}

export {
    __ZikoEvent__,
    getEvent
}