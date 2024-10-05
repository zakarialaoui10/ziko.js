export * from "./hSlider.js"
export * from "./vSlider.js"
import { hSlider } from "./hSlider.js"
import { vSlider } from "./vSlider.js"
const Slider = ({orintation = "horizontal",slides = []}) =>{
    if(["v","vertical"].includes(orintation.toLowerCase())) return vSlider(...slides);
    else if(["h","horizontal"].includes(orintation.toLowerCase())) return hSlider(...slides);
    else Error(`{ orientation : ${orintation}} Not supported`)
}
export{
    Slider
}