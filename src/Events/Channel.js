// class ZikoChannel{
//     constructor(name=""){
//         this.channel=new BroadcastChannel(name);
//         this.history=new Map();
//     }
//     on(event,handler=console.log){
//         this.channel.onmessage = (e) => {
//             const {emit_event,data}=e.data
//             if(emit_event===event)handler(data);
//           };
//           return this;
//     }
//     emit(event, data){
//         this.channel.postMessage({
//             emit_event:event,
//             data
//         });
//         return this;
//     }
//     close(){
//         this.channel.close();
//         return this;
//     }
// }

class ZikoChannel{
    constructor(name=""){
        this.channel=new BroadcastChannel(name);
        this.EVENTS_DATAS_PAIRS=new Map();
        this.EVENTS_HANDLERS_PAIRS=new Map();
        this.LAST_RECEIVED_EVENT="";
    }
    emit(event, data){
        this.EVENTS_DATAS_PAIRS.set(event,data)
        this.maintainEmit(event);
        return this;
    }
    on(event,handler=console.log){
        this.EVENTS_HANDLERS_PAIRS.set(event,handler);
        this.maintainOn()
        return this;
    }
    onAll(){
        this.channel.onmessage = (e) => {
            console.log(e.data)
          };   
    }
    maintainOn(){
        this.channel.onmessage = (e) => {
            this.LAST_RECEIVED_EVENT=e.data.last_sended_event
            const Data=e.data.EVENTS_DATAS_PAIRS.get(this.LAST_RECEIVED_EVENT)
            const Handler=this.EVENTS_HANDLERS_PAIRS.get(this.LAST_RECEIVED_EVENT)
            if(Data && Handler)Handler(Data)
          };
          return this;
    }
    maintainEmit(event){
        this.channel.postMessage({
            EVENTS_DATAS_PAIRS:this.EVENTS_DATAS_PAIRS,
            last_sended_event:event
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