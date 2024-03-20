// Next 
// Previous
// Vertical 
// Horizontal
import { Flex, ZikoUIFlex } from "../../Flex";
class ZikoUITabs extends ZikoUIFlex{
    #ACTIVE_ELEMENT_INDEX=0;
    constructor(Controllers,Contents){
        super("div","Tabs");
        this.style({
            boxSizing:"border-box",
            backgroundColor: "blanchedalmond",
            border:"1px red solid",
            margin:"30px",
        })
        this.append(
            Flex().size("auto","auto").style({
                boxSizing:"border-box",
                justifyContent:"center",
                alignItems:"center",
                textAlign:"center",

                minWidth:"50px",
                minHeight:"50px",

                backgroundColor:"darkblue",
                border:"1px darkblue solid",

            }),
            Flex().style({
                boxSizing:"border-box",
                justifyContent:"center",
                alignItems:"center",
                textAlign:"center",

                width:"100%",
                height:"100%",
                backgroundColor:"darkslategrey",
            })
        )
        this.Controller=this.items[0].setAttr("role","tablist");
        this.Content=this.items[1];
        if(Controllers.length!==Contents.length)console.error("")
        else {
            this.Controller.append(...Controllers);
            this.Content.append(...Contents);
            // Add transition
        }
        this.init()
        this.display(0);
    }
    init(){  
        // Remove old listener
        for(let i=0;i<this.Controller.length;i++){
            this.Controller[i].setAttr("role","tab").setAttr("aria-controls",`tab${i}`);
            this.Content[i].setAttr("role","tabpanel").setAttr("aria-labelledby",`tab${i}`).setAttr("tabindex",-1);
        }
        this.Controller.forEach(item=>item.onClick(e=>{
            const tab=e.target.element.getAttribute("aria-controls");
            const index=+tab.slice(3)
            this.Content.filter(n=>n.element.getAttribute("aria-labelledby")===tab,()=>{
                if(this.#ACTIVE_ELEMENT_INDEX!==index)this.display(index);
            })
        }))
        return this;
    }
    addPairs(ControllerItem,ContentItem){
        this.Controller.append(ControllerItem);
        this.Content.append(ContentItem);
        const length=this.Controller.length;
        this.Controller.at(-1).setAttr("role","tab").setAttr("aria-controls",`tab${length-1}`);
        this.Content.at(-1).setAttr("role","tabpanel").setAttr("aria-labelledby",`tab${length-1}`).setAttr("tabindex",-1);
        // Add listener
        return this;
    }
    removePairs(index){

    }
    display(index){
        this.#ACTIVE_ELEMENT_INDEX=index%this.Content.length;
        this.Controller.forEach(n=>n.setAttr("tabindex",-1).setAttr("aria-selected",false));
        this.Controller.at(this.#ACTIVE_ELEMENT_INDEX).setAttr("tabindex",0).setAttr("aria-selected",true);
        (async ()=>{
           await this.Content.forEach(n=>n.st.hide());
           await this.Content.at(this.#ACTIVE_ELEMENT_INDEX).setAttr("tabindex",0).st.show();
        })()

        return this;   
    }
    next(i=1){
        this.display(this.#ACTIVE_ELEMENT_INDEX+i);
        return this;
    }
    previous(i=1){
        this.display(this.#ACTIVE_ELEMENT_INDEX-i);
        return this;
    }
    useHorizontalSwippe(){
        this.onPtrDown();
        this.onPtrUp(e=>this.next(Math.sign(e.swippe.delta_x)));
        return this;
    }
    useVerticalSwippe(){
        this.onPtrDown();
        this.onPtrUp(e=>this.next(Math.sign(e.swippe.delta_y)));
        return this;
    }
}

const Tabs=(Controllers,Contents)=>new ZikoUITabs(Controllers,Contents)
export {Tabs}