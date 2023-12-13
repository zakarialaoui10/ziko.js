import { ZikoEvent , EVENT_CONTROLLER } from "../ZikoEvent.js";
function copy_controller(e){
    EVENT_CONTROLLER.call(this,e,"copy",null,null)
}
function cut_controller(e){
    EVENT_CONTROLLER.call(this,e,"cut",null,null)
}
function paste_controller(e){
    EVENT_CONTROLLER.call(this,e,"paste",null,null)
}
function select_controller(e){
    EVENT_CONTROLLER.call(this,e,"select",null,null)
}
class ZikoEventClipboard extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
                copy:false,
                cut:false,
                paste:false,
                select:false
            },
            paused:{
                copy:false,
                cut:false,
                paste:false,  
                select:false  
            },
            stream:{
                enabled:{
                    copy:false,
                    cut:false,
                    paste:false,
                    select:false,
                },
                clear:{
                    copy:false,
                    cut:false,
                    paste:false, 
                    select:false,      
                },
                history:{
                    copy:[],
                    cut:[],
                    paste:[],
                    select:[]
                }
            },
            callbacks:{
                copy:[],
                cut:[],
                paste:[],
                select:[]
            }
        }
        this.__controller={
            copy:copy_controller.bind(this),
            cut:cut_controller.bind(this),
            paste:paste_controller.bind(this),
            select:select_controller.bind(this)
        }
    }
    onCopy(...callbacks){
        this.__onEvent("copy",{},...callbacks)
        return this;
     } 
    onCut(...callbacks){
        this.__onEvent("cut",{},...callbacks)
        return this;
     } 
    onPaste(...callbacks){
        this.__onEvent("paste",{},...callbacks)
        return this;
     }   
    onSelect(...callbacks){
        this.__onEvent("select",{},...callbacks)
        return this;
     }   
}
const Clipboard=Target=>new ZikoEventClipboard(Target);
export default Clipboard