import { __ZikoUISlider__ } from "./__ZikoUISlider__";
import { Flex } from "../Flex";
class ZikoUIHorizontalSlider extends __ZikoUISlider__{
    constructor(...slides){
        super("section","hSlider")
        this.vertical(0,0)
        Object.assign(this.cache,{
            slideBuilder : (UIElement) => Flex(UIElement).style({
                minWidth : "100%",
                width:"100%",
                height:"100%",
            }).vertical(0,0)
        })
        this.track.size("100%","90%").style({
            display : "flex"
        })
        this.addSlides(...slides);
        this.bullets.horizontal(0,0).style({
            width : "100%",
            height : "10%",
        })
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