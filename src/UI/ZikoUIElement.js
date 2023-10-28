//import {waitForUIElm, waitForUIElmSync } from "./Utils.js";
//import domComposer from "./Composer/dom.js"
//import {styleComposer} from "./Composer/style.js"
class ZikoUIElement {
    #Flip=[0,0,0];
    constructor(element=document.body) {
      this.Target = Ziko.Target || document.body;
      if(typeof element==="string")element=document.createElement(element);
      this.element = element;
      Object.assign(this,styleComposer.call(this));
      Object.assign(this,domComposer.call(this));
      this.cache={
        isHidden:false,
        style:{
        },
        attributes:{},
        events:{},
        filters:{
          
        }
      }
      this.items = [];
      this.hooks={
        states:{

        }
      }
      this.style({ position: "relative" });
      this.size("auto", "auto");
      //waitForUIElm(this).then(()=>Object.assign(this.cache.filters,{display:this.element.style.display}));
      var ele=waitForUIElmSync(this,1000);
      //console.log(ele)
      //this.maintain()
    } 
    /*size(w,h){
        typeof w == "number" ? (this.w = w + "vw") : (this.w = w);
        typeof h == "number" ? (this.h = h + "vh") : (this.h = h);
        this.style({width:this.w,height:this.h});
      }*/
    clone() {
      //const a = new ZikoUIElement(this.element.cloneNode(true));
      //a.element.style=this.element.style
      const clonedUI=new this.constructor()
      a.render(true);
      return clonedUI;
    }
   /* append(...ele) {
      for (let i = 0; i < ele.length; i++)
      if(ele[i] instanceof ZikoUIElement){
        this.element.appendChild(ele[i].element);
        ele[i].Target=this.element
        this.items.push(ele[i]);
      }   
      else if(ele[i] instanceof Object){
        if(ele[i]?.style)this.style(ele[i]?.style);
        if(ele[i]?.attr){
          Object.entries(ele[i].attr).forEach(n=>this.setAttribute(""+n[0],n[1]))
        }
      }     
      for(let i=0;i<this.items.length;i++)Object.assign(this,{[[i]]:this.items[i]})
      return this;
    }*/
    // insertAt(index, ...ele) {
    //   if (index >= this.element.children.length) this.append(...ele);
    //   else
    //     for (let i = 0; i < ele.length; i++)
    //       this.element.insertBefore(ele[i].element, this.items[index].element);
    //   return this;
    // }
    link(link, target = "") {
      let a = document.createElement("a");
      a.setAttribute("href", link);
      if (target) a.setAttribute("target", target);
      this.element.addEventListener("click", () => a.click());
      this.element.style.cursor = "pointer";
      return this;
    }
    // removeItem(...ele) {
    //   const remove = (ele) => {
    //     if (ele instanceof ZikoUIElement) this.element.removeChild(ele.element);
    //     else if (typeof ele === "number")
    //       this.element.removeChild(this.element.children[ele]);
    //   };
    //   for (let i = 0; i < ele.length; i++) remove(ele[i]);
    //   return this;
    // }
    // setTarget(tg) {
    //   if (tg instanceof ZikoUIElement) tg = tg.element;
    //   this.remove();
    //   this.Target = tg;
    //   this.render();
    //   return this;
    // }
    // render(bool = true) {
    //   if (bool) this.Target.appendChild(this.element);
    //   else this.remove();
    //   return this;
    // }
    // remove() {
    //   if (this.Target.children.length) this.Target.removeChild(this.element);
    //   return this;
    // }
    // toggle() {
    //   this.cache.isHidden ? this.show() : this.hide();
    //   return this;
    // }
    // removeAfter(t = 1) {
    //   setTimeout(() => this.remove(), t);
    //   return this;
    // }
    get children() {
      return [...this.element.children];
    }
    get cloneElement() {
      return this.element.cloneNode(true);
    }
    toggle() {
      this.cache.isHidden ? this.show() : this.hide();
      return this;
  }
    /*
    style(stl, { target = "parent", maskVector = null } = {}) {
      if (target === "parent" || target === 0) {
        style(this.element, stl);
        Object.assign(this.cache.style,stl)
      }
      else if (target === "children" || target === 1) {
        if (maskVector) {
          this.items.map((n, i) => maskVector[i] == 1 && n.style(stl));
        } else this.items.map((n) => n.style(stl));
      }
      return this;
    }
    */
    get styleObject() {
      //let borderPlus
      return Object.fromEntries(
        Object.entries(this.element.style).filter(
          (n) => n[1] != "" && n[1] !== "initial" && isNaN(+n[0])
        )
      );
    }
    // setCss(css) {
    //   this.element.style.cssText = css;
    //   return this;
    // }
    // addCss(css) {
    //   this.element.style.cssText += css;
    //   return this;
    // }
    backgroundColor(background = "#EEEEEE", { target, maskVector } = {}) {
      this.style({ backgroundColor: background }, { target, maskVector });
      return this;
    }
    backgroundImage(
      src,
      { repeat = "no-repeat", blendMode = "normal", target, maskVector } = {}
    ) {
      if (src instanceof Array) src = src.map((n) => "url(" + n + ")").join(",");
      else src = "url(" + src + ")";
      //console.log(src)
      this.style(
        {
          backgroundImage: src,
          backgroundRepeat: repeat,
          backgroundSize: "cover",
          backgroundBlendMode: blendMode,
        },
        { target, maskVector }
      );
      return this;
    }
    backgroundGradient(colors, { target, maskVector, type = "linear" } = {}) {
      if (colors instanceof Array) {
        if (colors.length === 1) colors[1] = colors[0];
        colors = colors.join(",");
      }
      this.style(
        {
          background: type + "-gradient(" + colors + ")",
        },
        { target, maskVector }
      );
      return this;
    }
    colorGradient(colors, { target, maskVector, type = "linear" } = {}) {
      if (colors instanceof Array) {
        if (colors.length === 1) colors[1] = colors[0];
        colors = colors.join(",");
      }
      var webkit = "-webkit-" + type + "-gradient(" + colors + ")";
      this.style(
        {
          background: webkit,
          webkitBackgroundClip: "text",
          webkitTextFillColor: "transparent",
        },
        { target, maskVector }
      );
      return this;
    }
    shadow(shadow = "", { target, maskVector } = {}) {
      this.style({ textShadow: "1px 1px 1px " + shadow }, { target, maskVector });
      return this;
    }
    boxShadow(shadow = "", { target, maskVector } = {}) {
      this.style({ boxShadow: "2px 2px 10px " + shadow }, { target, maskVector });
      return this;
    }
    /*
    clip(polygon, { target, maskVector } = {}) {
      if (typeof polygon === "string") polygon = "polygon(" + polygon + ")";
      this.style({ clipPath: polygon }, { target, maskVector });
      return this;
    }
    
    overflow(x, y, { target, maskVector } = {}) {
      let value = Ziko.Math.Permutation.withDiscount(["hidden", "auto"]);
      let index = Ziko.Math.bin2dec(+(x + "" + y));
      //console.log(value,index)
      let valueX = value[index][0];
      let valueY = value[index][1];
      this.style(
        { overflowX: valueX, overflowY: valueY },
        { target, maskVector }
      );
      return this;
    }
    */
    /*display(disp, { target, maskVector } = {}) {
      this.style({ display: disp }, { target, maskVector });
      return this;
    }*/
    cssFilter(filter, { target, maskVector } = {}) {
      this.style({ filter: filter }, { target, maskVector });
      return this;
    }
    /*float(float, { target, maskVector } = {}) {
      this.style({ float: float }, { target, maskVector });
      return this;
    }*/
    font(f = "italic bold 20px arial,serif", { target, maskVector } = {}) {
      this.style({ font: f }, { target, maskVector });
      return this;
    }
    fontSize(size = "20px", { target, maskVector } = {}) {
      this.style({ fontSize: size }, { target, maskVector });
      return this;
    }
    fontFamily(n = "Serif", { target, maskVector } = {}) {
      if (typeof n == "number") {
        switch (n) {
          case 0:
            this.style({ fontFamily: "Serif" }, { target, maskVector });
            break;
          case 1:
            this.style({ fontFamily: "Sans-Serif" }, { target, maskVector });
            break;
          case 2:
            this.style({ fontFamily: "Monospace" }, { target, maskVector });
            break;
          case 3:
            this.style({ fontFamily: "Cursive" }, { target, maskVector });
            break;
          case 4:
            this.style({ fontFamily: "Fantasy" }, { target, maskVector });
            break;
          default:
            break;
        }
      } else this.style({ fontFamily: n }, { target, maskVector });
      return this;
    }
    // contenteditable(bool = true) {
    //   this.setAttribute("contenteditable", bool);
    //   return this;
    // }
    // setAttribute(name, value) {
    //   this.element.setAttribute(name, value);
    //   Object.assign(this.cache.attributes,Object.fromEntries([[name,value]]))
    //   return this;
    // }
    // removeAttribute(name) {
    //   this.element.setAttribute(name);
    //   return this;
    // }
    setClass(value) {
      this.setAttribute("class", value);
      return this;
    }
    get Classes() {
      return this.element.getAttribute("class");
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
    filterByClass(value) {
      let n = 0;
      for (let i = 0; i < this.children.length; i++) {
        for (let j = 0; j < this.children[i].classList.length; j++) {
          if ([...this.children[i].classList][j] == value) n++;
        }
        if (n == 0) this.children[i].setAttribute("hidden", true);
        n = 0;
      }
    }
    // filterByTextContent(value) {
    //   let item = this.children;
    //   let displays=this.items.map(n=>n.cache.filters.display)
    //   item
    //     .filter(n => !n.textContent.toLowerCase().includes((""+value).toLowerCase()))
    //     .map(n =>n.style.display = "none");
    //   item
    //     .filter(n => n.textContent.toLowerCase().includes((""+value).toLowerCase()))
    //     .map((n, i) => (n.style.display = displays[i]));
    //   item.filter((n) => n.style.display != "none");
    //   return this;
    // }
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
    on(event, calback, { target = "parent", maskVector = null } = {}) {
      if (target === "parent" || target === 0)
        this.element.addEventListener(event, calback);
      else if (target === "children" || target === 1) {
        if (maskVector) {
          this.items.map(
            (n, i) =>
              maskVector[i] == 1 && n.element.addEventListener(event, calback)
          );
        } else this.items.map((n) => n.element.addEventListener(event, calback));
      }
    }
    onClick(calback, { target = "parent", maskVector = null } = {}) {
      this.on("click", calback, { target, maskVector });
      return this;
    }
    onDbclick(calback, { target = "parent", maskVector = null } = {}) {
      this.on("dbclick", calback, { target, maskVector });
      return this;
    }
    onMousedown(calback) {
      this.element.addEventListener("mousedown", calback);
      return this;
    }
    onMousemove(calback) {
      this.element.addEventListener("mousemove", calback);
      return this;
    }
    onMouseup(calback) {
      this.element.addEventListener("mouseup", calback);
      return this;
    }
    onMouseenter(calback) {
      this.element.addEventListener("mouseenter", calback);
      return this;
    }
    onMouseleave(calback) {
      this.element.addEventListener("mouseleave", calback);
      return this;
    }
    onMouseout(calback) {
      this.element.addEventListener("mouseout", calback);
      return this;
    }
    onMouseover(calback) {
      this.element.addEventListener("mouseover", calback);
      return this;
    }
    onTouchmove(calback) {
      this.element.addEventListener("touchmove", calback);
      return this;
    }
    onTouchup(calback) {
      this.element.addEventListener("touchup", calback);
      return this;
    }
    onPointermove(calback) {
      this.element.addEventListener("pointermove", calback);
      return this;
    }
    onPointerup(calback) {
      this.element.addEventListener("pointerup", calback);
      return this;
    }
    onPointerdown(calback) {
      this.element.addEventListener("pointerdown", calback);
      return this;
    }
    onPointerover(calback) {
      this.element.addEventListener("pointerover", calback);
      return this;
    }
    onPointerleave(calback) {
      this.element.addEventListener("pointerleave", calback);
      return this;
    }
    onPointerout(calback) {
      this.element.addEventListener("pointerout", calback);
      return this;
    }
    onPointerenter(calback) {
      this.element.addEventListener("pointerenter", calback);
      return this;
    }
  
    onKeypress(calback) {
      this.element.addEventListener("keypress", calback);
      return this;
    }
    onKeydown(calback) {
      this.element.addEventListener("keydown", calback);
      return this;
    }
    onKeyup(calback) {
      this.element.addEventListener("keyup", calback);
      return this;
    }
    get key() {
      return event.key;
    }
    get keyCode() {
      return event.keyCode;
    }
    get Event() {
      return event;
    }
    handleSuccessifKeys(keys, calback) {
      keys = keys.reverse();
      const newkeys = new Array(keys.length).fill(null);
      const addsub = (arr, item, length = keys.length) => {
        arr.unshift(item);
        arr.length = length;
      };
      this.keydown(() => {
        addsub(newkeys, this.key);
        if (newkeys.comp(keys)) {
          this.preventDefault();
          calback();
          newkeys.fill(null);
        }
      });
      return this;
    }
    preventDefault() {
      return this.Event.preventDefault();
    }
    preventCopy() {
      this.keydown(() => {
        if (this.Event.ctrlKey && this.key == "c") this.preventDefault();
      });
    }
    preventPaste() {
      this.keydown(() => {
        if (this.Event.ctrlKey && this.key == "v") this.preventDefault();
      });
    }
    preventCut() {
      this.keydown(() => {
        if (this.Event.ctrlKey && this.key == "x") this.preventDefault();
      });
    }
    preventSelect() {
      this.onKeydown(() => {
        if (this.Event.ctrlKey && this.key == "a") this.preventDefault();
      });
    }
    draggable(bool = true) {
      this.element.setAttribute("draggable", bool);
      return this;
    }
    get center() {
      this.style({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
      return this;
    }
    get Css_3d_obj() {
      return null;
      //return new THREE.CSS3DObject(this.element);
    }
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
    
    fadeOut(t = 1) {
      this.style({ transition: t + "s", opacity: 0 });
      return this;
    }
    fadeIn(t = 1) {
      this.style({ transition: t + "s", opacity: 1 });
      return this;
    }
    slideHeightIn(t = 1, h = this.h) {
      this.style({ transition: t + "s", height: h });
      return this;
    }
    slideHeightOut(t = 1) {
      this.style({ transition: t + "s", height: 0 });
      this.element.addEventListener("transitionend", () =>
        this.style({ opacity: "none" })
      );
      return this;
    }
    slideWidthIn(t = 1, w = this.w) {
      this.style({ transition: t + "s", width: w });
      return this;
    }
    slideWidthOut(t = 1) {
      this.style({ transition: t + "s", width: 0 });
      this.element.addEventListener("transitionend", () =>
        this.style({ opacity: "none" })
      );
      return this;
    }
    slideIn({ t = 1, w = "100%", h = "auto" } = {}) {
      this.style({
        transition: t + "s",
        width: w,
        height: h,
        visibility: "visible",
      });
      return this;
    }
    slideOut({ t = 1, width = 0, height = 0 } = {}) {
      this.style({
        visibility: "hidden",
        transition: t + "s",
        opacity: "none",
        width: width,
        height: height,
      });
      this.element.addEventListener("transitionend", () => {
        this.style({ opacity: "none" });
        console.log(1);
      });
      return this;
    }
    toggleSlide() {}
    translateX(px, t = 0) {
      this.style({ transform: "translateX(" + px + "px)" });
      if (t != 0) this.style({ transition: "all " + t + "s ease" });
      return this;
    }
    translateY(px, t = 0) {
      this.style({ transform: "translateY(" + px + "px)" });
      if (t != 0) this.style({ transition: "all " + t + "s ease" });
      return this;
    }
    translate(x, y = x, t = 0) {
      console.log(t);
      this.style({ transform: "translate(" + x + "px," + y + "px)" });
      return this;
    }
    rotateX(deg, { duration = 0 } = {}) {
      this.style({ transition: "all " + duration + "s ease" });
      this.style({ transform: "rotateX(" + deg + "deg)" });
      return this;
    }
    rotateY(deg, { duration = 0 } = {}) {
      this.style({ transition: "all " + duration + "s ease" });
      this.style({ transform: "rotateY(" + deg + "deg)" });
      return this;
    }
    rotateZ(deg, { duration = 0 } = {}) {
      this.style({ transition: "all " + duration + "s ease" });
      this.style({ transform: "rotateZ(" + deg + "deg)" });
      return this;
    }
    flipeX({ t = 1 } = {}) {
      this.#Flip[0] += 180;
      this.style({
        transform: "rotateX(" + this.#Flip[0] + "deg)",
        transition: "all " + t + "s ease",
      });
      return this;
    }
    flipeY(t = 1) {
      this.#Flip[1] += 180;
      this.style({
        transform: "rotateY(" + this.#Flip[1] + "deg)",
        transition: "all " + t + "s ease",
      });
      return this;
    }
    flipeZ(t = 1) {
      this.#Flip[2] += 180;
      this.style({
        transform: "rotateZ(" + this.#Flip[2] + "deg)",
        transition: "all " + t + "s ease",
      });
      return this;
    }
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
        calback(element[0].intersectionRatio)
      );
      return observer.observe(this.element);
    }
    get coords(){
      var rect=this.element.getBoundingClientRect()  
      var parent={
        cX:Math.floor(rect.left+(rect.right-rect.left)/2),
        cY:Math.floor(rect.top+(rect.bottom-rect.top)/2 )
      }
      return {parent}
    }
    exportHTML() {}
    toPdf() {
      var newWindow = window.open();
      var html = document.createElement("html");
      const head = document.head.cloneNode(true);
      const body = document.createElement("body");
      const section = this.element.cloneNode(true);
      console.log(section);
      body.appendChild(section);
      html.appendChild(head);
      html.appendChild(body);
      newWindow.document.write(html.innerHTML);
      newWindow.document.close();
      newWindow.print();
      newWindow.close();
      return this;
    }
  }
  class ZikoUIRoot extends ZikoUIElement {
    constructor() {
      super();
      this.element = document.body;
      window.addEventListener("resize", () => this.size());
    }
    size(w = window.innerWidth + "px", h = window.innerHeight + "px") {
      this.element.style.width = w;
      this.element.style.height = h;
      return this;
    }
    append(element) {
      this.element.appendChild(element.element);
      return this;
    }
  }
  const Root = (element) => new ZikoUIRoot().append(element);
  window.ZikoUIElement=ZikoUIElement
  export{Root,waitForUIElm}
  export default ZikoUIElement