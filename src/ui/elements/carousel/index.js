import { ZikoUIFlex } from "../flex";
import { Section } from "../semantic";
class ZikoUICarousel extends ZikoUIFlex{
    constructor(...ZikoUIElement){
        super()
        this.style({
            position:"relative",
            overflow:"hidden",
            touchAction:"none",
            userSelect:"none"
        });
        this.horizontal("space-around",0);
        this.track = Section(...ZikoUIElement).style({ display: "inline-flex" });
        this.track.size(this.track.children.length * 100 + "vw");
        this.track.setTarget(this);
        this.track.items.map((n) =>
          n.style({ pointerEvents: "none", margin: "auto 10px" })
        );
        this.x0 = null;
        this.tx = 0;
        this.onPtrMove(e=>{
            if(e.isDown){
                let x = e.event.pageX;
                let dx = x - this.x0;
                this.track.st.translateX(
                    this.tx + dx, 
                    0
                    );
              }
        })
        this.onPtrDown(e=>{
            console.log(e.event)
            this.x0 = e.event.pageX;
            const transformMatrix = window
              .getComputedStyle(this.track.element)
              .getPropertyValue("transform");
            if (transformMatrix !== "none") {
              this.tx = +transformMatrix.split(",")[4];
            }            
        })
        this.onPtrUp(e=>console.log(e.isDown));
        this.onPtrLeave(e=>{
            // Handle outside up 
        });
    }
    get isCarousel(){
        return true;
      }
}
const Carousel=(...ZikoUIElement)=>new ZikoUICarousel(...ZikoUIElement);
export {Carousel}