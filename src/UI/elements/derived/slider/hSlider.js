import ZikoUIContainerElement from "../../primitives/ZikoUIContainerElement";

class ZikoUIHorizontalSlider extends ZikoUIContainerElement{
    constructor(){
        super("section","vSlider");
        this.style({
            
        })

    }
}

const hSlider=()=>new ZikoUIHorizontalSlider()
export{
    hSlider
}