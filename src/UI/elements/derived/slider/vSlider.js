import { __ZikoUISlider__ } from "./__ZikoUISlider__";
import { Section } from "../../primitives/semantic";
class ZikoUIVerticalSlider extends __ZikoUISlider__{
    constructor(...slides){
        super("section","vSlider");
        Object.assign(this.cache,{
            slideBuilder : (UIElement) => Section(UIElement).size("100%","100%")
        })
        this.NextBtn = btn("⮟")
        this.PreviousBtn = btn("⮝")
        this.controls = Flex(
            this.NextBtn,
            this.PreviousBtn
        ).style({
            position : "absolute",
            width : "100%",
            pointerEvent : "none"
        }).forEach(n=>n.style({
            background:"transparent",
            width : "50px",
            height : "25px",
            display : "grid",
            placeItems: "center",
            alignContent: "center",
            fontSize:"1.5rem"
        }))
        this.init()
        this.addSlides(...slides);
        this.controls.style({
            left : "50%",
            top : 0,
            height : "100%",
            transform : "translateX(-50%)",
        }).vertical(0,"space-between");
        this.bullets.vertical(1,0)
    }
    __updatePos(){
        const height = this.height;
        this.track.st.translateY(-this.cache.currentIndex * height);
    }    
}

const vSlider=(...slides)=>new ZikoUIVerticalSlider(...slides);
export{
    vSlider,
    ZikoUIVerticalSlider
}