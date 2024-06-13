import { ZikoEvent , EVENT_CONTROLLER } from "../ZikoEvent.js";
function wheel_controller(e){
    EVENT_CONTROLLER.call(this,e,"wheel",null,null)
}
class ZikoEventWheel extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
                wheel:false,
            },
            paused:{
                wheel:false,      
            },
            stream:{
                enabled:{
                    wheel:false,

                },
                clear:{
                    wheel:false, 
         
                },
                history:{
                    wheel:[],
                }
            },
            callbacks:{
                click:[],
            }
        }
        this.__controller={
            wheel:wheel_controller.bind(this),
        }
    }
    onWheel(...callbacks){
        this.__onEvent("wheel",{},...callbacks)
        return this;
     }    
}
const useWheelEvt=Target=>new ZikoEventWheel(Target);
export default useWheelEvt