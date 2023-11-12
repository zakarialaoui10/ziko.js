import Garbage from "./Garbage.js";
import { ZikoEvent , EVENT_CONTROLLER } from "./ZikoEvent.js";
function dragstart_controller(e){
    EVENT_CONTROLLER.call(this,e,"start",null,null)
}
function drag_controller(e){
    EVENT_CONTROLLER.call(this,e,"",null,null)
}
function dragend_controller(e){
    EVENT_CONTROLLER.call(this,e,"end",null,null)
}

class ZikoEventDrag extends ZikoEvent{
    constructor(Target){
        super(Target)
        this.Target.setAttribute("draggable",true);
        this.cache={
            prefixe:"drag",
            preventDefault:{
                drag:false,
                start:false,
                end:false,
                enter:false,
                leave:false,
                over:false,
            },
            paused:{
                drag:false,
                start:false,
                end:false,
                enter:false,
                leave:false,
                over:false,
            },
            enabled:{
                drag:false,
                start:false,
                end:false,
                enter:false,
                leave:false,
                over:false,
            },
            callbacks:{
                drag:[(self)=>console.log(self)],
                start:[()=>console.log("dragstart")],
                end:[()=>console.log("dragend")],
                enter:[(self)=>console.log(self)],
                leave:[(self)=>console.log(self)],
                over:[(self)=>console.log(self)]
            },
            stream:{
                enabled:{
                    drag:false,
                    start:false,
                    end:false,
                    enter:false,
                    leave:false,
                    over:false,
                },
                clear:{
                    drag:false,
                    start:false,
                    end:false,
                    enter:false,
                    leave:false,
                    over:false,
                },
                history:{
                    drag:[],
                    start:[],
                    end:[],
                    enter:[],
                    leave:[],
                    over:[],
                }
            }
        }
        this.__controller={
            start:dragstart_controller.bind(this),
            drag:drag_controller.bind(this),
            end:dragend_controller.bind(this)
        }
    }
    onStart(...callbacks){
        this.__onEvent("start",...callbacks);
        return this;
    }
    onDrag(...callbacks){
        this.__onEvent("",...callbacks);
        return this;
    }
    onEnd(...callbacks){
        this.__onEvent("end",...callbacks);
        return this;
    }
}

const Drag=Target=>new ZikoEventDrag(Target);
export {Drag}