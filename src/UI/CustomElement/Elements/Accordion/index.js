import ZikoUIElement from "../../../ZikoUIElement";
import { ZikoUIFlex } from "../../Flex";
import { html } from "../../../Misc";
class ZikoUIAccordion extends ZikoUIElement{
    constructor(summary,content,icon="😁"){
        super("details","Accordion")
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
        this.append(this.summary,this.content);
        this.style({
            marginBottom:"0.7em",
        })
        this.render();
    }
    get isOpen(){
        return this.element.open;
    }
    open(){
        this.element.open=true;
        return this;
    }
    onOpen(callback){
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
class ZikoUIAccordions extends ZikoUIFlex{
    constructor(){
        super();
    }
    addPair(controller,details){

    }
}
 
const Accordion=(summary,content,icon)=>new ZikoUIAccordion(summary,content,icon);
export{
    Accordion
}

// Watch open using Mutation observer 