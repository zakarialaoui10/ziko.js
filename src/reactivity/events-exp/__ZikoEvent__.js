import { getEvent } from "./utils.js"
function EVENT_CONTROLLER(e,event_name,setter,push_object){
    console.log({e, event_name})
    // this.event=e
    // if(this.cache.preventDefault[EVENT])e.preventDefault();
    // if(setter)setter();
    // if(this.cache.stream.enabled[EVENT]&&push_object)this.cache.stream.history[EVENT].push(push_object);
    // this.cache.callbacks[EVENT].map(n=>n(this));
    return this;
}
function event_controller(e, event_name){
    console.log(this)
    console.log({e, event_name})
    if(this.cache.preventDefault[event_name]) e.preventDefault()
    this.cache.callbacks[event_name].map(n=>n(this));

    // EVENT_CONTROLLER.call(this, e, event_name, null, null)
}
class __ZikoEvent__ {
    constructor(target = null, Events = [], details){
        this.target = target;
        this.cache = {
            details,
            preventDefault : {},
            pause : {},
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
            Object.assign(this.cache.pause, {[event] : false});
            Object.assign(this.cache.stream.enabled, {[event] : false});
            Object.assign(this.cache.stream.clear, {[event] : false});
            Object.assign(this.cache.stream.history, {[event] : []});
            // Object.assign(this.cache.__controllers__, {[event] : e=> EVENT_CONTROLLER.bind(this, e, event, null, null)});
            Object.assign(this.cache.__controllers__, {[event] : e=>event_controller.call(this, e, event)});
            Object.assign(this, { [`on${Events[i]}`] : (...callbacks)=> this.__onEvent(event, {}, ...callbacks)})
        })
        // Events.forEach((eve))
        // Object.assign(this, { a : ()=> 1})
    }
    get targetElement(){
        return this.target?.element;
    }
    __handle(event, handler, dispose){
        this.targetElement?.addEventListener(event, handler);
        return this;
    }
    __onEvent(event,dispose,...callbacks){
        if(callbacks.length===0){
            if(this.cache.callbacks.length>1){
                this.cache.callbacks.map(n=>e=>n.call(this,e));
            }   
            else {
                return this;
            }
        }
        else this.cache.callbacks[event]=callbacks.map(n=>e=>n.call(this,e));
        this.__handle(event,this.cache.__controllers__[event],dispose)
        return this;  
    }
    preventDefault(){

    }
    pause(){

    }
    resume(){

    }
    stream(){

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