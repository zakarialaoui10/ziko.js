import { loop } from "../../Time";
import { complex } from "../../Math";
// let previousLeft = window.screenLeft;
// let previousTop = window.screenTop;

// function checkScreenPosition() {
//   const currentLeft = window.screenLeft;
//   const currentTop = window.screenTop;
  
//   if (previousLeft !== currentLeft || previousTop !== currentTop) {
//     console.log('Screen position changed! (custom check)');
//     previousLeft = currentLeft;
//     previousTop = currentTop;
//   }
  
//   // Schedule the next check (e.g., every 100 milliseconds)
//   setTimeout(checkScreenPosition, 100);
// }

// checkScreenPosition();
class ZikoScreenObserver {
    constructor(callback=e=>console.log({left:e.left,top:e.top})) {
      this.previousLeft = globalThis?.screenLeft;
      this.previousTop = globalThis?.screenTop;
      this.start(callback);
    }
    get left(){
        return globalThis?.screenLeft;
    }
    get top(){
        return globalThis?.screenTop;
    }
    start(callback){
        this.loop = loop(()=>{
            let currentLeft = globalThis?.screenLeft;
            let currentTop = globalThis?.screenTop;
            if (this.previousLeft !== currentLeft || this.previousTop !== currentTop) {
                callback(this)
                this.previousLeft = currentLeft;
                this.previousTop = currentTop;
            }
        },
        {fps:10,t:[0,Infinity],start:true});
        return this;
    }
}
const watchScreen=(callback)=>new ZikoScreenObserver(callback);
globalThis.watchScreen=watchScreen;
export{
    watchScreen
}