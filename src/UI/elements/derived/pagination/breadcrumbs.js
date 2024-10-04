import ZikoUIElement from "../../primitives/ZikoUIElement.js";
import { html } from "../../primitives/misc/index.js";
import { text } from "../../primitives/text/index.js";
class ZikoUIBreadcrumbs extends ZikoUIElement{
    constructor(...items){
        super("ul", "Breadcrumbs")
        Object.assign(this.cache,{
            separatorTextContent:"/"
        })
        this.style({
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap"  
        })
        this.list=html('li').style({
            display: "flex",
            flexWrap: "wrap"
        });
        this.append(...items);
    }
    #addItem(item){
        if(["string","number","boolean"].includes(typeof item))item = text(item);
        const li = html("li", item).style({
            display: "flex",
            alignItems: "center"   
        });
        if(this.element.children.length>0){
            const separator = text(this.cache.separatorTextContent).style({
                padding: "0 4px"
            });
            this.element?.append(separator.element);
        }
        this.element?.append(li.element);
    }
    append(...items){
        items.forEach(n=>this.#addItem(n));
        return this;
    }
    configSeparator(separatorTextContent = this.cache.separator, style = {}){
        this.cache.separatorTextContent = separatorTextContent;
        const separators = [...this.element.children].filter(n=>n.tagName==="SPAN");
        separators.forEach(node=>{
            node.textContent = separatorTextContent;
            Object.assign(node.style, style);
        }
        );
        return this;
    }
}
const Breadcrumbs=(...items)=>new ZikoUIBreadcrumbs(...items);
export{
    Breadcrumbs,
    ZikoUIBreadcrumbs
}