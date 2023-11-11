import Garbage from "./Garbage.js";
function event_controller(e,EVENT,setter,push_object){
    this.event=e
    if(this.cache.preventDefault[EVENT])e.preventDefault();
    setter();
    if(this.cache.Enabled[EVENT])this.cache[EVENT].push({x:this.dx,y:this.dy});
    this.cache.callbacks[EVENT].map(n=>n(this));
    return this;
}
function pointerdown_controller(e){
    event_controller.call(
        this,
        e,
        "pointerdown",
        ()=>{
            this.mx=parseInt(e.offsetX);
            this.my=parseInt(e.offsetY);
            this.isDown=true;
        }  
    )
}
class ZikoEventPointer{
        #controller
        #dispose
    constructor(target){
        this._Target=window;
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
            Enabled:{
                pointerdown:false,
                pointermove:false,
                pointerup:false,
                pointerenter:false,
                pointerout:false,
                pointerleave:false,
            },
            callbacks:{
                pointerdown:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                pointermove:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                pointerup:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})],
                pointerenter:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                pointerout:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                pointerleave:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})]
            },
            pointerdown:[],
            pointermove:[],
            pointerup:[],
            pointerenter:[],
            pointerout:[],
            pointerleave:[]
        }
        this.#controller={
            pointerdown:pointerdown_controller.bind(this),
            pointermove:this.#updateMove.bind(this),
            pointerup:this.#updateUp.bind(this),
            pointerenter:this.#updateEnter.bind(this),
            pointerout:this.#updateOut.bind(this),
            pointerleave:this.#updateLeave.bind(this),
        }
        this.#dispose=this.dispose.bind(this);
        this.EventIndex=Garbage.Pointer.data.length;
        Garbage.Pointer.data.push({event:this,index:this.EventIndex});
        this.setTarget(target);
    }
    setTarget(UI){
        this._Target=UI?.element||document.querySelector(UI);
        return this;
    }
    #updateDown(e){
        this.event=e
        if(this.cache.preventDefault.pointerdown)e.preventDefault();
        this.dx=parseInt(e.offsetX);
        this.dy=parseInt(e.offsetY);
        this.isDown=true;
        if(this.cache.Enabled.pointerdown)this.cache.pointerdown.push({x:this.dx,y:this.dy});
        this.cache.callbacks.pointerdown.map(n=>n(this));
        return this;
    }
    handleDown(){
       this._Target.addEventListener("pointerdown",this.#controller.pointerdown);
       return this;
    }
    #updateMove(e){
        this.event=e;
        if(this.cache.preventDefault.pointermove)e.preventDefault();
        this.mx=parseInt(e.offsetX);
        this.my=parseInt(e.offsetY);
        this.isMoving=true;
        if(this.cache.Enabled.pointermove)this.cache.pointermove.push({x:this.mx,y:this.my,down:this.isDown,t:this.mt});
        this.cache.callbacks.pointermove.map(n=>n(this)); 
        return this;
        
    }
    handleMove(){
       this._Target.addEventListener("pointermove",this.#controller.pointermove);
       return this;
    }
    #updateUp(e){
        this.event=e;
        if(this.cache.preventDefault.pointerup)e.preventDefault();
        this.ux=parseInt(e.offsetX);
        this.uy=parseInt(e.offsetY);
        this.isDown=false;
        if(this.cache.Enabled.pointerup)this.cache.pointerup.push({x:this.ux,y:this.uy,t:this.ut});
        this.cache.callbacks.pointerup.map(n=>n(this)); 
        return Pointer;
    }
    handleUp(){
       this._Target.addEventListener("pointerup",this.#controller.pointerup);
       return this;
    }
    #updateEnter(e){
        this.event=e;
        if(this.cache.preventDefault.up)e.preventDefault();
        this.ux=parseInt(e.offsetX);
        this.uy=parseInt(e.offsetY);
        this.isDown=false;
        if(this.cache.Enabled.enter)this.cache.enter.push({x:this.ux,y:this.uy,t:this.ut});
        this.cache.callback.enter.map(n=>n(this)); 
        return Pointer;
    }
    handleEnter(){
       this._Target.addEventListener("pointerenter",this.#controller.pointerenter);
       return this;
    }
    #updateOut(e){
        this.event=e;
        if(this.cache.preventDefault.up)e.preventDefault();
        this.ux=parseInt(e.offsetX);
        this.uy=parseInt(e.offsetY);
        this.isDown=false;
        if(this.cache.Enabled.out)this.cache.out.push({x:this.ux,y:this.uy,t:this.ut});
        this.cache.callback.out.map(n=>n(this)); 
        return Pointer;
    }
    handleOut(){
       this._Target.addEventListener("pointerout",this.#controller.pointerout);
       return this;
    }
    #updateLeave(e){
        this.event=e;
        if(this.cache.preventDefault.up)e.preventDefault();
        this.ux=parseInt(e.offsetX);
        this.uy=parseInt(e.offsetY);
        this.isDown=false;
        if(this.cache.Enabled.leave)this.cache.leave.push({x:this.ux,y:this.uy,t:this.ut});
        this.cache.callback.leave.map(n=>n(this)); 
        return Pointer;
    }
    handleLeave(){
       this._Target.addEventListener("pointerleave",this.#controller.pointerleave);
       return this;
    }
    handle({down=false,move=false,up=false}={}){
        if(down)this.handleDown();
        if(move)this.handleMove();
        if(up)this.handleUp()
    }
    dispose({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        if(down)this._Target.removeEventListener("pointerdown",this.#controller.pointerdown);
        if(move)this._Target.removeEventListener("pointermove",this.#controller.pointermove);
        if(up)this._Target.removeEventListener("pointerup",this.#controller.pointerup);
        if(enter)this._Target.removeEventListener("pointerenter",this.#controller.pointerenter);
        if(out)this._Target.removeEventListener("pointerout",this.#controller.pointerout);
        if(leave)this._Target.removeEventListener("pointerleave",this.#controller.pointerleave);
        return this;
     }
    stream({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        Object.assign(this.cache.Enabled,{down,move,up,enter,out,leave});
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
     onDown(...callbacks){
        if(callbacks.length===0)return this;
        this.cache.callbacks.pointerdown=callbacks.map(n=>e=>n.call(this,e));
        this.handleDown();
        return this;
     }
     onMove(...callbacks){
        if(callbacks.length===0)return this;
        this.cache.callbacks.pointermove=callbacks.map(n=>e=>n.call(this,e));
        this.handleMove();
        return this;
     }
     onUp(...callbacks){
        if(callbacks.length===0)return this;
        this.cache.callbacks.pointerup=callbacks.map(n=>e=>n.call(this,e));
        this.handleUp();
        return this;
     }
     onEnter(...callbacks){
        if(callbacks.length===0)return this;
        this.cache.callbacks.pointerenter=callbacks.map(n=>e=>n.call(this,e));
        this.handleEnter();
        return this;
     }
     onOut(...callbacks){
        if(callbacks.length===0)return this;
        this.cache.callbacks.pointerout=callbacks.map(n=>e=>n.call(this,e));
        this.handleOut();
        return this;
     }
     onLeave(...callbacks){
        if(callbacks.length===0)return this;
        this.cache.callbacks.pointerleave=callbacks.map(n=>e=>n.call(this,e));
        this.handleLeave();
        return this;
     }
}
var Pointer=target=>new ZikoEventPointer(target)
export default Pointer;