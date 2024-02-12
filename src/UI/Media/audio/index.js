import ZikoUIElement from "../../ZikoUIElement";
class ZikoUIAudio extends ZikoUIElement {
    constructor(src) {
      super("audio","audio");
      this.element = document.createElement("audio");
      this.element.setAttribute("src", src);
      this.render();
      this.controls();
    }
    controls(enabled = true) {
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
  }
const audio = (src) => new ZikoUIAudio(src);
export {
    audio,
    ZikoUIAudio
}