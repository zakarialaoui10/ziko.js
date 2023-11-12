import {ZikoEvent,EVENT_CONTROLLER} from "./ZikoEvent.js";
function pointerdown_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "down",
        ()=>{
            this.dx=parseInt(e.offsetX);
            this.dy=parseInt(e.offsetY);
            this.isDown=true;
        },
        {
            x:this.dx,
            y:this.dy,
            t:Date.now()-this.cache.stream.t0
        }  
    )
}
function pointermove_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "move",
        ()=>{
            this.mx=parseInt(e.offsetX);
            this.my=parseInt(e.offsetY);
            this.isMoving=true;
        },
        {
            x:this.mx,
            y:this.my,
            t:Date.now()-this.cache.stream.t0
        }    
    )
}
function pointerup_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "up",
        ()=>{
            this.ux=parseInt(e.offsetX);
            this.uy=parseInt(e.offsetY);
            this.isDown=false;
        },
        {
            x:this.ux,
            y:this.uy,
            t:Date.now()-this.cache.stream.t0
        }    
    )
}
function pointerenter_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "enter",
        null,
        null    
    )
}
function pointerleave_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "leave",
        null,
        null    
    )
}
function pointerout_controller(e){
    EVENT_CONTROLLER.call(
        this,
        e,
        "out",
        null,
        null    
    )
}
class ZikoEventPointer extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.dx=0;
        this.dy=0;
        this.dt=0;
        this.mx=0;
        this.my=0;
        this.mt=0;
        this.ux=0;
        this.uy=0;      
        this.ut=0;
        this.isMoving=false;
        this.isDown=false;
        this.cache={
            prefixe:"pointer",
            preventDefault:{
                down:false,
                move:false,
                up:false,
                enter:false,
                out:false,
                leave:false,
            },
            paused:{
                down:false,
                move:false,
                up:false,
                enter:false,
                out:false,
                leave:false,          
            },
            stream:{
                enabled:{
                    down:false,
                    move:false,
                    up:false,
                    enter:false,
                    out:false,
                    leave:false,
                },
                clear:{
                    down:false,
                    move:false,
                    up:false,
                    enter:false,
                    out:false,
                    leave:false,            
                },
                history:{
                    down:[],
                    move:[],
                    up:[],
                    enter:[],
                    out:[],
                    leave:[]
                }
            },
            callbacks:{
                down:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                move:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                up:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})],
                enter:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                out:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                leave:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})]
            }
        }
        this.__controller={
            down:pointerdown_controller.bind(this),
            move:pointermove_controller.bind(this),
            up:pointerup_controller.bind(this),
            enter:pointerenter_controller.bind(this),
            out:pointerout_controller.bind(this),
            leave:pointerleave_controller.bind(this),
        }
    }
    onDown(...callbacks){
        this.__onEvent("down",{down:true,move:false,up:false,enter:false,out:false,leave:false},...callbacks)
        return this;
    }
    onMove(...callbacks){
        this.__onEvent("move",{down:false,move:true,up:false,enter:false,out:false,leave:false},...callbacks)
        return this;
    }
    onUp(...callbacks){
        this.__onEvent("up",{down:false,move:false,up:true,enter:false,out:false,leave:false},...callbacks)
        return this;
    }
    onEnter(...callbacks){
        this.__onEvent("enter",{down:false,move:false,up:false,enter:true,out:false,leave:false},...callbacks)
        return this;
    }
    onOut(...callbacks){
        this.__onEvent("out",{down:false,move:false,up:false,enter:false,out:true,leave:false},...callbacks)
        return this;
    }
    onLeave(...callbacks){
        this.__onEvent("leave",{down:false,move:false,up:false,enter:false,out:false,leave:true},...callbacks)
        return this;
    }
    // handle({down=false,move=false,up=false}={}){
    //     if(down)this.handleDown();
    //     if(move)this.handleMove();
    //     if(up)this.handleUp()
    // }
}
var Pointer=target=>new ZikoEventPointer(target)
export default Pointer;