// Next 
// Previous
// Vertical 
// Horizontal
import ZikoUIElement from "../../ZikoUIElement";
import { Flex, ZikoUIFlex } from "../Flex";
class ZikoUITabs extends ZikoUIFlex{
    constructor(Controllers,Conntents){
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
        this.Conntent=this.items[1]
    }
    addPairs(Controller,Content){

    }
}

const Tabs=()=>new ZikoUITabs()
export {Tabs}