import {ZikoEvent,EVENT_CONTROLLER} from "../ZikoEvent.js";
function keydown_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "down",
        ()=>this.kd=e.key,
        {key:e.key,t:10}
        )
}
function keypress_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "press",
        ()=>this.kp=e.key,
        {key:e.key,t:10}
        )
}
function keyup_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "up",
        ()=>this.ku=e.key,
        {key:e.key,t:10}
        )
}
class ZikoEventKey extends ZikoEvent{
    constructor(target){ 
        super(target)
        this.kp=null;
        this.kd=null;
        this.ku=null;
        this.t=0;
        this.cache={
            prefixe:"key",
            preventDefault:{
                down:false,
                press:false,
                up:false,
            },
            paused:{
                down:false,
                press:false,
                up:false,
            },
            stream:{
                enabled:{
                    down:false,
                    press:false,
                    up:false,
                },
                clear:{
                    down:true,
                    press:false,
                    up:false,
                },
                history:{
                    down:[],
                    press:[],
                    up:[],
                }
            },
            callbacks:{
                down:[(self)=>console.log({kd:self.kd})],
                press:[(self)=>console.log({kp:self.kp})],
                up:[(self)=>console.log({ku:self.ku})]
            },
            successifKeysCallback:{
                down:[(self)=>console.log(1111)],
                press:[(self)=>console.log(1112)],
                kyup:[(self)=>console.log(1113)]
            }
        }
        this.__controller={
            down:keydown_controller.bind(this),
            press:keypress_controller.bind(this),
            up:keyup_controller.bind(this)
        }
    }
    onDown(...callbacks){
        this.__onEvent("down",{down:true},...callbacks)
        return this;
     }
    onPress(...callbacks){
        this.__onEvent("press",{press:true},...callbacks)
        return this;
     }
    onUp(...callbacks){
        this.__onEvent("up",{up:true},...callbacks)
        return this;
     }

}

var useKeyEvenent=target=>new ZikoEventKey(target)

// handleDown(){
//     this.dispose({down:true,press:false,up:false})
//     this.target.addEventListener("keydown",this.#downController);
//     return this;
//  }
export default useKeyEvenent