import ZikoUIElement from "../../primitives/ZikoUIElement.js";
import { html } from "../../primitives/misc/index.js";
import { watchAttr } from "../../../../reactivity/index.js";
class ZikoUICollapbsible extends ZikoUIElement{
    constructor(summary,content,openIcon="😁", closeIcon=openIcon){
        super("details","Collapsible")
        Object.assign(this.cache,{
            icons:{
                open : openIcon,
                close : closeIcon
            }
        })
        this.summary=html("summary",summary).style({
            fontSize:"1.1em",
            padding:"0.625rem",
            fontWeight:"bold",
            listStyleType:`"${openIcon}"`,
            cursor:"pointer",
        });
        this.summary[0].style({
            marginLeft:"0.5em",
        })
        this.content=content.style({
            margin:"0.7em",
        });
        this.element?.append(this.summary.element,this.content.element)
        this.style({
            marginBottom:"0.7em",
        })
        watchAttr(this, e=>{
            if(e.target.isOpen){
                e.target.emit("open");
                if(this?.parent?.isAccordion){
                    if(this.parent.cache.autoClose)this.parent.closeExcept(this);
                }
                this.summary.style({
                    listStyleType:`"${this.cache.icons.close}"`
                })
            }
            else{
                e.target.emit("close");
                this.summary.style({
                    listStyleType:`"${this.cache.icons.open}"`
                })
            }
        })
    }
    get isCollapsible(){
        return true;
    }
    get isOpen(){
        return this.element.open;
    }
    open(details=this){
        this.element.open=true;
        this.emit("open",details)
        return this;
    }
    close(){
        this.element.open=false;
        return this;
    }
    onOpen(callback){
        this.on("open", callback)
        return this;
    }
    onClose(callback){
        this.on("close", callback)
        return this;
    }
    toggle(){
        this.element.open=!this.element.open;
        return this;
    }
}

 
const Collapsible=(summary, content, openIcon, closeIcon)=>new ZikoUICollapbsible(summary,content,openIcon, closeIcon);
export{
    Collapsible
}

