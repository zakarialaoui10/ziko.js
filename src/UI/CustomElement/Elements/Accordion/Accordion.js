import ZikoUIContainerElement from "../../../ZikoUIContainerElement";
import { Collapsible } from "./Collapsible";
class ZikoUIAccordion extends ZikoUIContainerElement{
    constructor(...Collapsible){
        super("div", "Accordion")
        this.append(...Collapsible)
    }
    closeAll(){
        this.items.forEach(n=>n.close());
        return this;
    }
    open(index){
        this.closeAll();
        this.items[index].open()
    }
}
const Accordion = (... Collapsible) => new ZikoUIAccordion(...Collapsible);
window.Accordion = Accordion

export{
    Accordion
}
