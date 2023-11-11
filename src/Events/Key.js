import Garbage from "./Garbage.js";
// function keydown_controller(e){
//     (()=>this.kd=e.key)();
//     if(this.cache.preventDefault.keydown)e.preventDefault();
//     if(this.cache.Enabled.keydown)this.cache.keydown.push({key:this.kd,t:0});
//     this.cache.callbacks.keydown.map(n=>n(this))
//     return this;
// } 
function event_controller(e,EVENT,setter,push_object){
    setter()
    if(this.cache.preventDefault[EVENT])e.preventDefault();
    if(this.cache.Enabled[EVENT])this.cache[EVENT].push(push_object);
    if(this.cache.callbacks[EVENT].length>0){
        this.cache.callbacks[EVENT].map(n=>n(this))
    }
    return this;
}
function keydown_controller(e){
    event_controller.call(
        this,
        e,
        "keydown",
        ()=>this.kd=e.key,
        {key:e.key,t:10}
        )
}
function keypress_controller(e){
    event_controller.call(
        this,
        e,
        "keypress",
        ()=>this.kp=e.key,
        {key:e.key,t:10}
        )
}
function keyup_controller(e){
    event_controller.call(
        this,
        e,
        "keyup",
        ()=>this.ku=e.key,
        {key:e.key,t:10}
        )
}
class ZikoEventKey{
    #dispose
    #controller
    constructor(Target=window){ 
        this.Target=window
        this.setTarget(Target)
        this.kp=null;
        this.kd=null;
        this.ku=null;
        this.t=0;
        this.cache={
            preventDefault:{
                keydown:false,
                keypress:false,
                keyup:false,
            },
            Enabled:{
                keydown:true,
                keypress:false,
                keyup:false,
            },
            callbacks:{
                keydown:[(self)=>console.log({kd:self.kd})],
                keypress:[(self)=>console.log({kp:self.kp})],
                keyup:[(self)=>console.log({ku:self.ku})]
            },
            successifKeysCallback:{
                keydown:[(self)=>console.log(1111)],
                keypress:[(self)=>console.log(1112)],
                kyup:[(self)=>console.log(1113)]
            },
            keydown:[],
            keypress:[],
            keyup:[],
        }
        this.#controller={
            keydown:keydown_controller.bind(this),
            keypress:keypress_controller.bind(this),
            keyup:keyup_controller.bind(this)
        }
        this.#dispose=this.dispose.bind(this);
        this.EventIndex=Garbage.Key.data.length;
        Garbage.Key.data.push({event:this,index:this.EventIndex});
    }
    setTarget(UI){
        if(typeof UI === "string")this.Target=document.querySelector(UI)
        else this.Target=UI?.element||window;
        return this;
    }
    #handle(event,handler,dispose){
        this.dispose(dispose);
        this.Target.addEventListener(event,handler);
        return this;      
    }
    #onEvent(event,dispose,...callbacks){
        if(callbacks.length===0)return this;
        this.cache.callbacks[event]=callbacks.map(n=>e=>n.call(this,e));
        this.#handle(event,this.#controller[event],dispose)
        return this;  
    }
    handle({down=true,press=true,up=true}={}){
        if(down)this.#handle("keydown",this.#controller.keydown,{down:true});
        if(press)this.#handle("keypress",this.#controller.keypress,{press:true});;
        if(up)this.#handle("keyup",this.#controller.keyup,{up:true});;
        return this;
    }
    dispose({down=true,press=true,up=true}={}){
        if(down)this.Target.removeEventListener("keydown",this.#controller.keydown);
        if(press)this.Target.removeEventListener("keypress",this.#controller.keypress);
        if(up)this.Target.removeEventListener("keyup",this.#controller.keyup);
        return this;
    }
    memorize({down=true,press=true,up=true}={}){
        Object.assign(this.cache.Enabled,{down,press,up});
        return this;
    }
    clear({down=true,press=true,up=true}={}){
        if(down)this.cache.down=[];
        if(press)this.cache.press=[];
        if(up)this.cache.up=[];
        return this;
    }
    preventDefault({down=true,press=true,up=true}={}){
        Object.assign(this.cache.preventDefault,{down,press,up});
        return this;
     }
    onDown(...callbacks){
        this.#onEvent("keydown",{down:true},...callbacks)
        return this;
     }
    onPress(...callbacks){
        this.#onEvent("keypress",{press:true},...callbacks)
        return this;
     }
    onUp(...callbacks){
        this.#onEvent("keyup",{up:true},...callbacks)
        return this;
     }
    handleSuccessifKeys({keys=[],callback=()=>console.log(1),event={down:true,press:false,up:false}}={}){
        const reversedkeys = keys.reverse();
        const newkeys = new Array(reversedkeys.length).fill(null);
        const addsub = (arr, item, length = keys.length) => {
            arr.unshift(item);
            arr.length = length;
          };
        
        if(event.down){
            this.handleDown();
            this.cache.successifKeysCallback.down=[callback];
            this.cache.callback.down.push(e=>{
                addsub(newkeys,e.kd);
                if(JSON.stringify(reversedkeys)===JSON.stringify(newkeys))this.cache.successifKeysCallback.down.map(n=>n(this))
            })        
            }       
     }

}

var Key=Target=>new ZikoEventKey(Target)

// handleDown(){
//     this.dispose({down:true,press:false,up:false})
//     this.Target.addEventListener("keydown",this.#downController);
//     return this;
//  }
export default Key