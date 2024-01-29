import styleComposer from "./Style/index.js";
import { ZikoStyle } from "./Style/style.js";
import { 
  Pointer, 
  Key, 
  Drag , 
  Drop, 
  Click , 
  Clipboard ,
  Focus,
  CustomEvent,
} from "../Reactivity/Events/index.js"
import { 
  WatchIntersection, 
  WatchSize 
} from "../Reactivity/index.js";
import { text } from "./Text/index.js";
import { matrix } from "../Math/Matrix/index.js";
import { Random } from "../Math/Random/index.js";
class ZikoUIElement {
  constructor(element ) {
    this.target = document.body;
    if (typeof element === "string") element = document.createElement(element);
    this.element = element;
    Object.assign(this, styleComposer.call(this));
    this.uuid=this.constructor.name+"-"+Random.string(10);
    this.cache = {
      isRoot:false,
      isHidden: false,
      isFrozzen:false,
      transformMatrix:matrix([
        [0,0,0],
        [0,0,0],
        [1,1,0]
      ]),
      style: ZikoStyle({}),
      attributes: {},
      filters: {},
      
    };
    this.items = [];
    this.events = {
      ptr:null,
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
  get __app__(){
    if(this.cache.isRoot)return this;
    let root=this.parent;
    while(1){
      if(!root)return null;
      if(root.cache.isRoot)return root;
      root=root.parent;
    }
  }
  clone() {
    // Not working For Table 
    const UI = new this.constructor();
    UI.__proto__=this.__proto__;
    if(this.items.length){
      const items = [...this.items].map(n=>n.clone());
      UI.append(...items);
    }
    else UI.element=this.element.cloneNode(true);
    return UI;
    // return {
    //   UI,
    //   items
    // }
  }
  get Width(){
    return this.element.getBoundingClientRect().width;
  }
  get Height(){
    return this.element.getBoundingClientRect().height;
  }
  get Top(){
    return this.element.getBoundingClientRect().top;
  }
  get Right(){
    return this.element.getBoundingClientRect().right;
  }
  get Bottom(){
    return this.element.getBoundingClientRect().bottom;
  }
  get Left(){
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
  append(...ele) {
    if(this.cache.isFrozzen){
      console.warn("You can't append new item to frozzen element");
      return this;
    }
    for (let i = 0; i < ele.length; i++){
    if(["number","string"].includes(typeof ele[i]))ele[i]=text(ele[i]);
      if (ele[i] instanceof ZikoUIElement) {
        ele[i].parent=this;
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
      if(this.target.children.length && [...this.target.children].includes(this.element)) this.target.removeChild(this.element);
    }
    else {
      const remove = (ele) => {
        if(typeof ele === "number") ele=this.items[ele];
        if(ele instanceof ZikoUIElement)this.element.removeChild(ele.element);
          this.items=this.items.filter(n=>n!==ele);
      };
      for (let i = 0; i < ele.length; i++) remove(ele[i]);
      for (let i = 0; i < this.items.length; i++)
        Object.assign(this, { [[i]]: this.items[i] });
    }
    return this;
  }
  removeAfter(t = 1) {
    setTimeout(() => this.remove(), t);
    return this;
  }
  removeItem(...ele) {
    const remove = (ele) => {
      if (ele instanceof ZikoUIElement) this.element.removeChild(ele.element);
      else if (typeof ele === "number")
        this.element.removeChild(this.element.children[ele]);
    };
    for (let i = 0; i < ele.length; i++) remove(ele[i]);
    for (let i = 0; i < this.items.length; i++)
      Object.assign(this, { [[i]]: this.items[i] });
    return this;
  }
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
  // get styleObject() {
  //   //let borderPlus
  //   return Object.fromEntries(
  //     Object.entries(this.element.style).filter(
  //       (n) => n[1] != "" && n[1] !== "initial" && isNaN(+n[0]),
  //     ),
  //   );
  // }
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
  useTheme(theme){
    //thme
  }
  forEach(callback){
    this.items.forEach(callback);
    return this;
  }
  filter(condition_callback,if_callback,else_callback){
    this.items.filter(condition_callback).forEach(if_callback)
    return this;
  }
  filterByTextContent(text,exactMatch=false){
    this.items.map(n=>n.render());
    this.items.filter(n=>{
      const content=n.element.textContent
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
    if(!this.events.custom)this.events.custom = CustomEvent(this);
    this.events.custom.on(event_name,...callbacks);
    return this;
  }
  emit(event_name,detail={}){
    if(!this.events.custom)this.events.custom = CustomEvent(this);
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
    let windowHeight = document.documentElement.clientHeight;
    let windowWidth = document.documentElement.clientWidth;
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

  
  toggleSlide() {}

  
  
  scaleX(sc, t = 1) {
    this.style({
      transform: "scaleX(" + sc + ")",
      transition: "all " + t + "s ease",
    });
    return this;
  }
  scaleY(sc, t = 1) {
    this.style({
      transform: "scaleY(" + sc + ")",
      transition: "all " + t + "s ease",
    });
    return this;
  }
  skewX(deg, t = 1) {
    this.style({
      transform: "skewX(" + deg + "deg)",
      transition: "all " + t + "s ease",
    });
    return this;
  }
  skewY(deg, t = 1) {
    this.style({
      transform: "skewY(" + deg + "deg)",
      transition: "all " + t + "s ease",
    });
    return this;
  }
  skew(x, y, t = 1) {
    this.style({
      transform: "skew(" + x + "deg , " + y + "deg)",
      transition: "all " + t + "s ease",
    });
    return this;
  }
  scale(x, y = x, t = 1) {
    this.style({
      transform: "scale(" + x + "," + y + ")",
      transition: "all " + t + "s ease",
    });
    return this;
  }
  resize(n = 0) {
    switch (n) {
      case 0:
        this.style({ resize: "none" });
        break;
      case 1:
        this.style({ resize: "horizontal" });
        break;
      case 2:
        this.style({ resize: "vertical" });
        break;
      case 3:
        this.style({ resize: "both" });
        break;
      default:
        this.style({ resize: n });
    }
    return this;
  }
  Glassmorphism(background = "rgba(255,255,255,0.1)", blur = "1px") {
    this.style({ background: background, backdropFilter: blur });
    return this;
  }
  Neumorphism(r = "50px", bg = "cyan", box = "13px -13px 49px #5d8fac") {
    this.style({ borderRadius: r, background: bg, boxShadow: box });
    return this;
  }

  fullScreen(set = true, e) {
    if (set) this.element.requestFullscreen(e);
    else document.exitFullscreen();
    return this;
  }
  toggleFullScreen(e) {
    if (!document.fullscreenElement) this.element.requestFullscreen(e);
    else document.exitFullscreen();
    return this;
  }
  // resizeObserver(calback) {
  //   var observer = new ResizeObserver((element) => calback(element));
  //   return observer.observe(this.element);
  // }
  // intersectionObserver(calback, target = "parent") {
  //   if (target == "parent") {
  //     var observer = new IntersectionObserver((element) => calback(element[0]));
  //     return observer.observe(this.element);
  //   }
  //   return this.items.map((n) => n.intersectionObserver((e) => calback(e)));
  // }
  // intersectRatio(calback) {
  //   var observer = new IntersectionObserver((element) =>
  //     calback(element[0].intersectionRatio),
  //   );
  //   return observer.observe(this.element);
  // }
  get coords() {
    var rect = this.element.getBoundingClientRect();
    var parent = {
      cX: Math.floor(rect.left + (rect.right - rect.left) / 2),
      cY: Math.floor(rect.top + (rect.bottom - rect.top) / 2),
    };
    return { parent };
  }
  exportHTML() {}
  toPdf() {
    return "Install @ziko/jspdf";
  }
}
export default ZikoUIElement;
