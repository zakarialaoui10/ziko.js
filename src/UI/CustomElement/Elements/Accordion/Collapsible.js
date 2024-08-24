import ZikoUIElement from "../../../ZikoUIElement";
import { ZikoUIFlex } from "../../Flex";
import { html } from "../../../Misc";
class ZikoUICollapbsible extends ZikoUIElement{
    constructor(summary,content,icon="😁"){
        super("details","Collapsible")
        this.summary=html("summary",summary).style({
            fontSize:"1.1em",
            padding:"0.625rem",
            fontWeight:"bold",
            listStyleType:`"${icon}"`,
            cursor:"pointer",
        });
        this.summary[0].style({
            marginLeft:"0.5em",
        })
        this.content=content.style({
            margin:"0.7em",
        });
        this.element.append(this.summary.element,this.content.element)
        this.style({
            marginBottom:"0.7em",
        })
    }
    get isOpen(){
        return this.element.open;
    }
    open(details=this){
        this.element.open=true;
        this.emit("open",details)
        return this;
    }
    onOpen(callback){
        this.on("open",()=>{
            
            callback();
        })
        return this;
    }
    close(){
        this.element.open=true;
        return this;
    }
    onClose(callback){
        return this;
    }
    toggle(){
        this.element.open=!this.element.open;
        return this;
    }
}

 
const Collapsible=(summary,content,icon)=>new ZikoUICollapbsible(summary,content,icon);
export{
    Collapsible
}

// Watch open using Mutation observer 