import { ZikoEvent , EVENT_CONTROLLER } from "../ZikoEvent.js";
const custom_event_controller=event_name=>function(e){
    EVENT_CONTROLLER.call(this,e,event_name,null,null)
}
class ZikoCustomEvent extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
                ff:false,
            },
            paused:{
                ff:false,
            },
            stream:{
                enabled:{
                    ff:false,
                },
                clear:{
                    ff:false, 
                },
                history:{
                    ff:[],
                }
            },
            callbacks:{
                ff:[],
            }
        }
        this.__controller={
            ff:custom_event_controller("ff").bind(this),
        }
        this.self=this;
    }
    init(event_name){
        this.__controller[event_name]=custom_event_controller.bind(this,event_name);
    }
    on(event_name,...callbacks){
        this.__onEvent(event_name,{},...callbacks)
        return this;
     }  
    emit(){
        const event=new Event("ff");
        this.TargetElement.dispatchEvent(event);
        return this;
    }
}
const CustomEvent=Target=>new ZikoCustomEvent(Target);
export default CustomEvent;