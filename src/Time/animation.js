import { Ease } from "./utils";
import { map } from "../Math/Utils"
class ZikoTimeAnimation{
    constructor(callback,ease){
        this.cache={
            isRunning:false,
            AnimationId:null,
            ease
        }
        this.t=0;
        this.tx=0;
        this.ty=0;
        this.i=0;
        this.step=50;
        this.duration=3000;
        this.callback=callback;
    }
    #animation_handler(){
            this.t+=this.step;
            this.i++;
            this.tx=map(this.t,0,this.duration,0,1);
            this.ty=this.cache.ease(this.tx);
            this.callback(this)
            if(this.t>=this.duration){
                clearInterval(this.cache.AnimationId);
                this.cache.isRunning=false;
            }
    }
    start(){
        this.cache.isRunning=true;
        this.cache.AnimationId=setInterval(this.#animation_handler.bind(this),this.step);
        return this;
    }
    stop(){

    }
    clear(){

    }
    stream(){

    }
}

const animation=(callback,ease=Ease.Linear)=>new ZikoTimeAnimation(callback,ease)
export{animation}