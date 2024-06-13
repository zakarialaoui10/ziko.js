import { ZikoEvent , EVENT_CONTROLLER } from "../ZikoEvent.js";
function focus_controller(e){
    EVENT_CONTROLLER.call(this,e,"focus",null,null)
}
function blur_controller(e){
    EVENT_CONTROLLER.call(this,e,"blur",null,null)
}
class ZikoEventFocus extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
                focus:false,
                blur:false,
            },
            paused:{
                focus:false,
                blur:false,      
            },
            stream:{
                enabled:{
                    focus:false,
                    blur:false,
                },
                clear:{
                    focus:false, 
                    blur:false,         
                },
                history:{
                    focus:[],
                    blur:[],
                }
            },
            callbacks:{
                focus:[],
                blur:[],
            }
        }
        this.__controller={
            focus:focus_controller.bind(this),
            blur:blur_controller.bind(this),
        }
    }
    onFocus(...callbacks){
        this.__onEvent("focus",{},...callbacks)
        return this;
     }
    onBlur(...callbacks){
        this.__onEvent("blur",{},...callbacks)
        return this;
     }     
}
const useFocusEvt=Target=>new ZikoEventFocus(Target);
export default useFocusEvt