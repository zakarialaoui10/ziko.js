import { ZikoUIElement } from "../UI/elements/primitives/ZikoUIElement.js";
import { 
    useHead,
    ZikoHead
 } from "../reactivity/hooks/Head/index.js";
import { useTitle } from "../reactivity/hooks/Head/index.js";
class ZikoApp {
    constructor({head, ui, target}){

    }
    init({head,ui,target}){
        
    }
    setTarget(target){
        if(target instanceof HTMLElement) this.target = target;
        else if (typeof target === "string") this.target = globalThis?.document?.querySelector(target);
        return this;
    }
    setUI(ui){
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