import ZikoUIElement from "../ZikoUIElement.js";
import {Complex} from "../../Math/Complex/index.js";
class ZikoUIText extends ZikoUIElement {
    #text = ""
    constructor(...value) {
      super("span","text");
      this.element = document.createElement("span");
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
    }
    setValue(value = "", add = false) {
      if (["string", "number"].includes(typeof value)) {
        this.#text = "" + value;
        if (this.#text.includes("\n"))
          this.#text = this.#text
            .split("\n")
            .map((n) => "<span>".concat(n, "</span></br>"))
            .join("");
      }
       if (value instanceof Complex) this.#text = "" + value.UI();
       /*
       else if (value instanceof Ziko.Math.Matrix) {
          let string = "[";
          for (let j = 0; j < value.arr.length; j++)
            string +=
              (j != 0 ? " " : "") +
              `[${value.arr[j].map((n) => "  " + n.toString() + " ")}],</br>`;
          string = string.substring(0, string.length - 6) + "]";
          this.#text = "" + string;
        } 
        */
        //else console.error("not supported yet")
      if (add) this.element.innerHTML += this.#text;
      else this.element.innerHTML = this.#text;
      if (value instanceof Array || value instanceof Set) {
        if (value instanceof Set) value = [...value];
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