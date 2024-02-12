import { ZikoUIVideo } from "../Media";
class ZikoUIWebcame extends ZikoUIVideo{
    constructor(){
      super()
      this.element.setAttribute("src", "");
      this.constraints = { audio: true, video: { width: 1280, height: 720 } };
      //this.video=this.element
    }
    start(){
      navigator.mediaDevices.getUserMedia(this.constraints).then((mediaStream)=>{
        this.element.srcObject = mediaStream;
        this.element.onloadedmetadata = () =>{
          this.element.play();
        };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); });
      return this;
    }
  }
  const inputCamera=()=>new ZikoUIWebcame();
  export{
    inputCamera
  }
