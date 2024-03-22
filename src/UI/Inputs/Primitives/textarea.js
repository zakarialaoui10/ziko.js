import ZikoUIElement from "../../ZikoUIElement.js";

class ZikoUITextArea extends ZikoUIElement {
    constructor() {
      super();
      this.element = document.createElement("textarea");
      //Object.assign(this,inputComposer.call(this));
    }
    get value(){
      return this.element.textContent;
    }
  }

  const textarea =()=> new ZikoUITextArea();
  export {textarea}