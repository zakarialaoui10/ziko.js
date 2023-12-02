import { style , addSuffixeToNumber, waitElm } from "../Utils/index.js";
class ZikoUIElementStyle{
    constructor(defaultStyle={}){
        this.target=null;
        this.styles=new Map(
            [["default",defaultStyle]]
        );
        this.cache={
            isHidden:false,
            isFaddedOut:false,
            transformation:{
                Flip:[0,0,0]
            }
        }
    }
    style(styles,{target = "parent", maskVector = null } = {}){
        if (target === "parent" || target === 0)style(this.target.element, styles);
        else if(target === "parent" || target === 0){
          if (maskVector) {
            this.items.map((n, i) => maskVector[i] == 1 && n.style(styles));
          } 
          else this.items.map((n) => n.style(styles));      
        }
        return this;
      }
    linkTo(target){
        this.target=target;
        return this;
    }
    use(name="default"){
        this.style(this.styles.get(name));
        return this;
    }
    update(name,styles){
        const old=this.styles.get(name);
        old?this.styles.set(name,Object.assign(old,styles)):this.styles.set(name,styles);
        return this;
    }
    add(name,styles){
        this.styles.set(name,styles);
        return this;
    }
    replace(name,styles){
        this.styles.set(name,styles);
        return this;
    }
    delete(...names){
        names.forEach(n=>this.styles.delete(n));
        return this;
    }
    updateDefaultStyle(){
        const defaultStyle=Object.fromEntries(
            Object.entries(this.target.element.style).filter(n=>isNaN(+n[0]))
        )   
        this.update("default",defaultStyle);
        return this;
    }
    hover(styles){
        //this.updateDefaultStyle()
        if(styles)this.add("hover",styles)
        this.target.element.addEventListener("pointerenter",()=>this.use("hover"));
        this.target.element.addEventListener("pointerleave",()=>this.use("default"))
        return this;
    }
    // Size
    size(width,height,{ target, maskVector } = {}){
        this.style({
            width,
            height
        },{ target, maskVector })
        return this;
    }
    width(w,{ target, maskVector } = {}){
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
    }
    height(h,{ target, maskVector } = {}){
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
    }    
    // Apparence
    hide({after, target, maskVector } = {}){
        if(typeof after==="number"){
            const wrapper=()=>this.hide({target,maskVector})
            setTimeout(wrapper, after);
            clearTimeout(wrapper);
        }
        else {
          this.cache.isHidden=true;
          this.style({display:"none"},{target,maskVector});
        }
        return this;
    }
    show({after, target, maskVector } = {}){
        if(typeof after==="number"){
            const wrapper=()=>this.show({target,maskVector})
            setTimeout(wrapper, after);
            clearTimeout(wrapper);
        }
        else {
          this.cache.isHidden=false;
          this.style({display:""},{target,maskVector});
        }
        return this;
    }
    color(color,{ target, maskVector } = {}){
        this.style({color},{ target, maskVector });
        return this;
    }
    background(background,{ target, maskVector } = {}){
        this.style({background},{ target, maskVector });
        return this;
    }
    backgroundColor(backgroundColor,{ target, maskVector } = {}){
        this.style({backgroundColor},{ target, maskVector });
        return this;
    }
    opacity(opacity, { target, maskVector } = {}) {
        this.style({ opacity }, { target, maskVector });
        return this;
    }
    // Placement
    position(position,{ target, maskVector } = {}){
        this.style({position},{ target, maskVector });
        return this
    }
    display(disp, { target, maskVector } = {}) {
        this.style({ display: disp }, { target, maskVector });
        return this;
    }
    zIndex(z,{ target, maskVector } = {}){
        this.style({zIndex:z},{ target, maskVector });
        return this;
    }
    float(float, { target, maskVector } = {}) {
        this.style({ float: float }, { target, maskVector });
        return this;
    }
    // Box Model 
    border(border = "1px solid red", { target, maskVector } = {}){
        this.style({border}, { target, maskVector });
        return this;
    }
    borderTop(borderTop = "1px solid red", { target, maskVector } = {}){
        this.style({borderTop}, { target, maskVector });
        return this;
    }
    borderRight(borderRight = "1px solid red", { target, maskVector } = {}){
        this.style({borderRight}, { target, maskVector });
        return this;
    }
    borderBottom(borderBottom = "1px solid red", { target, maskVector } = {}){
        this.style({borderBottom}, { target, maskVector });
        return this;
    }
    borderLeft(borderLeft = "1px solid red", { target, maskVector } = {}){
        this.style({borderLeft}, { target, maskVector });
        return this;
    }
    borderRadius(radius,{ target, maskVector } = {}){
        radius=addSuffixeToNumber(radius,"px");
        this.style({ borderRadius: radius }, { target, maskVector });
        return this;
    }
    margin(margin,{ target, maskVector } = {}){
        margin=addSuffixeToNumber(margin,"px");
        this.style({ margin }, { target, maskVector });
        return this;
    }
    marginTop(marginTop,{ target, maskVector } = {}){
        marginTop=addSuffixeToNumber(marginTop,"px");
        this.style({marginTop},{ target, maskVector });
        return this;
    }
    marginRight(marginRight,{ target, maskVector } = {}){
        marginRight=addSuffixeToNumber(marginRight,"px");
        this.style({marginRight},{ target, maskVector });
        return this;
    }
    marginBootom(marginBootom,{ target, maskVector } = {}){
        marginBootom=addSuffixeToNumber(marginBootom,"px");
        this.style({marginBootom},{ target, maskVector });
        return this;
    }
    marginLeft(marginLeft,{ target, maskVector } = {}){
        marginLeft=addSuffixeToNumber(marginLeft,"px");
        this.style({marginLeft},{ target, maskVector });
        return this;
    }
    padding(padding,{ target, maskVector } = {}){
        padding=addSuffixeToNumber(padding,"px");
        this.style({padding},{ target, maskVector });
        return this;
    }
    paddingTop(paddingTop,{ target, maskVector } = {}){
        paddingTop=addSuffixeToNumber(paddingTop,"px");
        this.style({paddingTop},{ target, maskVector });
        return this;
    }
    paddingRight(paddingRight,{ target, maskVector } = {}){
        paddingRight=addSuffixeToNumber(paddingRight,"px");
        this.style({paddingRight},{ target, maskVector });
        return this;
    }
    paddingBootom(paddingBootom,{ target, maskVector } = {}){
        paddingBootom=addSuffixeToNumber(paddingBootom,"px");
        this.style({paddingBootom},{ target, maskVector });
        return this;
    }
    paddingLeft(paddingLeft,{ target, maskVector } = {}){
        paddingLeft=addSuffixeToNumber(paddingLeft,"px");
        this.style({paddingLeft},{ target, maskVector });
        return this;
    }
    // Typographie
    font(font,{ target, maskVector } = {}){
        this.style({font},{ target, maskVector });
        return this;
    }
    fontFamily(fontFamily="",{ target, maskVector } = {}){
        this.style({fontFamily},{ target, maskVector });
        return this;
    }
    fontSize(fontSize,{ target, maskVector } = {}){
        this.style({fontSize},{ target, maskVector });
        return this;
    }
    // Misc
    cursor(type="pointer"){
        this.style({ cursor: type });
        return this;
    }  
    overflow(x,y,{ target, maskVector } = {}){
        const values=["hidden","auto"];
        this.style({
          overflowX:typeof x==="number"?values[x]:x,
          overflowY:typeof y==="number"?values[y]:y
        },{target,maskVector})
        return this;
    }
    clip(polygon, { target, maskVector } = {}) {
        if (typeof polygon === "string") polygon = "polygon(" + polygon + ")";
        this.style({ clipPath: polygon }, { target, maskVector });
        return this;
    }
    // Transfromations
    fadeOut(t = 1) {
        this.style({ 
          transition: t/1000 + "s", 
          opacity: 0 
        });
        this.cache.isFaddedOut=true;
        return this;
    }
    fadeIn(t = 1) {
        this.style({ 
          transition: t/1000 + "s", 
          opacity: 1 
        });
        this.cache.isFaddedOut=false;
        return this;
    }
    toggleFade(t_in = 1000,t_out=t_in){
        this.cache.isFaddedOut?this.fadeIn(t_in):this.fadeOut(t_out);
        return this;
    }
    translateX(px, t = 0) {
        this.style({ transform: "translateX(" + px + "px)" });
        if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
        return this;
    }
    translateY(px, t = 0) {
        this.style({ transform: "translateY(" + px + "px)" });
        if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
        return this;
    }
    translate(x, y = x, t = 0) {
        this.style({ transform: `translate( ${x}px , ${y}px )`});
        if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
        return this;
    }
    rotateX(deg, t = 0) {
        this.style({ transform: "rotateX(" + deg + "deg)" });
        if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
        return this;
    }
    rotateY(deg, t = 0) {
        this.style({ transform: "rotateY(" + deg + "deg)" });
        if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
        return this;
    }
    rotateZ(deg, t = 0) {
        this.style({ transform: "rotateZ(" + deg + "deg)" });
        if (t != 0) this.style({ transition: `transform ${t/1000}s ease` });
        return this;
    }
    flipeX({ t = 1 } = {}) {
        this.cache.transformation.Flip[0] += 180;
        this.cache.transformation.Flip[0] %= 360;
        this.style({
          transform: "rotateX(" + this.cache.transformation.Flip[0] + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
    }
    flipeY(t = 1) {
        this.cache.transformation.Flip[1] += 180 ;
        this.cache.transformation.Flip[1] %= 360;
        this.style({
          transform: "rotateY(" + this.cache.transformation.Flip[1] + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
      }
    flipeZ(t = 1) {
        this.cache.transformation.Flip[2] += 180;
        this.cache.transformation.Flip[2] %= 360;
        this.style({
          transform: "rotateZ(" + this.cache.transformation.Flip[2] + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
    }
    slideHeightIn(t = 1, h = this.h) {
        this.style({ transition: t + "s", height: h });
        return this;
    }
    slideHeightOut(t = 1) {
        this.style({ transition: t + "s", height: 0 });
        this.target.element.addEventListener("transitionend", () =>
          this.style({ opacity: "none" }),
        );
        return this;
      }
    slideWidthIn(t = 1, w = this.w) {
        this.style({ transition: t + "s", width: w });
        return this;
    }
    slideWidthOut(t = 1) {
        this.style({ transition: t + "s", width: 0 });
        const wrapper=()=>{
            this.style({ opacity: "none" })
        }
        this.target.element.addEventListener("transitionend",wrapper);
        this.target.element.removeEventListener("transitionend",wrapper);
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
        const wrapper=()=>{
            this.style({ opacity: "none" });
        }
        this.target.element.addEventListener("transitionend",wrapper);
        this.target.element.removeEventListener("transitionend",wrapper);
        return this;
    }
      
}

const ZikoStyle=(defaultStyle)=>new ZikoUIElementStyle(defaultStyle);
export{
    ZikoStyle
}