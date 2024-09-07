import { ZikoUIFlex } from "../../Flex.js"
class ZikoUIMenu3d extends ZikoUIFlex{
    constructor(controller, content){
        super("div", "menu3d")
        this.controller = controller;
        this.content = content;
        this.append(
            this.controller,
            this.content
        )
        // this.vertical(0,0)
        this.init()
    }
    init(){
        this.controller.style({
            display:"none",
            padding:"20px",
            // overflow:"auto",
            background:"#333",
            color: "#eee",
            webkitboxSizing: "border-box",
            mozBoxSizing: "border-box",
	        boxSizing:"border-box",
        });
        this.content.style({
            padding:"20px 40px",
            width: "100%",
            height: "100%",
            // overflowY:"auto",
            background:"#333",
            color: "#eee",
            webkitboxSizing: "border-box",
            mozBoxSizing: "border-box",
	        boxSizing:"border-box",
            webkitOverflowScrolling:"touch",
            webkitTransformStyle: "preserve-3d"
        });
    }
}
const menu3d = (controller, content) => new ZikoUIMenu3d(controller, content);
globalThis.menu3d = menu3d;
export{
    menu3d,
    ZikoUIMenu3d
}