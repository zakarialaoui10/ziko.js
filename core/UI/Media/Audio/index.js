import ZikoUIElement from "../../ZikoUIElement";
class ZikoUIAudio extends ZikoUIElement {
    constructor(src) {
      super("audio","audio");
      this.element.setAttribute("src", src);
      this.useControls();
    }
    get t(){
      return this.element.currentTime;  
    }
    useControls(enabled = true) {
      this.element.controls = enabled;
      return this;
    }
    play() {
      this.element.play();
      return this;
    }
    pause() {
      this.element.pause();
      return this;
    }
    seekTo(time) {
      this.element.currentTime = time;
      return this;
    }
    onPlay(){

    }
    onPause(){

    }
  }
const audio = (src) => new ZikoUIAudio(src);
export {
    audio,
    ZikoUIAudio
}