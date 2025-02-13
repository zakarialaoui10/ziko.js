import { ZikoEvent , EVENT_CONTROLLER } from "./ZikoEvent.js";
function click_controller(e){
    EVENT_CONTROLLER.call(this,e,"click",null,null)
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
                dbclick:[],
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
const useClickEvent=target=>new ZikoEventClick(target);
export default useClickEvent;
export {
    useClickEvent,
    ZikoEventClick
}


// 


// import { ZikoEvent, EVENT_CONTROLLER } from "./ZikoEvent.js";

// class ZikoEventClick extends ZikoEvent {
//     constructor(target) {
//         super(target);
//         this.event = null;
//         this.cache = {
//             prefixe: "",
//             preventDefault: { click: false, dbclick: false },
//             paused: { click: false, dbclick: false },
//             stream: {
//                 enabled: { click: false, dbclick: false },
//                 clear: { click: false, dbclick: false },
//                 history: { click: [], dbclick: [] }
//             },
//             callbacks: { click: [], dbclick: [] }
//         };
        
//         this.__controller = {};
//         ["click", "dbclick"].forEach(evt => {
//             this.__controller[evt] = (e) => EVENT_CONTROLLER.call(this, e, evt, null, null);
//         });
//     }

//     onClick(...callbacks) {
//         return this.__onEvent("click", {}, ...callbacks);
//     }

//     onDbClick(...callbacks) {
//         return this.__onEvent("dbclick", {}, ...callbacks);
//     }
// }

// const useClickEvent = (target) => new ZikoEventClick(target);

// export default useClickEvent;
// export { useClickEvent, ZikoEventClick };
