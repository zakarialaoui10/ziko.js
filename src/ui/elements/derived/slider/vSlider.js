import { __ZikoUISlider__ } from "./__ZikoUISlider__";
import { Flex } from "../Flex";
class ZikoUIVerticalSlider extends __ZikoUISlider__{
    constructor(...slides){
        super("section","vSlider");
        Object.assign(this.cache,{
            slideBuilder : (UIElement) => Flex(UIElement).size("100%","100%").vertical(0, 0)
        })
        this.addSlides(...slides);
        this.container.horizontal(0,0)
        this.track.size("90%","100%")
        this.bullets.vertical(0,0).style({
            height : "100%",
            width : "10%"
        })
    }
    __updatePos(){
        const height = this.container.height;
        this.track.st.translateY(-this.cache.currentIndex * height);
    }    
}

const vSlider=(...slides)=>new ZikoUIVerticalSlider(...slides);
export{
    vSlider,
    ZikoUIVerticalSlider
}