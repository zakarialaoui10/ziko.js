import { ZikoEvent , EVENT_CONTROLLER } from "../ZikoEvent.js";
function dragstart_controller(e){
    EVENT_CONTROLLER(this,e,"start",null,null)
}
function drag_controller(e){
    EVENT_CONTROLLER.call(this,e,"drag",null,null)
}
function dragend_controller(e){
    EVENT_CONTROLLER.call(this,e,"end",null,null)
}
function drop_controller(e){
    EVENT_CONTROLLER.call(this,e,"drop",null,null)
}

class ZikoEventDrag extends ZikoEvent{
    constructor(Target){
        super(Target)
        this.target.setAttribute("draggable",true);
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
                drag:[],
                start:[],
                end:[],
                enter:[],
                leave:[],
                over:[]
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
        this.__onEvent("start",{},...callbacks);
        return this;
    }
    onDrag(...callbacks){
        this.__onEvent("drag",{},...callbacks);
        return this;
    }
    onEnd(...callbacks){
        this.__onEvent("end",{},...callbacks);
        return this;
    }
}
class ZikoEventDrop extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
                drop:false,
            },
            paused:{
                drop:false,      
            },
            stream:{
                enabled:{
                    drop:false,
                },
                clear:{
                    drop:false,          
                },
                history:{
                    drop:[],
                }
            },
            callbacks:{
                drop:[(self)=>console.log({dx:self.dx,dy:self.dy,drop:self.drop,move:self.move,t:self.dt})],
            }
        }
        this.__controller={
            drop:drop_controller.bind(this),
        }
    }
    onDrop(...callbacks){
        this.__onEvent("drop",{},...callbacks);
        return this;
    } 
}
const useDragEvt=Target=>new ZikoEventDrag(Target);
const useDropEvt=Target=>new ZikoEventDrop(Target);
export {useDragEvt,useDropEvt}