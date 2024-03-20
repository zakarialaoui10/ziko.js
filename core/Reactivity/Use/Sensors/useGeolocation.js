class ZikoUseGeolocation{
    constructor(){
        if(this.isSupported)this.#init();
    }   
    async #init(){
        navigator.geolocation.getCurrentPosition(e=>this.__Geolocation__=e)
    }
    get isSupported(){
        return !!navigator.geolocation;
    }
    get current(){
        // Synchrouns Code
        return this.__Geolocation__;
    }
}
const useGeolocation=()=>new ZikoUseGeolocation();
export{ useGeolocation }