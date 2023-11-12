import ZikoUIElement from "../../ZikoUIElement.js";
class ZikoUILabel extends ZikoUIElement{
    constructor(){
      super();
      this.element=document.createElement("label");
    }
  }
class ZikoUIInputOption extends ZikoUIElement {
    constructor(value = "") {
      super();
      this.element = document.createElement("option");
      if(value instanceof Object&&"value" in value){
        this.setValue(value.value);
        this.setText(value?.text??value.value)
      }
      else this.setValue(value);
    }
    setValue(str = "") {
      this.element.value = str;
      return this;
    }
    setText(text=""){
      if(text)this.element.textContent=text;
      return this;
    }
  }
  //const op=(n)=>new ZikoUIInputOption(n)
export{ZikoUILabel,ZikoUIInputOption}