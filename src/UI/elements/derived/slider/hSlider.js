import { __ZikoUISlider__ } from "./__ZikoUISlider__";
class ZikoUIHorizontalSlider extends __ZikoUISlider__{
    constructor(...slides){
        super("section","hSlider")
        Object.assign(this.cache,{
            slideBuilder : (UIElement) => Section(UIElement).style({
                minWidth : "100%",
                height:"100%"
            })
        })
        this.track.style({
            display : "flex"
        })
        this.NextBtn = btn("▶")
        this.PreviousBtn = btn("◀")
        this.controls = Flex(
            this.NextBtn,
            this.PreviousBtn
        ).style({
            position : "absolute",
            width : "100%",
            pointerEvent : "none"
        }).forEach(n=>n.style({
            background:"transparent",
            width : "25px",
            height : "50px",
            display : "grid",
            justifyContent: "center",
            alignContent: "center",
            fontSize:"1.5rem"
        }))
        this.init()
        this.addSlides(...slides);
        this.controls.style({
            top : "50%",
            width : "100%",
            transform : "translateY(-50%)",
        }).horizontal("space-between", 0)
        this.bullets.horizontal(0,-1)
    }
    __updatePos(){
        const width = this.width;
        this.track.st.translateX(-this.cache.currentIndex * width);
    }
    
}

const hSlider=(...slides)=>new ZikoUIHorizontalSlider(...slides);
export{
    hSlider,
    ZikoUIHorizontalSlider
}