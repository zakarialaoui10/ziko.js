import { mapfun } from "../Utils";

var Signal={
    linspace(){

    },
    logspace(){

    },
    arange(){

    },
    echelon(t0,t){
        if(typeof t==="number")return +(t>=t0);
        return mapfun(n=>n>=t0?1:0,...t);
    },
    rampe(t0,...t){
        //if(typeof t==="number")return (t>=t0)?t-t0:0;
        return mapfun(n=>n>=t0?n-t0:0,...t);
    },
    sign(t,t0=0){
        if(typeof t==="number")return Math.sign(t-t0);
    },
    rect(t,T,t0=0){
        if(typeof t==="number")return this.echelon(t,t0-T/2)-(this.echelon(t,t0+T/2));
    },
    tri(t,T,t0){
        if(typeof t==="number"){
            if(Math.abs(t)>T/2)return 0;
            else if(t<t0)return this.rampe(t,t0)
            else return -this.rampe(t,t0)
        }
    },
    dirac(){

    },
    lorentz(t,t0=0){
        if(typeof t==="number")return 1/(1+(t-t0)**2);
    },
    sinc(){

    },
    square(){

    },
    sawtooth(){

    }
    
}
export{Signal}