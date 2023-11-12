import Garbage from "./Garbage.js";
function EVENT_CONTROLLER(e,EVENT,setter,push_object){
    this.event=e
    if(this.cache.preventDefault[EVENT])e.preventDefault();
    if(setter)setter();
    if(this.cache.stream.enabled[EVENT]&&push_object)this.cache.stream.history[EVENT].push(push_object);
    this.cache.callbacks[EVENT].map(n=>n(this));
    return this;
}
class ZikoEvent{
    constructor(Target){
        this.Target=window;
        this.setTarget(Target);
        this.__dispose=this.dispose.bind(this);
        this.EventIndex=Garbage.Pointer.data.length;
        Garbage.Pointer.data.push({event:this,index:this.EventIndex});
    }
    setTarget(UI){
        this.Target=UI?.element||document.querySelector(UI);
        return this;
    }
    __handle(event,handler,dispose){
        const EVENT=(event==="drag")?event:`${this.cache.prefixe}${event}`
        this.dispose(dispose);
        console.log(EVENT)
        this.Target.addEventListener(EVENT,handler);
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
        this.__handle(event,this.__controller[event],dispose)
        return this;  
    }
    preventDefault(config={}){
        Object.assign(this.cache.preventDefault,config);
        return this;
    }
    pause(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        for(let key in config){
            if(config[key]){
                this.Target.removeEventListener(`${this.cache.prefixe}${key}`,this.__controller[`${this.cache.prefixe}${key}`]);
                this.cache.paused[`${this.cache.prefixe}${key}`]=true;
            }
        }
        return this;
     }
    resume(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        for(let key in config){
            if(config[key]){
                this.Target.addEventListener(`${this.cache.prefixe}${key}`,this.__controller[`${this.cache.prefixe}${key}`]);
                this.cache.paused[`${this.cache.prefixe}${key}`]=false;
            }
        }
        return this;
     }
    dispose(config={}){
        this.pause(config);
        return this;
     }
    stream(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n=>[n,true]))
        config={...all,...config}
        Object.assign(this.cache.stream.enabled,config);
        return this;
     }
    clear(config={}){
        const all=Object.fromEntries(Object.keys(this.cache.stream.clear).map(n=>[n,true]))
        config={...all,...config}
        for(let key in config){
            if(config[key]){
                this.cache.stream.history[key]=[]
            }
        }
        return this;
    }
}

export {ZikoEvent,EVENT_CONTROLLER}