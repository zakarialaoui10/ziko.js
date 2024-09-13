// Next 
// Previous
// Vertical 
// Horizontal
import { Flex, ZikoUIFlex } from "../../Flex";
class ZikoUITabs extends ZikoUIFlex{
    #ACTIVE_ELEMENT_INDEX=0;
    constructor(Controllers,Contents){
        super("div","Tabs");
        Object.assign(this.cache,{
            config:{
                controllersPercent : .50
            }
        })
        this.style({
            boxSizing:"border-box",
            backgroundColor: "blanchedalmond",
            border:"1px red solid",
            margin:"30px",
        });
        this.controllersContainer = Flex().size("auto","auto").style({
            boxSizing:"border-box",
            justifyContent:"center",
            alignItems:"center",
            textAlign:"center",

            minWidth:"50px",
            minHeight:"50px",

            backgroundColor:"darkblue",
            border:"1px darkblue solid",

        }).setAttr("role","tablist")
        this.contentContainer = Flex().style({
            boxSizing:"border-box",
            justifyContent:"center",
            alignItems:"center",
            textAlign:"center",

            width:"100%",
            height:"100%",
            backgroundColor:"darkslategrey",
        })
        this.append(
            this.controllersContainer,
            this.contentContainer
        )
        if(Controllers.length!==Contents.length)console.error("")
        else {
            this.controllersContainer.append(...Controllers);
            this.contentContainer.append(...Contents);
        }
        this.init()
        this.display(0);
        this.useVertical()
    }
    get isTabs(){
        return true;
    }
    init(){  
        // Remove old listener
        for(let i=0;i<this.controllersContainer.length;i++){
            this.controllersContainer[i].setAttr("role","tab").setAttr("aria-controls",`tab${i}`);
            this.contentContainer[i].setAttr("role","tabpanel").setAttr("aria-labelledby",`tab${i}`).setAttr("tabindex",-1);
        }
        this.controllersContainer.forEach(item=>item.onClick(e=>{
            const tab=e.target.element.getAttribute("aria-controls");
            const index=+tab.slice(3)
            this.contentContainer.filter(n=>n.element.getAttribute("aria-labelledby")===tab,()=>{
                if(this.#ACTIVE_ELEMENT_INDEX!==index)this.display(index);
            })
        }))
        return this;
    }
    addPairs(ControllerItem,ContentItem){
        this.controllersContainer.append(ControllerItem);
        this.contentContainer.append(ContentItem);
        const length=this.controllersContainer.length;
        this.controllersContainer.at(-1).setAttr("role","tab").setAttr("aria-controls",`tab${length-1}`);
        this.contentContainer.at(-1).setAttr("role","tabpanel").setAttr("aria-labelledby",`tab${length-1}`).setAttr("tabindex",-1);
        // Add listener
        return this;
    }
    removePairs(index){

    }
    display(index){
        this.#ACTIVE_ELEMENT_INDEX=index%this.contentContainer.length;
        this.controllersContainer.forEach(n=>n.setAttr("tabindex",-1).setAttr("aria-selected",false));
        this.controllersContainer.at(this.#ACTIVE_ELEMENT_INDEX).setAttr("tabindex",0).setAttr("aria-selected",true);
        
        this.contentContainer.forEach(n=>n.st.hide());
        this.contentContainer.at(this.#ACTIVE_ELEMENT_INDEX).setAttr("tabindex",0).st.show();

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
    useVertical(){
        this.vertical(0,0);
        this.controllersContainer.horizontal(0,0)
        this.controllersContainer.style({
            width : "100%",
            height : `${this.cache.config.controllersPercent*100}%`
        });
        this.contentContainer.style({
            width : "100%",
            height : `${(1-this.cache.config.controllersPercent)*100}%`
        })
        return this;
    }
    useHorizontal(){
        this.horizontal(0,0);
        this.controllersContainer.vertical(0, 0)
        this.controllersContainer.style({
            height : "100%",
            width : `${this.cache.config.controllersPercent*100}%`
        });
        this.contentContainer.style({
            height : "100%",
            width : `${(1-this.cache.config.controllersPercent)*100}%`
        })
        return this;
    }
    // useHorizontalSwippe(){
    //     this.onPtrDown();
    //     this.onPtrUp(e=>this.next(Math.sign(e.swippe.delta_x)));
    //     return this;
    // }
    // useVerticalSwippe(){
    //     this.onPtrDown();
    //     this.onPtrUp(e=>this.next(Math.sign(e.swippe.delta_y)));
    //     return this;
    // }
}

const Tabs=(Controllers,Contents)=>new ZikoUITabs(Controllers,Contents)
export {Tabs}

/*

const cont=(txt = "A")=>btn(txt).style({width:"170px"})
a=Tabs(
  [cont("A1"),cont("A2"),cont("A3"),cont("A4")],
   [cont("A1"),cont("A2"),cont("A3"),cont("A4")]
).vertical().size("400px")
a.controllersContainer.style({
overflowX:"auto"
})
a.useHorizontal()

*/