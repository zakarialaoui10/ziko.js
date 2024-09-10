import { Flex,ZikoUIFlex } from "../../Flex";
import ZikoUIElement from "../../../ZikoUIElement";
import { palette } from "./palette";
import { text } from "../../../Text";
import { h3 } from "../../../Text";
class ZikoUIAlert extends ZikoUIFlex{
    constructor(type, title, content){
        super()
        this.title = h3(title);
        this.icon = text(palette[type].icon).style({
          display: "flex",
          justifyContent:"center",
          borderRadius:"50%",
          minWidth:"30px",
          minHeight:"30px",
        });
        this.content = content;
        this.vertical()
        .size("200px", "auto")
        .style({ 
          borderRadius:"10px",
          padding:"10px"
        });
        this.append(
          Flex(
            this.title,
            this.icon
          ).size("100%", "40px").style({}).horizontal("space-between",0),
          this.content
        )
        this.useType(type);
    }
    get isAlert(){
      return true;
    }
    useType(type){
      this.style({
        color:palette[type].color,
        background:palette[type].bgColor,
        border: `1px darkblue solid`,
        borderLeft: `15px ${palette[type].borderColor} solid`,
      })
      this.title.style({
        color:palette[type].titleColor
      });
      this.content.st.color(palette[type].titleColor)
      this.icon.setValue(palette[type].icon).style({
        border:`2px ${palette[type].borderColor} solid`,        
        alignItems: type==="warning"?"flex-start":"center",
      });
      return this;
    }
    useSuccess(){
      this.useType("success");
      return this;
    }
    useInfo(){
      this.useType("info");
      return this;
    }
    useWarning(){
      this.useType("warning");
      return this;
    }
    useDanger(){
      this.useType("danger");
      return this;
    }
}

const successAlert=(title, content)=>new ZikoUIAlert("success", title, content);
const infoAlert=(title, content)=>new ZikoUIAlert("info", title, content);
const warningAlert=(title, content)=>new ZikoUIAlert("warning", title, content);
const dangerAlert=(title, content)=>new ZikoUIAlert("danger", title, content);

export{
  successAlert,
  infoAlert,
  warningAlert,
  dangerAlert
}

