import ZikoUIElement from "../ZikoUIElement.js";
import ZikoUIContainerElement from "../ZikoUIContainerElement.js";
import {Complex} from "../../Math/Complex/index.js";
import { Matrix } from "../../Math/Matrix/Matrix.js";
import { obj2str } from "../../Data/index.js";
class __ZikoUIInlineText__ extends ZikoUIElement {
    #text = ""
    constructor(tag, name,...value) {
      super(tag, name);
      //this.#text = "";
      this.setValue(...value);
      this.st.display("inline-block");
    }
    clear() {
      this.element.textContent = "";
      return this;
    }
    get value() {
      return this.element.textContent.trim();
      // return this.element.textContent.trim();
    }
    setValue(value = "", add = false) {
      if (["string", "number"].includes(typeof value)) {
        this.#text = "" + value;
      }
      if(value instanceof Object){
        if(value instanceof __ZikoUIInlineText__) {
          this.element.append(value.element)
          return this;
        }
        else if(value instanceof Complex || value instanceof Matrix) this.#text = "" + value.toString();
        else this.#text = "" + obj2str(value); 
      }
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
        // this.setValue(" ", true);
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
export {__ZikoUIInlineText__}