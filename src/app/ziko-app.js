import ZikoUIElement from "../ui/elements/primitives/ZikoUIElement.js";
class ZikoApp {
    constructor({head, layout, target}){

    }
    init({head,layout,target}){
        
        
    }
    setTarget(target){
        if(target instanceof HTMLElement) this.target = target;
        else if (typeof target === "string") this.target = globalThis?.document?.querySelector(target);
        return this;
    }
    setLayout(ui){
        if(ui instanceof ZikoUIElement) this.ui = ui;
        else if(typeof ui === "function") this.ui = ui();
        return this;
    }
    setHead(head){
        if(head instanceof ZikoHead) this.head = head;
        else this.head = useHead(head);
        return this;  
    }
    
}
const App = ({head, layout, target}) => new ZikoApp({head, layout, target})
export{
    ZikoApp,
    App
}