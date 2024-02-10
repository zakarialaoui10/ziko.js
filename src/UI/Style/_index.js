import { style , addSuffixeToNumber } from "../Utils/index.js";
//import { addSuffixeToNumber } from "../Utils.js";
export function styleComposer(){
    return {
      style:function(styles,{target = "parent", maskVector = null } = {}){
        if (target === "parent" || target === 0) {
            style(this.element, styles);
        }
        else if(target === "parent" || target === 0){
          if (maskVector) {
            this.items.map((n, i) => maskVector[i] == 1 && n.style(styles));
          } 
          else this.items.map((n) => n.style(styles));      
        }
        return this;
      },
      // Css
      setCss:function(css) {
        this.element.style.cssText = css;
        return this;
      },
      addCss:function(css) {
        this.element.style.cssText += css;
        return this;
      },
      // Dimensions
      size:function(w,h,{ target, maskVector } = {}){
        this.width(w,{ target, maskVector });
        this.height(h,{ target, maskVector });
        return this;
      },
      width:function(w,{ target, maskVector } = {}){
        if(w instanceof Object){
          if(w instanceof Array)w={min:w[0],max:w[1]}
          if("min" in w || "max" in w){
            let min= w.min ?? w.max;
            let max= w.max ?? w.min;
            min=addSuffixeToNumber(min,"px");
            max=addSuffixeToNumber(max,"px"); 
            this.style({ minWidth: min, maxWidth: max }, { target, maskVector });
          }
        }
        else {
          w=addSuffixeToNumber(w,"px");
          this.style({width:w},{ target, maskVector });
        }
        return this
      },
      height:function(h,{ target, maskVector } = {}){
        if(h instanceof Object){
          if(h instanceof Array)h={min:h[0],max:h[1]}
          if("min" in h || "max" in h){
            let min= h.min ?? h.max;
            let max= h.max ?? h.min;
            min=addSuffixeToNumber(min,"px");
            max=addSuffixeToNumber(max,"px"); 
            this.style({ minHeight: min, maxHeight: max }, { target, maskVector });
          }
        }
        else {
          h=addSuffixeToNumber(h,"px");
          this.style({height:h},{ target, maskVector });
        }
        return this
      },
      
      // // Box Model 
      // border:function(border = "1px solid red", { target, maskVector } = {}){
      //   this.style({border}, { target, maskVector });
      //   return this;
      // },
      // borderRadius:function(radius,{ target, maskVector } = {}){
      //   radius=addSuffixeToNumber(radius,"px");
      //   this.style({ borderRadius: radius }, { target, maskVector });
      //   return this;
      // },
      // margin:function(margin,{ target, maskVector } = {}){
      //   margin=addSuffixeToNumber(margin,"px");
      //   this.style({ margin }, { target, maskVector });
      //   return this;
      // },
      // padding:function(padding,{ target, maskVector } = {}){
      //   padding=addSuffixeToNumber(padding,"px");
      //   this.style({padding},{ target, maskVector });
      //   return this;
      // },
      // // Placement 
      // position:function(position,{ target, maskVector } = {}){
      //   this.style({position},{ target, maskVector });
      //   return this
      // },
      // display:function(disp, { target, maskVector } = {}) {
      //   this.style({ display: disp }, { target, maskVector });
      //   return this;
      // },
      // zIndex:function(z,{ target, maskVector } = {}){
      //   this.style({zIndex:z},{ target, maskVector });
      //   return this;
      // },
      // float:function(float, { target, maskVector } = {}) {
      //   this.style({ float: float }, { target, maskVector });
      //   return this;
      // },
      // // Apparences 
      // color:function(color,{ target, maskVector } = {}){
      //   this.style({color},{ target, maskVector });
      //   return this;
      // },
      // background:function(background,{ target, maskVector } = {}){
      //   this.style({background},{ target, maskVector });
      //   return this;
      // },
      // opacity:function(opacity, { target, maskVector } = {}) {
      //   this.style({ opacity }, { target, maskVector });
      //   return this;
      // },
      
      
      // hide:function({after, target, maskVector } = {}){
      //   if(typeof after==="number")setTimeout(() => this.hide({target,maskVector}), after);
      //   else {
      //     this.cache.isHidden=true;
      //     this.style({display:"none"},{target,maskVector});
      //   }
      //   return this;
      // },
      // show:function({after, target, maskVector } = {}){
      //   if(typeof after==="number")setTimeout(() => this.show({target,maskVector}), after);
      //   else {
      //     this.cache.isHidden=false;
      //     this.style({display:""},{target,maskVector});
      //   }
      //   return this;
      // },
      
      // cursor:function(type="pointer"){
      //   this.style({ cursor: type });
      //   return this;
      // },
      // overflow:function(x,y,{ target, maskVector } = {}){
      //   const values=["hidden","auto"];
      //   this.style({
      //     overflowX:typeof x==="number"?values[x]:x,
      //     overflowY:typeof y==="number"?values[y]:y
      //   },{target,maskVector})
      //   return this;
      // },
      // clip:function(polygon, { target, maskVector } = {}) {
      //   if (typeof polygon === "string") polygon = "polygon(" + polygon + ")";
      //   this.style({ clipPath: polygon }, { target, maskVector });
      //   return this;
      // },

      // fadeOut:function(t = 1) {
      //   this.style({ 
      //     transition: t/1000 + "s", 
      //     opacity: 0 
      //   });
      //   this.cache.isFaddedOut=true;
      //   return this;
      // },
      // fadeIn:function(t = 1) {
      //   this.style({ 
      //     transition: t/1000 + "s", 
      //     opacity: 1 
      //   });
      //   this.cache.isFaddedOut=false;
      //   return this;
      // },
      // toggleFade:function(t_in = 1000,t_out=t_in){
      //   this.cache.isFaddedOut?this.fadeIn(t_in):this.fadeOut(t_out);
      //   return this;
      // },
      // translateX:function(px, t = 0) {
      //   this.style({ transform: "translateX(" + px + "px)" });
      //   if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
      //   return this;
      // },
      // translateY:function(px, t = 0) {
      //   this.style({ transform: "translateY(" + px + "px)" });
      //   if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
      //   return this;
      // },
      // translate:function(x, y = x, t = 0) {
      //   this.style({ transform: `translate( ${x}px , ${y}px )`});
      //   if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
      //   return this;
      // },
      // rotateX:function(deg, t = 0) {
      //   this.style({ transform: "rotateX(" + deg + "deg)" });
      //   if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
      //   return this;
      // },
      // rotateY:function(deg, t = 0) {
      //   this.style({ transform: "rotateY(" + deg + "deg)" });
      //   if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
      //   return this;
      // },
      // rotateZ:function(deg, t = 0) {
      //   this.style({ transform: "rotateZ(" + deg + "deg)" });
      //   if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
      //   return this;
      // },
      // flipeX:function({ t = 1 } = {}) {
      //   this.cache.transformation.Flip[0] += 180;
      //   this.cache.transformation.Flip[0] %= 360;
      //   this.style({
      //     transform: "rotateX(" + this.cache.transformation.Flip[0] + "deg)",
      //     transition: "all " + t + "s ease",
      //   });
      //   return this;
      // },
      // flipeY:function(t = 1) {
      //   this.cache.transformation.Flip[1] += 180 ;
      //   this.cache.transformation.Flip[1] %= 360;
      //   this.style({
      //     transform: "rotateY(" + this.cache.transformation.Flip[1] + "deg)",
      //     transition: "all " + t + "s ease",
      //   });
      //   return this;
      // },
      // flipeZ:function(t = 1) {
      //   this.cache.transformation.Flip[2] += 180;
      //   this.cache.transformation.Flip[2] %= 360;
      //   this.style({
      //     transform: "rotateZ(" + this.cache.transformation.Flip[2] + "deg)",
      //     transition: "all " + t + "s ease",
      //   });
      //   return this;
      // },
      // slideHeightIn:function(t = 1, h = this.h) {
      //   this.style({ transition: t + "s", height: h });
      //   return this;
      // },
      // slideHeightOut:function(t = 1) {
      //   this.style({ transition: t + "s", height: 0 });
      //   this.element.addEventListener("transitionend", () =>
      //     this.style({ opacity: "none" }),
      //   );
      //   return this;
      // },
      // slideWidthIn:function(t = 1, w = this.w) {
      //   this.style({ transition: t + "s", width: w });
      //   return this;
      // },
      // slideWidthOut:function(t = 1) {
      //   this.style({ transition: t + "s", width: 0 });
      //   this.element.addEventListener("transitionend", () =>
      //     this.style({ opacity: "none" }),
      //   );
      //   return this;
      // },
      // slideIn:function({ t = 1, w = "100%", h = "auto" } = {}) {
      //   this.style({
      //     transition: t + "s",
      //     width: w,
      //     height: h,
      //     visibility: "visible",
      //   });
      //   return this;
      // },
      // slideOut:function({ t = 1, width = 0, height = 0 } = {}) {
      //   this.style({
      //     visibility: "hidden",
      //     transition: t + "s",
      //     opacity: "none",
      //     width: width,
      //     height: height,
      //   });
      //   this.element.addEventListener("transitionend", () => {
      //     this.style({ opacity: "none" });
      //     console.log(1);
      //   });
      //   return this;
      // }
      
    }
  }


export default styleComposer;