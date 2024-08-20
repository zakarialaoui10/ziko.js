import ZikoUIElement from "../ZikoUIElement.js";
import {Complex} from "../../Math/Complex/index.js";
import { Matrix } from "../../Math/Matrix/Matrix.js";
import { obj2str } from "../../Data/index.js";
class ZikoUIText extends ZikoUIElement {
    #text = ""
    constructor(...value) {
      super("span","text");
      this.element = document.createElement("span");
      //this.#text = "";
      this.setValue(...value);
      this.st.display("inline-block");
      globalThis.__Ziko__.__Config__.default.render && this.render()
    }
    clear() {
      this.element.textContent = "";
      return this;
    }
    get value() {
      return this.element.textContent.trim();
    }
    setValue(value = "", add = false) {
      if (["string", "number"].includes(typeof value)) {
        this.#text = "" + value;
      }
      if(value instanceof Complex || value instanceof Matrix) this.#text = "" + value.toString();
      else if(value instanceof Object) this.#text = "" + obj2str(value); 
      this.#text = this.#text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
        //else console.error("not supported yet")
      if (add) this.element.innerHTML += this.#text;
      else this.element.innerHTML = this.#text;
        if (value instanceof Set) {
          value = [...value];
          this.addValue(...value);
        }
    }  
    addValue(...value) {
      value.map((n) => {
        this.setValue(" ", true);
        this.setValue(n, true);
      });
      return this;
    }
    toggleValues(...values) {
      values = values.map((n) => "" + n);
      let index = values.indexOf("" + this.value);
      if (index != -1 && index != values.length - 1)
        this.setValue(values[index + 1]);
      else this.setValue(values[0]);
      return this;
    }
  }
 const text = (...str) => new ZikoUIText(...str)
 export {text}