class Threed{
    #workerContent;
    constructor(){
        this.#workerContent=(
            function (msg){
                //console.log({Main:msg.data})
                const func = new Function("return " + msg.data)();
                    let a=func()
                    //postMessage("msg from worker " + a);
                    postMessage(a);
                    self.close()
            }
            ).toString()
            this.blob = new Blob(["this.onmessage = "+this.#workerContent], { type: "text/javascript" }) 
            this.worker = new Worker(window.URL.createObjectURL(this.blob));
    }
    runFunc(func,callback){
        this.worker.postMessage(func.toString());
        this.worker.onmessage=function(e){
            callback(e.data)
        }
        return this
    }
}

var Multi=(func,callback)=>new Threed().runFunc(func,callback)

//Multi(()=>{s=0;for(i=0;i<10000000000;i++)s+=i;return s},console.log)

export default Multi;