class ZikoUseBattery{
    constructor(){
        if(this.isSupported)this.#init();
    }   
    async #init(){
        this.__Battery__=await navigator.getBattery(); 
    }
    get isSupported(){
        return !!navigator.getBattery;
    }
    get current(){
        // Synchrouns Code
        const {
            level,
            charging,
            chargingTime,
            dischargingTime
        }=this.__Battery__;
        return{
            level,
            charging,
            chargingTime,
            dischargingTime
        }
    }
    onChargingChange(callback){
        this.__Battery__.addEventListener("chargingchange",callback);
        return this;
    }
    onLevelChange(callback){
        this.__Battery__.addEventListener("levelchange",callback);
        return this;
    }
}
const useBattery=()=>new ZikoUseBattery();
export{ useBattery }