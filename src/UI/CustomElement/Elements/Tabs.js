// Next 
// Previous
// Vertical 
// Horizontal
import { Flex, ZikoUIFlex } from "../Flex";
class ZikoUITabs extends ZikoUIFlex{
    constructor(Controllers,Contents){
        super();
        this.style({
            boxSizing:"border-box",
            backgroundColor: "blanchedalmond",
            border:"1px red solid",
            margin:"30px"
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

                backgroundColor:"darkslategrey"
            })
        )
        this.Controller=this.items[0];
        this.Content=this.items[1];
        if(Controllers.length!==Contents.length)console.error("")
        else {
            this.Controller.append(...Controllers);
            this.Content.append(...Contents)
        }
        this.setDefault(0);
    }
    addPairs(ControllerItem,ContentItem){
        this.Controller.append(ControllerItem);
        this.Content.append(ContentItem);
        return this;
    }
    setDefault(index){
        this.Content.forEach(n=>n.remove());
        this.Content[index].render();
        return this;
    }
    display(index){
        this.Content.forEach(n=>n.remove());
        this.Content[index].render();
        return this;   
    }
    next(){

    }
    previous(){

    }
    useHorizontalSwipe(){

    }
    useVerticalSwipe(){

    }
}

const Tabs=(Controllers,Contents)=>new ZikoUITabs(Controllers,Contents)
export {Tabs}