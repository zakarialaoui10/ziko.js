import ZikoUIElement from "../ZikoUIElement.js";
import {text,p} from "../Text/index.js";
class ZikoUILI extends ZikoUIElement{
  constructor(UI){
    super();
    this.element=document.createElement("li");
    this.append(UI);
    this.render()
  }
}
class ZikoUIList extends ZikoUIElement {
    constructor() {
      super();
      delete this.append;
      //this.style({ listStylePosition: "inside" });
    }
    append(...arr){
      for (let i = 0; i < arr.length; i++) {
        let li = null;
        if(["string","number"].includes(typeof arr[i]))arr[i]=text(arr[i])
        if (arr[i] instanceof ZikoUIElement)li=new ZikoUILI(arr[i]);
        li.setTarget(this.element)
        this.items.push(li[0]);
        this.maintain();
      }
    }
    get center() {
      this.remove;
      p(this).setTarget(this.Target).center;
      //this.style({display:"flex",justifyContent: "center",alignItems:"center"});
      return this;
    }
    delete(value) {
      const valueIndex = [...this.element.children].indexOf(value);
      return valueIndex;
      /*if(valueIndex >= 0) {
        return this.list.splice(valueIndex, 1);
      }*/
    }
    push(){

    }
    pop(){

    }
    unshift(){

    }
    shift(){

    }
    sort(){

    }
    filter(){

    }
    slice(){
      
    }
  }
class ZikoUIOList extends ZikoUIList{
  constructor(...arr){
    super();
    this.element=document.createElement("ol")
    this.append(...arr);
    this.render();
  }
  type(tp = 1) {
    this.element.setAttribute("type", tp);
    return this;
  }
  start(st = 1) {
    this.element.setAttribute("start", st);
    return this;
  }
}
class ZikoUIUList extends ZikoUIList{
  constructor(...arr){
    super();
    this.element=document.createElement("ul")
    this.append(...arr);
    this.render();
  }
}
const li=UI=>new ZikoUILI(UI)
const ol = (...arr) => new ZikoUIOList(...arr);
const ul = (...arr) => new ZikoUIUList(...arr);

export{ol,ul}