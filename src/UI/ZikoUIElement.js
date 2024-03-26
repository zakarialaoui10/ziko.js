import { ZikoStyle } from "./Style";
import { 
  Pointer,
  Mouse, 
  Wheel,
  Key, 
  Drag , 
  Drop, 
  Click , 
  Clipboard ,
  Focus,
  customEvent,
} from "../Reactivity/Events"
import { 
  WatchIntersection, 
  WatchSize 
} from "../Reactivity";
import { text } from "./Text";
import { Random } from "../Math/Random";
class ZikoUIElement {
  constructor(element,name="") {
    //this.target = globalThis.__Target__||globalThis.document.body;
    this.target = globalThis.__ZikoConfig__.default.target||globalThis.document.body;
    if(typeof element === "string") {
      element === "svg" ? element=document.createElementNS("http://www.w3.org/2000/svg", "svg"): element = globalThis.document.createElement(element);
    }
    this.element = element;
    this.uuid=this.constructor.name+"-"+Random.string(10);
    this.cache = {
      name,
      parent:null,
      isRoot:false,
      isHidden: false,
      isFrozzen:false,
      style: ZikoStyle({}),
      attributes: {},
      filters: {},
      temp:{}
    };
    this.items = [];
    this.events = {
      ptr:null,
      mouse:null,
      Wheel:null,
      key:null,
      drag:null,
      drop:null,
      click:null,
      clipboard:null,
      focus:null,
      custom:null,
    }
    this.observer={
      resize:null,
      intersection:null
    }
    this.cache.style.linkTo(this);
    this.style({ 
      position: "relative",
      boxSizing:"border-box",
      fontFamily:"verdana",
      margin:0,
      padding:0,
     });
    this.size("auto", "auto");
    globalThis.__UI__[this.cache.name]?.push(this);
    this.render(globalThis.__ZikoConfig__.default.render);
  }
  get st(){
    return this.cache.style;
  }
  get attr(){
    return this.cache.attributes;
  }
  get evt(){
    return this.cache.events;
  }
  get html(){
    return this.element.innerHTML;
  }
  get __app__(){
    if(this.cache.isRoot)return this;
    let root=this.cache.parent;
    while(1){
      if(!root)return null;
      if(root.cache.isRoot)return root;
      root=root.parent;
    }
  }
  clone(render=false) {
    // Not working For Table 
    const UI = new this.constructor();
    UI.__proto__=this.__proto__;
    if(this.items.length){
      const items = [...this.items].map(n=>n.clone());
      UI.append(...items);
    }
    else UI.element=this.element.cloneNode(true);
    return UI.render(render);
  }
  style(styles,{target = "parent", maskVector = null } = {}){
    this.st.style(styles,{target,maskVector});
    return this;
  }
  size(width,height,{ target, maskVector } = {}){
    this.st.size(width,height,{target,maskVector});
    return this; 
  }
  get parent(){
    return this.cache.parent;
  }
  get width(){
    return this.element.getBoundingClientRect().width;
  }
  get height(){
    return this.element.getBoundingClientRect().height;
  }
  get top(){
    return this.element.getBoundingClientRect().top;
  }
  get right(){
    return this.element.getBoundingClientRect().right;
  }
  get bottom(){
    return this.element.getBoundingClientRect().bottom;
  }
  get left(){
    return this.element.getBoundingClientRect().left;
  } 
  freeze(freeze){
    this.cache.isFrozzen=freeze;
    return this;
  }
  at(index) {
    return this.items.at(index);
  }
  maintain() {
    for (let i = 0; i < this.items.length; i++)
      Object.assign(this, { [[i]]: this.items[i] });
    this.length = this.items.length;
    return this;
  }
  setTarget(tg) {
    if (tg instanceof ZikoUIElement) tg = tg.element;
    this.remove();
    this.target = tg;
    this.render();
    return this;
  }
  render(render = true , target = this.target) {
    if(target instanceof ZikoUIElement)target=target.element;
    this.target=target;
    if(render) {
      this.target.appendChild(this.element);
    }
    else this.remove();
    return this;
  }
  unrender(){
    if(this.cache.parent)this.cache.parent.remove(this);
    else if(this.target.children.length && [...this.target.children].includes(this.element)) this.target.removeChild(this.element);
    return this;
  }
  append(...ele) {
    if(this.cache.isFrozzen){
      console.warn("You can't append new item to frozzen element");
      return this;
    }
    for (let i = 0; i < ele.length; i++){
    if(["number","string"].includes(typeof ele[i]))ele[i]=text(ele[i]);
      if (ele[i] instanceof ZikoUIElement) {
        ele[i].cache.parent=this;
        this.element.appendChild(ele[i].element);
        ele[i].Target = this.element;
        this.items.push(ele[i]);
      } else if (ele[i] instanceof Object) {
        if (ele[i]?.style) this.style(ele[i]?.style);
        if (ele[i]?.attr) {
          Object.entries(ele[i].attr).forEach((n) =>
            this.setAttr("" + n[0], n[1]),
          );
        }
      }
    }
    this.maintain();
    return this;
  }
  remove(...ele) {
    if(ele.length==0){
      if(this.cache.parent)this.cache.parent.remove(this);
      else if(this.target.children.length && [...this.target.children].includes(this.element)) this.target.removeChild(this.element);
    }
    else {
      const remove = (ele) => {
        if(typeof ele === "number") ele=this.items[ele];
        if(ele instanceof ZikoUIElement)this.element.removeChild(ele.element);
          this.items=this.items.filter(n=>n!==ele);
      };
      for (let i = 0; i < ele.length; i++) remove(ele[i]);
      for (let i = 0; i < this.items.length; i++)Object.assign(this, { [[i]]: this.items[i] });
      // Remove from item 
    }
    return this;
  }
  renderAfter(t = 1) {
    setTimeout(() => this.render(), t);
    return this;
  }
  unrenderAfter(t = 1) {
    setTimeout(() => this.unrender(), t);
    return this;
  }
  // removeItem(...ele) {
  //   const remove = (ele) => {
  //     if (ele instanceof ZikoUIElement) this.element.removeChild(ele.element);
  //     else if (typeof ele === "number")
  //       this.element.removeChild(this.element.children[ele]);
  //   };
  //   for (let i = 0; i < ele.length; i++) remove(ele[i]);
  //   for (let i = 0; i < this.items.length; i++)
  //     Object.assign(this, { [[i]]: this.items[i] });
  //   return this;
  // }
  insertAt(index, ...ele) {
    if (index >= this.element.children.length) this.append(...ele);
    else
      for (let i = 0; i < ele.length; i++) {
        if(["number","string"].includes(typeof ele[i]))ele[i]=text(ele[i]);
        this.element.insertBefore(ele[i].element, this.items[index].element);
        this.items.splice(index, 0, ele[i]);
      }
    return this;
  }
  // Attributes
  setAttr(name, value) {
    this.element.setAttribute(name, value);
    Object.assign(this.cache.attributes, Object.fromEntries([[name, value]]));
    return this;
  }
  removeAttr(name) {
    this.element.removeAttribute(name);
    return this;
  }
  setContentEditable(bool = true) {
    this.setAttr("contenteditable", bool);
    return this;
  }
  get children() {
    return [...this.element.children];
  }
  get cloneElement() {
    return this.element.cloneNode(true);
  }
  setClasses(...value) {
    this.setAttr("class", value.join(" "));
    return this;
  }
  get Classes(){
    const classes=this.element.getAttribute("class");
    return classes===null?[]:classes.split(" ");
  }
  addClass() {
    /*this.setAttr("class", value);
        return this;*/
  }
  setId(Id) {
    this.element.setAttribute("id", Id);
    return this;
  }
  get Id() {
    return this.element.getAttribute("id");
  }
  forEach(callback){
    this.items.forEach(callback);
    return this;
  }
  where(condition_callback,if_callback,else_callback){
    this.items.filter(condition_callback).forEach(if_callback)
    return this;
  }
  filter(condition){
    return this.items.filter(condition);
  }
  filterByTextContent(text,exactMatch=false){
    this.items.map(n=>n.render());
    this.items.filter(n=>{
      const content=n.element.textContent;
      return !(exactMatch?content===text:content.includes(text))
    }).map(n=>n.render(false));
     return this;
  }
  filterByClass(value) {
    this.items.map(n=>n.render());
    this.items.filter(n=>!n.Classes.includes(value)).map(n=>n.render(false));
    return this; 
  }
  sortByTextContent(value, displays) {
    let item = this.children;
    item
      .filter((n) => !n.textContent.toLowerCase().includes(value.toLowerCase()))
      .map((n) => {
        n.style.display = "none";
      });
    item
      .filter((n) => n.textContent.toLowerCase().includes(value.toLowerCase()))
      .map((n, i) => (n.style.display = displays[i]));
    //return item.filter(n=>n.style.display!="none")
    item.filter((n) => n.style.display != "none");
    return this;
  }
  onPtrMove(...callbacks){
    if(!this.events.ptr)this.events.ptr = Pointer(this);
    this.events.ptr.onMove(...callbacks);
    return this;
  }
  onPtrDown(...callbacks){
    if(!this.events.ptr)this.events.ptr = Pointer(this);
    this.events.ptr.onDown(...callbacks);
    return this;
  }
  onPtrUp(...callbacks){
    if(!this.events.ptr)this.events.ptr = Pointer(this);
    this.events.ptr.onUp(...callbacks);
    return this;
  }
  onPtrEnter(...callbacks){
    if(!this.events.ptr)this.events.ptr = Pointer(this);
    this.events.ptr.onEnter(...callbacks);
    return this;
  }
  onPtrLeave(...callbacks){
    if(!this.events.ptr)this.events.ptr = Pointer(this);
    this.events.ptr.onLeave(...callbacks);
    return this;
  }
  onPtrOut(...callbacks){
    if(!this.events.ptr)this.events.ptr = Pointer(this);
    this.events.ptr.onOut(...callbacks);
    return this;
  }
  onMouseMove(...callbacks){
    if(!this.events.mouse)this.events.mouse = Mouse(this);
    this.events.mouse.onMove(...callbacks);
    return this;
  }
  onMouseDown(...callbacks){
    if(!this.events.mouse)this.events.mouse = Mouse(this);
    this.events.mouse.onDown(...callbacks);
    return this;
  }
  onMouseUp(...callbacks){
    if(!this.events.mouse)this.events.mouse = Mouse(this);
    this.events.mouse.onUp(...callbacks);
    return this;
  }
  onMouseEnter(...callbacks){
    if(!this.events.mouse)this.events.mouse = Mouse(this);
    this.events.mouse.onEnter(...callbacks);
    return this;
  }
  onMouseLeave(...callbacks){
    if(!this.events.mouse)this.events.mouse = Mouse(this);
    this.events.mouse.onLeave(...callbacks);
    return this;
  }
  onMouseOut(...callbacks){
    if(!this.events.mouse)this.events.mouse = Mouse(this);
    this.events.mouse.onOut(...callbacks);
    return this;
  }
  onWheel(...callbacks){
    if(!this.events.wheel)this.events.wheel = Wheel(this);
    this.events.wheel.onWheel(...callbacks);
    return this;
  }
  onKeyDown(...callbacks){
    if(!this.events.key)this.events.key = Key(this);
    this.events.key.onDown(...callbacks);
    return this;
  }
  onKeyPress(...callbacks){
    if(!this.events.key)this.events.key = Key(this);
    this.events.key.onPress(...callbacks);
    return this;
  }
  onKeyUp(...callbacks){
    if(!this.events.key)this.events.key = Key(this);
    this.events.key.onUp(...callbacks);
    return this;
  }
  onKeysDown({keys=[],callback}={}){
    if(!this.events.key)this.events.key = Key(this);
    this.events.key.handleSuccessifKeys({keys,callback});
    return this;
  }
  onDragStart(...callbacks){
    if(!this.events.drag)this.events.drag = Drag(this);
    this.events.drag.onStart(...callbacks);
    return this;
  }
  onDrag(...callbacks){
    if(!this.events.drag)this.events.drag = Drag(this);
    this.events.drag.onDrag(...callbacks);
    return this;
  }
  onDragEnd(...callbacks){
    if(!this.events.drag)this.events.drag = Drag(this);
    this.events.drag.onEnd(...callbacks);
    return this;
  }
  onDrop(...callbacks){
    if(!this.events.drop)this.events.drop = Drop(this);
    this.events.drop.onDrop(...callbacks);
    return this;
  }
  onClick(...callbacks){
    if(!this.events.click)this.events.click = Click(this);
    this.events.click.onClick(...callbacks);
    return this;
  }
  onDbClick(...callbacks){
    if(!this.events.click)this.events.click = Click(this);
    this.events.click.onDbClick(...callbacks);
    return this;
  }
  onCopy(...callbacks){
    if(!this.events.clipboard)this.events.clipboard = Clipboard(this);
    this.events.clipboard.onCopy(...callbacks);
    return this;
  }
  onCut(...callbacks){
    if(!this.events.clipboard)this.events.clipboard = Clipboard(this);
    this.events.clipboard.onCut(...callbacks);
    return this;
  }
  onPaste(...callbacks){
    if(!this.events.clipboard)this.events.clipboard = Clipboard(this);
    this.events.clipboard.onPaste(...callbacks);
    return this;
  }
  onSelect(...callbacks){
    if(!this.events.clipboard)this.events.clipboard = Clipboard(this);
    this.events.clipboard.onSelect(...callbacks);
    return this;
  }
  onFocus(...callbacks){
    if(!this.events.focus)this.events.focus = Focus(this);
    this.events.focus.onFocus(...callbacks);
    return this;
  }
  onBlur(...callbacks){
    if(!this.events.focus)this.events.focus = Focus(this);
    this.events.focus.onFocus(...callbacks);
    return this;
  }
  on(event_name,...callbacks){
    if(!this.events.custom)this.events.custom = customEvent(this);
    this.events.custom.on(event_name,...callbacks);
    return this;
  }
  emit(event_name,detail={}){
    if(!this.events.custom)this.events.custom = customEvent(this);
    this.events.custom.emit(event_name,detail);
    return this;
  }
  WatchAttributes(){

  }
  WatchChildren(){

  }
  WatchSize(callback){
    if(!this.observer.resize)this.observer.resize = WatchSize(this,callback);
    this.observer.resize.start();
    return this;
  }
  WatchIntersection(callback,config){
    if(!this.observer.intersection)this.observer.intersection = WatchIntersection(this,callback,config);
    this.observer.intersection.start();
    return this;
  }
  get VisibleArea() {
    let coords = this.element.getBoundingClientRect();
    let windowHeight = globalThis.document.documentElement.clientHeight;
    let windowWidth = globalThis.document.documentElement.clientWidth;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    let leftVisible = coords.left > 0 && coords.left < windowWidth;
    let rightVisible = coords.right > 0 && coords.right < windowWidth;
    return {
      top: topVisible,
      bottom: bottomVisible,
      left: leftVisible,
      right: rightVisible,
      heightRatio: (coords.height + coords.y) / coords.height,
      isVisible: topVisible || bottomVisible || rightVisible || leftVisible,
    };
  }
  setFullScreen(set = true, e) {
    if(!this.element.requestFullscreen){
      console.error("Fullscreen API is not supported in this browser.");
      return this;
    }
    if (set) this.element.requestFullscreen(e);
    else globalThis.document.exitFullscreen();
    return this;
  }
  toggleFullScreen(e) {
    if (!globalThis.document.fullscreenElement) this.element.requestFullscreen(e);
    else globalThis.document.exitFullscreen();
    return this;
  }
  toPdf(){
    if(__ZikoPdf__){

    }
    return this;
  }
}
export default ZikoUIElement;
