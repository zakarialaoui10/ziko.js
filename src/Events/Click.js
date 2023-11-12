import { ZikoEvent , EVENT_CONTROLLER } from "./ZikoEvent.js";
function click_controller(e){
    EVENT_CONTROLLER(this,e,"click",null,null)
}
function dbclick_controller(e){
    EVENT_CONTROLLER.call(this,e,"dbclick",null,null)
}
class ZikoEventClick extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
                click:false,
                dbclick:false,
            },
            paused:{
                click:false,
                dbclick:false,      
            },
            stream:{
                enabled:{
                    click:false,
                    dbclick:false,
                },
                clear:{
                    click:false, 
                    dbclick:false,         
                },
                history:{
                    click:[],
                    dbclick:[],
                }
            },
            callbacks:{
                click:[],
                dclick:[],
            }
        }
        this.__controller={
            click:click_controller.bind(this),
            dbclick:dbclick_controller.bind(this),
        }
    }
    onClick(...callbacks){
        this.__onEvent("click",{},...callbacks)
        return this;
     }
    onDbClick(...callbacks){
        this.__onEvent("dbclick",{},...callbacks)
        return this;
     }     
}
const Click=Target=>new ZikoEventClick(Target);
export {Click}