import ZikoUIElement from "../../ZikoUIElement.js";
import { Input } from "../../../Events/index.js";
import { ZikoUIInputOption,ZikoUILabel } from "./elements.js";
import { btn } from "./btn.js";
//import { select } from "./select.js";
//import { debounce,throttle} from "../../Data/decorators.js";

class ZikoUIInput extends ZikoUIElement {
  constructor(value = "",datalist) {
    super();
    this.element = document.createElement("input");
    Object.assign(this.events,{input:null})
    this.setValue(value);
    if(datalist)this.linkDatalist(datalist)
    this.render();
  }
  onInput(...callbacks){
    if(!this.events.input)this.events.input = Input(this);
    this.events.input.onInput(...callbacks);
    return this;
  }
  onChange(...callbacks){
    if(!this.events.input)this.events.input = Input(this);
    this.events.input.onChange(...callbacks);
    return this;
  }
  linkDatalist(datalist) {
    let id;
    if(datalist instanceof ZikoUIInputDatalist)id=datalist.Id
    else if(datalist instanceof Array){
      const Datalist=new ZikoUIInputDatalist(...datalist);
      id=Datalist.Id;
      console.log(Datalist)
    }
    else id=datalist;
    this.element.setAttribute("list", id);
    return this;
  }
  get value() {
    return this.element.value;
  }
  _setType(type) {
    this.element.type = type;
    return this;
  }
  setValue(value="") {
    this.element.value = value;
    return this;
  }
  useState(state){
    this.setValue(state)
    return [{value:this.value},e=>this.setValue(e)]
  }
  setPlaceholder(value) {
    if(value)this.element.placeholder = value;
    return this;
  }
  get isValide() {
    return this.element.checkValidity();
  }
  setRequired(required = true) {
    this.element.required = required;
    return this;
  }
  select() {
    this.element.select();
    return this;
  }
  copy() {
    this.element.select();
    document.execCommand("copy");
    return this;
  }
  cut() {
    this.element.select();
    document.execCommand("cut");
    return this;
  }
  accept(value) {
    this.element.accept = value;
    return this;
  }
}
class ZikoUIInputSearch extends ZikoUIInput {
  constructor() {
    super();
    this._setType("search");
    this.Length = 0;
  }
  onsearch(callback) {
    this.element.addEventListener("search", () => callback());
    return this;
  }
  connect(...UIElement) {
/* 
    let memory = new Array(UIElement.length).fill([]);
    UIElement.map((n, i) => {
      //console.log(n)
      n.items.map((m, j) => {
        memory[i][j] = m.element.style.display;
      });
    });
    UIElement.map((n, i) =>
      this.onInput(() => {
        n.filterByTextContent(this.value, memory[i]);
        this.Length = n.children.filter(
          (n) => n.style.display != "none"
        ).length;
      })
    );
    */
    return this;
  }
  displayLength(UIElement) {
    this.element.addEventListener("keyup", () =>
      UIElement.setValue(this.Length)
    );
    return this;
  }
}
class ZikoUIInputNumber extends ZikoUIInput {
  constructor(min, max ,step = 1) {
    super();
    this._setType("number");
    this.setMin(min).setMax(max).setStep(step);
    this.render();
  }
  get value() {
    return +this.element.value;
  }
  setMin(min) {
    this.element.min = min;
    return this;
  }
  setMax(max) {
    this.element.max = max;
    return this;
  }
  setStep(step) {
    this.element.step = step;
    return this;
  }
}
class ZikoUIInputSlider extends ZikoUIInputNumber {
  constructor(val = 0, min = 0, max = 10, step = 1) {
    super();
    this._setType("range");
    this.setMin(min).setMax(max).setValue(val).setStep(step);
    this.render();
  }
}
class ZikoUIInputColor extends ZikoUIInput {
  constructor() {
    super();
    this._setType("color");
    this.background(this.value);
    this.render();
    this.onInput(() => this.background(this.value));
  }
}
class ZikoUIInputPassword extends ZikoUIInput {
  constructor() {
    super();
    this._setType("password");
    this.render();
  }
}
class ZikoUIInputEmail extends ZikoUIInput {
  constructor() {
    super();
    this._setType("email");
    this.render();
  }
}
class ZikoUIInputTime extends ZikoUIInput {
  constructor() {
    super();
    this._setType("time");
    this.render();
  }
}
class ZikoUIInputDate extends ZikoUIInput {
  constructor() {
    super();
    this._setType("date");
    this.render();
  }
}
class ZikoUIInputDateTime extends ZikoUIInput {
  constructor() {
    super();
    this._setType("datetime-local");
    this.render();
  }
}
class ZikoUIInputCheckbox extends ZikoUIInput {
  constructor() {
    super();
    this._setType("checkbox");
    this.cursor("pointer");
  }
  get checked() {
    return this.element.checked;
  }
  check(checked = true) {
    this.element.checked = checked;
    return this;
  }
  color(color) {
    this.element.style.accentColor = color;
    return this;
  }
}
class ZikoUIInputRadio extends ZikoUIInput {
  constructor() {
    super();
    this._setType("radio");
    this.cursor("pointer");
  }
  get checked() {
    return this.element.checked;
  }
  check(checked = true) {
    this.element.checked = checked;
    return this;
  }
  color(color) {
    this.element.style.accentColor = color;
    return this;
  }
}


