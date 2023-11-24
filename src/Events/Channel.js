class ZikoChannel{
    constructor(name=""){
        this.channel=new BroadcastChannel(name);
        this.history=new Map();
    }
    on(event,handler=console.log){
        this.channel.onmessage = (e) => {
            const {emit_event,data}=e.data
            if(emit_event===event)handler(data);
          };
          return this;
    }
    emit(event, data){
        this.channel.postMessage({
            emit_event:event,
            data
        });
        return this;
    }
    close(){
        this.channel.close();
        return this;
    }
}

const Channel=name=>new ZikoChannel(name)
export {Channel}