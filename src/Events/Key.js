//window.KeyGarbage=[]
import Garbage from "./Garbage.js";
class ZikoEventKey{
    #downController
    #pressController
    #upController
    #dispose
    constructor(Target=window){ 
        this._Target=window
        this.target(Target)
        this.kp=null;
        this.kd=null;
        this.ku=null;
        this.t=0;
        this.cache={
            preventDefault:{
                down:false,
                press:false,
                up:false,
            },
            Enabled:{
                down:false,
                press:false,
                up:false,
            },
            callback:{
                down:[(self)=>console.log({kd:self.kd})],
                press:[(self)=>console.log({kp:self.kp})],
                up:[(self)=>console.log({ku:self.ku})]
            },
            successifKeysCallback:{
                down:[(self)=>console.log(1111)],
                press:[(self)=>console.log(1112)],
                up:[(self)=>console.log(1113)]
            },
            down:[],
            press:[],
            up:[],
        }
        this.#downController=this._updateDown.bind(this);
        this.#pressController=this._updatePress.bind(this);
        this.#upController=this._updateUp.bind(this);
        this.#dispose=this.dispose.bind(this);
        this.EventIndex=Garbage.Key.data.length;
        Garbage.Key.data.push({event:this,index:this.EventIndex});
    }
    target(UI){
        if(typeof UI === "string")this._Target=document.querySelector(UI)
        else this._Target=UI?.element||window;
        return this;
    }
    _updateDown(e){
        if(this.cache.preventDefault.down)e.preventDefault();
        this.kd=e.key;
        if(this.cache.Enabled.down)this.cache.down.push({key:this.kd,t:0});
        this.cache.callback.down.map(n=>n(this))
        return this;
    } 
    handleDown(){
        this.dispose({down:true,press:false,up:false})
        this._Target.addEventListener("keydown",this.#downController);
        return this;
     }
     _updatePress(e){
        if(this.cache.preventDefault.press)e.preventDefault();
        this.kp=e.key;
        if(this.cache.Enabled.press)this.cache.press.push({key:this.kp,t:0});
        this.cache.callback.press.map(n=>n(this))
        return this;
    }
    handlePress(){
        this.dispose({down:false,up:false})
        this._Target.addEventListener("keypress",this.#pressController);
        return this;
    }
    _updateUp(e){
        if(this.cache.preventDefault.up)e.preventDefault();
        this.ku=e.key;
        if(this.cache.Enabled.up)this.cache.up.push({key:this.ku,t:0});
        this.cache.callback.up.map(n=>n(this))
        return this;
    }
    handleUp(){
        this.dispose({press:false,down:false})
        this._Target.addEventListener("keyup",this.#upController);
        return this;
    }
    handle({down=true,press=true,up=true}={}){
        if(down)this.handleDown();
        if(press)this.handlePress();
        if(up)this.handleUp();
        return this;
    }
    dispose({down=true,press=true,up=true}={}){
        if(down)this._Target.removeEventListener("keydown",this.#downController);
        if(press)this._Target.removeEventListener("keypress",this.#pressController);
        if(up)this._Target.removeEventListener("keyup",this.#upController);
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
    onDown(...callback){
        if(callback.length===0)return this;
        this.cache.callback.down=callback.map(n=>e=>n.call(this,e))
        return this;
     }
    onPress(...callback){
        if(callback.length===0)return this;
        this.cache.callback.press=callback.map(n=>e=>n.call(this,e))
        return this;
     }
    onUp(...callback){
        if(callback.length===0)return this;
        this.cache.callback.up=callback.map(n=>e=>n.call(this,e))
        return this;
     }
    handleSuccessifKeys({keys=[],callback=()=>console.log(1),event={down:true,press:false,up:false}}={}){
        const reversedkeys = keys.reverse();
        const newkeys = new Array(reversedkeys.length).fill(null);
        //console.log({reversedkeys,newkeys})
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
                //console.log(JSON.stringify(reversedkeys)===JSON.stringify(newkeys))
            })        
            }       
     }

}

var Key=Target=>new ZikoEventKey(Target)
export default Key