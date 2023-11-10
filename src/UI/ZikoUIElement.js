import { waitForUIElm, waitForUIElmSync } from "../Time/Utils/index.js";
import styleComposer from "./Style/index.js";
import { Pointer,Key } from "../Events/index.js"
import { WatchIntersection, WatchSize } from "../Reactivity/index.js";
import { text } from "./Text/index.js";
import { matrix } from "../Math/Matrix/index.js";
class ZikoUIElement {
  constructor(element = document.body) {
    this.Target = Ziko.Target || document.body;
    if (typeof element === "string") element = document.createElement(element);
    this.element = element;
    Object.assign(this, styleComposer.call(this));
    this.cache = {
      isHidden: false,
      isFrozzen:false,
      isFaddedOut:false,
      transformMatrix:matrix([
        [0,0,0],
        [0,0,0],
        [1,1,0]
      ]),
      style: {},
      attributes: {},
      filters: {},
      transformation:{
        Flip:[0,0,0]
      }
    };
    this.items = [];
    this.events = {
      ptr:null,
      key:null,
      drag:null
    }
    this.observer={
      resize:null,
      intersection:null
    }
    this.style({ position: "relative" });
    this.size("auto", "auto");
  }
  clone() {
    const UI = new this.constructor();
    const items = [...this.items]
    return {
      UI:UI.append(...items),
      items
    }
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
    this.Target = tg;
    this.render();
    return this;
  }
  render(render = true , target = this.Target) {
    if(target instanceof ZikoUIElement)target=target.element;
    this.Target=target;
    if(render) {
      this.Target.appendChild(this.element);
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
        this.element.appendChild(ele[i].element);
        ele[i].Target = this.element;
        this.items.push(ele[i]);
      } else if (ele[i] instanceof Object) {
        if (ele[i]?.style) this.style(ele[i]?.style);
        if (ele[i]?.attr) {
          Object.entries(ele[i].attr).forEach((n) =>
            this.setAttribute("" + n[0], n[1]),
          );
        }
      }
    }
    this.maintain();
    return this;
  }
  remove(...ele) {
    if(ele.length==0){
      if(this.Target.children.length) this.Target.removeChild(this.element);
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
  setAttribute(name, value) {
    this.element.setAttribute(name, value);
    Object.assign(this.cache.attributes, Object.fromEntries([[name, value]]));
    return this;
  }
  removeAttribute(name) {
    this.element.setAttribute(name);
    return this;
  }
  setContentEditable(bool = true) {
    this.setAttribute("contenteditable", bool);
    return this;
  }
  // link(link, target = "") {
  //   let a = document.createElement("a");
  //   a.setAttribute("href", link);
  //   if (target) a.setAttribute("target", target);
  //   this.element.addEventListener("click", () => a.click());
  //   this.element.style.cursor = "pointer";
  //   return this;
  // }
  get children() {
    return [...this.element.children];
  }
  get cloneElement() {
    return this.element.cloneNode(true);
  }
  // toggle() {
  //   this.cache.isHidden ? this.show() : this.hide();
  //   return this;
  // }
  get styleObject() {
    //let borderPlus
    return Object.fromEntries(
      Object.entries(this.element.style).filter(
        (n) => n[1] != "" && n[1] !== "initial" && isNaN(+n[0]),
      ),
    );
  }
  // backgroundColor(background = "#EEEEEE", { target, maskVector } = {}) {
  //   this.style({ backgroundColor: background }, { target, maskVector });
  //   return this;
  // }
  // backgroundImage(
  //   src,
  //   { repeat = "no-repeat", blendMode = "normal", target, maskVector } = {},
  // ) {
  //   if (src instanceof Array) src = src.map((n) => "url(" + n + ")").join(",");
  //   else src = "url(" + src + ")";
  //   //console.log(src)
  //   this.style(
  //     {
  //       backgroundImage: src,
  //       backgroundRepeat: repeat,
  //       backgroundSize: "cover",
  //       backgroundBlendMode: blendMode,
  //     },
  //     { target, maskVector },
  //   );
  //   return this;
  // }
  // backgroundGradient(colors, { target, maskVector, type = "linear" } = {}) {
  //   if (colors instanceof Array) {
  //     if (colors.length === 1) colors[1] = colors[0];
  //     colors = colors.join(",");
  //   }
  //   this.style(
  //     {
  //       background: type + "-gradient(" + colors + ")",
  //     },
  //     { target, maskVector },
  //   );
  //   return this;
  // }
  // colorGradient(colors, { target, maskVector, type = "linear" } = {}) {
  //   if (colors instanceof Array) {
  //     if (colors.length === 1) colors[1] = colors[0];
  //     colors = colors.join(",");
  //   }
  //   var webkit = "-webkit-" + type + "-gradient(" + colors + ")";
  //   this.style(
  //     {
  //       background: webkit,
  //       webkitBackgroundClip: "text",
  //       webkitTextFillColor: "transparent",
  //     },
  //     { target, maskVector },
  //   );
  //   return this;
  // }
  // shadow(shadow = "", { target, maskVector } = {}) {
  //   this.style({ textShadow: "1px 1px 1px " + shadow }, { target, maskVector });
  //   return this;
  // }
  // boxShadow(shadow = "", { target, maskVector } = {}) {
  //   this.style({ boxShadow: "2px 2px 10px " + shadow }, { target, maskVector });
  //   return this;
  // }
  // cssFilter(filter, { target, maskVector } = {}) {
  //   this.style({ filter: filter }, { target, maskVector });
  //   return this;
  // }
  // font(f = "italic bold 20px arial,serif", { target, maskVector } = {}) {
  //   this.style({ font: f }, { target, maskVector });
  //   return this;
  // }
  // fontSize(size = "20px", { target, maskVector } = {}) {
  //   this.style({ fontSize: size }, { target, maskVector });
  //   return this;
  // }
  // fontFamily(n = "Serif", { target, maskVector } = {}) {
  //   if (typeof n == "number") {
  //     switch (n) {
  //       case 0:
  //         this.style({ fontFamily: "Serif" }, { target, maskVector });
  //         break;
  //       case 1:
  //         this.style({ fontFamily: "Sans-Serif" }, { target, maskVector });
  //         break;
  //       case 2:
  //         this.style({ fontFamily: "Monospace" }, { target, maskVector });
  //         break;
  //       case 3:
  //         this.style({ fontFamily: "Cursive" }, { target, maskVector });
  //         break;
  //       case 4:
  //         this.style({ fontFamily: "Fantasy" }, { target, maskVector });
  //         break;
  //       default:
  //         break;
  //     }
  //   } else this.style({ fontFamily: n }, { target, maskVector });
  //   return this;
  // }
  setClasses(...value) {
    this.setAttribute("class", value.join(" "));
    return this;
  }
  get Classes(){
    const classes=this.element.getAttribute("class");
    return classes===null?[]:classes.split(" ");
  }
  addClass() {
    /*this.setAttribute("class", value);
        return this;*/
  }
  setId(Id) {
    this.element.setAttribute("id", Id);
    return this;
  }
  get Id() {
    return this.element.getAttribute("id");
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
  // on(event, calback, { target = "parent", maskVector = null } = {}) {
  //   if (target === "parent" || target === 0)
  //     this.element.addEventListener(event, calback);
  //   else if (target === "children" || target === 1) {
  //     if (maskVector) {
  //       this.items.map(
  //         (n, i) =>
  //           maskVector[i] == 1 && n.element.addEventListener(event, calback),
  //       );
  //     } else this.items.map((n) => n.element.addEventListener(event, calback));
  //   }
  // }
  // onClick(calback, { target = "parent", maskVector = null } = {}) {
  //   this.on("click", calback, { target, maskVector });
  //   return this;
  // }
  // onDbclick(calback, { target = "parent", maskVector = null } = {}) {
  //   this.on("dbclick", calback, { target, maskVector });
  //   return this;
  // }
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
  
  // onKeypress(calback) {
  //   this.element.addEventListener("keypress", calback);
  //   return this;
  // }
  // onKeydown(calback) {
  //   this.element.addEventListener("keydown", calback);
  //   return this;
  // }
  // onKeyup(calback) {
  //   this.element.addEventListener("keyup", calback);
  //   return this;
  // }
  // get key() {
  //   return event.key;
  // }
  // get keyCode() {
  //   return event.keyCode;
  // }
  // get Event() {
  //   return event;
  // }
  // handleSuccessifKeys(keys, calback) {
  //   keys = keys.reverse();
  //   const newkeys = new Array(keys.length).fill(null);
  //   const addsub = (arr, item, length = keys.length) => {
  //     arr.unshift(item);
  //     arr.length = length;
  //   };
  //   this.keydown(() => {
  //     addsub(newkeys, this.key);
  //     if (newkeys.comp(keys)) {
  //       this.preventDefault();
  //       calback();
  //       newkeys.fill(null);
  //     }
  //   });
  //   return this;
  // }
  // preventDefault() {
  //   return this.Event.preventDefault();
  // }
  // preventCopy() {
  //   this.keydown(() => {
  //     if (this.Event.ctrlKey && this.key == "c") this.preventDefault();
  //   });
  // }
  // preventPaste() {
  //   this.keydown(() => {
  //     if (this.Event.ctrlKey && this.key == "v") this.preventDefault();
  //   });
  // }
  // preventCut() {
  //   this.keydown(() => {
  //     if (this.Event.ctrlKey && this.key == "x") this.preventDefault();
  //   });
  // }
  // preventSelect() {
  //   this.onKeydown(() => {
  //     if (this.Event.ctrlKey && this.key == "a") this.preventDefault();
  //   });
  // }
  // draggable(bool = true) {
  //   this.element.setAttribute("draggable", bool);
  //   return this;
  // }
  // get center() {
  //   this.style({
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   });
  //   return this;
  // }
  // get Css_3d_obj() {
  //   return null;
  //   //return new THREE.CSS3DObject(this.element);
  // }
  //VisibleArea
  get Visible_area() {
    //let bodyCoords=document.body.getBoundingClientRect();
    let coords = this.element.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let windowWidth = document.documentElement.clientWidth;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    let leftVisible = coords.left > 0 && coords.left < windowWidth;
    let rightVisible = coords.right > 0 && coords.right < windowWidth;
    //return topVisible || bottomVisible;
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
  allowDrop(ev) {
    ev.preventDefault();
  }
  drag(ev) {
    ev.dataTransfer.setData("text", ev.Target.id);
  }
  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.Target.appendChild(document.getElementById(data));
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
  resizeObserver(calback) {
    var observer = new ResizeObserver((element) => calback(element));
    return observer.observe(this.element);
  }
  intersectionObserver(calback, target = "parent") {
    if (target == "parent") {
      var observer = new IntersectionObserver((element) => calback(element[0]));
      return observer.observe(this.element);
    }
    return this.items.map((n) => n.intersectionObserver((e) => calback(e)));
  }
  intersectRatio(calback) {
    var observer = new IntersectionObserver((element) =>
      calback(element[0].intersectionRatio),
    );
    return observer.observe(this.element);
  }
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

//window.ZikoUIElement=ZikoUIElement
//export{Root,waitForUIElm}
export default ZikoUIElement;
