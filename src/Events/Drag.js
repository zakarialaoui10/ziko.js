import Garbage from "./Garbage.js";
function event_controller(e,EVENT,setter){
    if(setter)setter();
    if(this.cache.preventDefault[EVENT])e.preventDefault();
    if(this.cache.Enabled[EVENT])this.cache[EVENT].push(e);
    if(this.cache.callbacks[EVENT].length>0){
        this.cache.callbacks[EVENT].map(n=>n(this))
    }
}
function dragstart_controller(e){
    event_controller.call(this,e,"dragstart")
}
function drag_controller(e){
    event_controller.call(this,e,"drag")
}
function dragend_controller(e){
    event_controller.call(this,e,"dragend")
}

class ZikoEventDrag{
    #controller;
    constructor(Target){
        this._Target=window;
        this.setTarget(Target);
        this._Target.setAttribute("draggable",true);
        this.cache={
            preventDefault:{
                drag:false,
                dragstart:false,
                dragend:false,
                dragenter:false,
                dragleave:false,
                dragover:false,
            },
            Enabled:{
                drag:true,
                dragstart:false,
                dragend:false,
                dragenter:false,
                dragleave:false,
                dragover:false,
            },
            callbacks:{
                drag:[(self)=>console.log(self)],
                dragstart:[()=>console.log("dragstart")],
                dragend:[()=>console.log("dragend")],
                dragenter:[(self)=>console.log(self)],
                dragleave:[(self)=>console.log(self)],
                dragover:[(self)=>console.log(self)]
            },
            drag:[],
            dragstart:[],
            dragend:[],
            dragenter:[],
            dragleave:[],
            dragover:[]
        }
        this.#controller={
            dragstart:dragstart_controller.bind(this),
            drag:drag_controller.bind(this),
            dragend:dragend_controller.bind(this)
        }
    }
    setTarget(UI){
        if(typeof UI === "string")this._Target=document.querySelector(UI)
        else this._Target=UI?.element||window;
        return this;
    }
    #handle(event,handler){
        this._Target.addEventListener(event,handler);
        return this;    
    }
    #onEvent(event,...callbacks){
        if(callbacks.length===0)return this;
        this.cache.callbacks[event]=callbacks.map(n=>e=>n.call(this,e));
        this.#handle(event,this.#controller[event])
        return this;          
    }
    onStart(...callbacks){
        this.#onEvent("dragstart",...callbacks);
        return this;
    }
    onDrag(...callbacks){
        this.#onEvent("drag",...callbacks);
        return this;
    }
    onEnd(...callbacks){
        this.#onEvent("dragend",...callbacks);
        return this;
    }
}

const Drag=Target=>new ZikoEventDrag(Target);
export {Drag}