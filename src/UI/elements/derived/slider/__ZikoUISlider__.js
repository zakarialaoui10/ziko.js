import ZikoUIContainerElement from "../../primitives/ZikoUIContainerElement";
import { Flex } from "../Flex.js";
import { Section } from "../../primitives/semantic";
class __ZikoUISlider__ extends ZikoUIContainerElement{
    constructor(){
        super("section","");
        Object.assign(this.cache,{
            currentIndex : 0,
        })
        this.style({
            width:"100%",
            overflow:"hidden"
        });
        this.setAttr({
            ariaRoledescription : "carousel",
            ariaLive: "polite",
            ariaLabel : "Content Slider"
        })
        this.track = Flex().vertical(0,0).style({
            transition : "transform 0.3s ease-in-out"
        })
        this.element.append(
            this.track.element
        )
    }
    #update(){
        const length = this.track.items.length;
        for(let i=0;i<length;i++){
            this.track.items[i].setAttr({
                ariaLabel : `Slide ${i+1} of ${length}`
            })
        }
    }
    #addSlide(UIElement){
        console.log(this.width)
        const slide = Section(UIElement).style({
            // width : `${this.track.width}px`,
            // height : `${this.track.height}px`
        }).setAttr({
            ariaRoledescription : "slide",
            role : "group",
            ariaLabel : "" // link to update
        })
        this.track.append(slide);
        return this;
    }
    addSlides(...slides){
        slides.forEach(n=>this.#addSlide(n));
        this.#update();
        return this;
    }
}

export{
    __ZikoUISlider__
}