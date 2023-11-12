
var Signal={
    _map(func){

    },
    linspace(){

    },
    logspace(){

    },
    arange(){

    },
    echelon(t,t0=0){
        if(typeof t==="number")return +(t>=t0);
    },
    rampe(t,t0=0){
        if(typeof t==="number")return (t>=t0)?t-t0:0;
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