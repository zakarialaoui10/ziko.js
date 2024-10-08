import { useEventEmitter } from "./useEventEmmiter";
class ZikoUseBluetooth{
    constructor(options={acceptAllDevices:true}){
        this.options=options;
        this.__Emitter__=useEventEmitter();
        if(this.isSupported)this.#init();
    }   
    async #init(){
        this.promise=navigator.bluetooth.requestDevice(this.options).then(device=>this.device=device)
    }
    get isSupported(){
        return !!navigator.bluetooth;
    }
    get current(){
        // Synchrouns Code
        return this.device;
    }
    connect(){
        this.server=this.device.gatt.connect();
        this.__Emitter__.emit("ziko:bluetooth-connected");
        return this;
    }
    disconnect(){
        this.device.gatt.disconnect();
        this.__Emitter__.emit("ziko:bluetooth-disconnected");
        return this;
    }
    onConnect(callback){
        this.__Emitter__.on("ziko:bluetooth-connected",callback);
        return this;
    }
    onDisconnect(callback){
        this.__Emitter__.on("ziko:bluetooth-disconnected",callback);
        return this;
    }
    dispose(){

    }
    async battery(callback){
        const batteryService = await this.server.getPrimaryService("battery_service");
        const batteryLevelCharacteristic = await batteryService.getCharacteristic("battery_level");
        const batteryLevel = await batteryLevelCharacteristic.readValue();
        const batteryPercent = await batteryLevel.getUint8(0);
        callback(batteryPercent)
    }
}
const useBluetooth=(options)=>new ZikoUseBluetooth(options);
export{ useBluetooth }