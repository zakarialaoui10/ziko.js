import ZikoUIContainerElement from "../../primitives/ZikoUIContainerElement.js";
class ZikoUIAccordion extends ZikoUIContainerElement{
    constructor(...Collapsible){
        super("div", "Accordion")
        this.append(...Collapsible);
        Object.assign(this.cache,{
            autoClose : true
        })
    }
    get isAccordion(){
        return true;
    }
    closeAll(){
        this.items.forEach(n=>n.close());
        return this;
    }
    closeExcept(...Collapsibles){
        this.items.filter(n=>!Collapsibles.includes(n)).forEach(n=>n.close())
        return this;
    }
    open(CollapsibleOrIndex){
        CollapsibleOrIndex.isCollapsible? CollapsibleOrIndex.open(): this.items[CollapsibleOrIndex].open();
        this.closeExcept(CollapsibleOrIndex.isCollapsible? CollapsibleOrIndex: this.items[CollapsibleOrIndex]);
        return this;
    }
    enableAutoClose(){
        this.cache.autoClose = true;
        return this;
    }
    disableAutoClose(){
        this.cache.autoClose = false;
        return this;
    }
    toggleAutoClose(){
        this.cache.autoClose = !this.cache.autoClose;
    }
}
const Accordion = (... Collapsible) => new ZikoUIAccordion(...Collapsible);
export{
    Accordion,
    ZikoUIAccordion
}