class ZikoUIInputImage extends ZikoUIElement {
  constructor(text = "File") {
    super();
    this._aux_element = btn(text).setTarget(this.Target);
    this.element = document.createElement("input");
    this.element.setAttribute("type", "file");
    this.element.setAttribute("accept", "image");
    this._aux_element.onClick(() => this.element.click());
    this.element.onChange = this.handleImage.bind(this);
  }
  handleImage(e) {
    const reader = new FileReader();
    const img = new Image();
    reader.onload = function (event) {
      img.src = event.target.result;
      console.log(img.src);
    };
    reader.readAsDataURL(e.target.files[0]);
    this.img = img;
  }
  get value() {
    return this.img;
  }
  render(bool = true) {
    if (bool) this.Target.appendChild(this._aux_element.element);
    else this.remove();
    return this;
  }
  remove() {
    if (this.Target.children.length) this.Target.removeChild(this._aux_element.element);
    return this;
  }
}

class ZikoUIInputDatalist extends ZikoUIElement {
  constructor(...options){
    super();
    this.element = document.createElement("datalist");
    this.addOptions(...options).setId("ziko-datalist-id"+crypto.randomUUID().slice(8,18));
    this.render();
  }
  addOptions(...options) {
    options.map((n) => this.append(new ZikoUIInputOption(n)));
    return this;
  }
}
const input = (value,datalist) => {
  if(value instanceof Object){
    const {datalist,placeholder}=value;
    value=value.value??"";
    return new ZikoUIInput(value,datalist).setPlaceholder(placeholder);
  }
  return new ZikoUIInput(value,datalist);
}
const datalist = (...options) => new ZikoUIInputDatalist(...options);
const slider = (value, min, max, step) =>{
  if(value instanceof Object){
    const {min=0,max=10,step=1}=value;
    value=value?.value??5;
    return new ZikoUIInputSlider(value, min, max, step);
  }
  return new ZikoUIInputSlider(value, min, max, step);
}
const inputNumber = (min,max,step) =>{
  if(min instanceof Object){
    const {value,max=10,step=1,placeholder=""}=min;
    min=min?.min??0;
    return new ZikoUIInputSlider(min, max, step).setValue(value).setPlaceholder(placeholder);
  }
  return new ZikoUIInputNumber(min,max,step);
}
const search = (...a) => new ZikoUIInputSearch().connect(...a);
const inputImage = (text) => new ZikoUIInputImage(text);
const inputPassword = () => new ZikoUIInputPassword();
const inputEmail = () => new ZikoUIInputEmail();
const inputColor = () => new ZikoUIInputColor();
const inputTime = () => new ZikoUIInputTime();
const inputDate = () => new ZikoUIInputDate();
const inputDateTime = () => new ZikoUIInputDateTime();
const checkbox = () => new ZikoUIInputCheckbox();
const radio = () => new ZikoUIInputRadio();


export {
  input,
  search,
  slider,
  checkbox,
  radio,
  datalist,
  inputNumber,
  inputColor,
  inputDate,
  inputDateTime,
  inputEmail,
  inputImage,
  inputPassword,
  inputTime,
};
export {textarea} from "./textarea.js";
