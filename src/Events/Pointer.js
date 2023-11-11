import Garbage from "./Garbage.js";
function event_controller(e,EVENT,setter,push_object){
    this.event=e
    if(this.cache.preventDefault[EVENT])e.preventDefault();
    if(setter)setter();
    if(this.cache.stream.enabled[EVENT]&&push_object)this.cache.stream.history[EVENT].push(push_object);
    this.cache.callbacks[EVENT].map(n=>n(this));
    return this;
}
function pointerdown_controller(e){
    event_controller.call(
        this,
        e,
        "pointerdown",
        ()=>{
            this.dx=parseInt(e.offsetX);
            this.dy=parseInt(e.offsetY);
            this.isDown=true;
        },
        {
            x:this.dx,
            y:this.dy
        }  
    )
}
function pointermove_controller(e){
    event_controller.call(
        this,
        e,
        "pointermove",
        ()=>{
            this.mx=parseInt(e.offsetX);
            this.my=parseInt(e.offsetY);
            this.isMoving=true;
        },
        {
            x:this.mx,
            y:this.my
        }    
    )
}
function pointerup_controller(e){
    event_controller.call(
        this,
        e,
        "pointerup",
        ()=>{
            this.ux=parseInt(e.offsetX);
            this.uy=parseInt(e.offsetY);
            this.isDown=false;
        },
        {
            x:this.ux,
            y:this.uy
        }    
    )
}
function pointerenter_controller(e){
    event_controller.call(
        this,
        e,
        "pointerenter",
        null,
        null    
    )
}
function pointerleave_controller(e){
    event_controller.call(
        this,
        e,
        "pointerleave",
        null,
        null    
    )
}
function pointerout_controller(e){
    event_controller.call(
        this,
        e,
        "pointerout",
        null,
        null    
    )
}



class ZikoEventPointer{
        #controller
        #dispose
    constructor(target){
        this.Target=window;
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
            preventDefault:{
                pointerdown:false,
                pointermove:false,
                pointerup:false,
                pointerenter:false,
                pointerout:false,
                pointerleave:false,
            },
            paused:{
                pointerdown:false,
                pointermove:false,
                pointerup:false,
                pointerenter:false,
                pointerout:false,
                pointerleave:false,          
            },
            stream:{
                enabled:{
                    pointerdown:false,
                    pointermove:false,
                    pointerup:false,
                    pointerenter:false,
                    pointerout:false,
                    pointerleave:false,
                },
                history:{
                    pointerdown:[],
                    pointermove:[],
                    pointerup:[],
                    pointerenter:[],
                    pointerout:[],
                    pointerleave:[]
                }
            },
            callbacks:{
                pointerdown:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                pointermove:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                pointerup:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})],
                pointerenter:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                pointerout:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                pointerleave:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})]
            }
        }
        this.#controller={
            pointerdown:pointerdown_controller.bind(this),
            pointermove:pointermove_controller.bind(this),
            pointerup:pointerup_controller.bind(this),
            pointerenter:pointerenter_controller.bind(this),
            pointerout:pointerout_controller.bind(this),
            pointerleave:pointerleave_controller.bind(this),
        }
        this.#dispose=this.dispose.bind(this);
        this.EventIndex=Garbage.Pointer.data.length;
        Garbage.Pointer.data.push({event:this,index:this.EventIndex});
        this.setTarget(target);
    }
    setTarget(UI){
        this.Target=UI?.element||document.querySelector(UI);
        return this;
    }
    #handle(event,handler,dispose={down:false,move:false,up:false,enter:false,out:false,leave:false}){
        this.dispose(dispose);
        this.Target.addEventListener(event,handler);
        return this;   
    }
    #onEvent(event,dispose,...callbacks){
        if(callbacks.length===0){
            if(this.cache.callbacks.length>1){
                this.cache.callbacks.map(n=>e=>n.call(this,e));
            }   
            else return this;
        }
        else this.cache.callbacks[event]=callbacks.map(n=>e=>n.call(this,e));
        this.#handle(event,this.#controller[event],dispose)
        return this;  
    }
    onDown(...callbacks){
        this.#onEvent("pointerdown",{down:true,move:false,up:false,enter:false,out:false,leave:false},...callbacks)
        return this;
    }
    onMove(...callbacks){
        this.#onEvent("pointermove",{down:false,move:true,up:false,enter:false,out:false,leave:false},...callbacks)
        return this;
    }
    onUp(...callbacks){
        this.#onEvent("pointerup",{down:false,move:false,up:true,enter:false,out:false,leave:false},...callbacks)
        return this;
    }
    onEnter(...callbacks){
        this.#onEvent("pointerenter",{down:false,move:false,up:false,enter:true,out:false,leave:false},...callbacks)
        return this;
    }
    onOut(...callbacks){
        this.#onEvent("pointerout",{down:false,move:false,up:false,enter:false,out:true,leave:false},...callbacks)
        return this;
    }
    onLeave(...callbacks){
        this.#onEvent("pointerleave",{down:false,move:false,up:false,enter:false,out:false,leave:true},...callbacks)
        return this;
    }
    handle({down=false,move=false,up=false}={}){
        if(down)this.handleDown();
        if(move)this.handleMove();
        if(up)this.handleUp()
    }
    pause(config={down:true,move:true,up:true,enter:true,out:true,leave:true}){
        for(let key in config){
            if(config[key]){
                console.log(this.#controller[`pointer${key}`])
                this.Target.removeEventListener(`pointer${key}`,this.#controller[`pointer${key}`]);
                this.cache.paused[`pointer${key}`]=false;
            }
        }
        return this;
     }
    resume({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        if(down)this.Target.addEventListener("pointerdown",this.#controller.pointerdown);
        if(move)this.Target.addEventListener("pointermove",this.#controller.pointermove);
        if(up)this.Target.addEventListener("pointerup",this.#controller.pointerup);
        if(enter)this.Target.addEventListener("pointerenter",this.#controller.pointerenter);
        if(out)this.Target.addEventListener("pointerout",this.#controller.pointerout);
        if(leave)this.Target.addEventListener("pointerleave",this.#controller.pointerleave);
        return this;
     }
    
    dispose({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        this.pause({down,move,up,leave,out,enter});
        return this;
     }
    stream({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        Object.assign(this.cache.stream.enabled,{down,move,up,enter,out,leave});
        return this;
     }
    clear({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        if(down)this.cache.down=[];
        if(move)this.cache.move=[];
        if(up)this.cache.up=[];
        if(enter)this.cache.enter=[];
        if(out)this.cache.out=[];
        if(leave)this.cache.leave=[];
        return this;
    }
     preventDefault({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        Object.assign(this.cache.preventDefault,{down,move,up,enter,out,leave});
        return this;
     }
}
var Pointer=target=>new ZikoEventPointer(target)
export default Pointer;