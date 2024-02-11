import { Channel } from "../Channel";
class ZikoUseChannel {
    constructor(name=""){
        this.__Channel__=Channel(name);
    }
    emit(event,data){
        this.__Channel__.emit(event,data);
        return this;
    }
    on(event,data){
        this.__Channel__.on(event,data);
        return this;
    }
    close(){
        this.__Channel__.close();
        return this;
    }
}
const useChannel=name=>new ZikoUseChannel(name);
export{ useChannel }