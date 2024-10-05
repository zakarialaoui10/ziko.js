import ZikoUIContainerElement from "../../primitives/ZikoUIContainerElement";
import { Section } from "../../primitives/semantic";
import { text } from "../../primitives/text";
class __ZikoUISlider__ extends ZikoUIContainerElement{
    constructor(){
        super("section","");
        Object.assign(this.cache,{
            currentIndex : 0,
            slideBuilder : null
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
        this.track = Section().size("100%","100%").style({
            transition : "transform 0.3s ease-in-out"
        });
        this.bullets = Flex().style({
            position : "absolute",
            top : 0,
            gap : "10px",
            padding:"10px",
        })
    }
    init(){
        this.NextBtn.onClick(()=>this.next());
        this.PreviousBtn.onClick(()=>this.previous());
        this.element.append(
            this.track.element,
            // this.controls.element,
            this.bullets.element,
        )
        this.controls.unrender()
        // this.controls.st.hide()
    }
    #updateAriaHidden(){
        for(let i=0;i<this.track.items.length;i++){
            this.track[i].setAttr({
                ariaHidden : (i!==this.cache.currentIndex)
            })
        }
    }
    goto(n = 0){
        this.cache.currentIndex = n;
        this.__updatePos();
        this.#updateAriaHidden()
    }
    next(n = 1){
        this.cache.currentIndex += n;
        this.__updatePos();
        this.#updateAriaHidden()
        return this;
    }
    previous(n = 1){
        this.cache.currentIndex -= n;
        this.__updatePos();
        this.#updateAriaHidden()
        return this;
    }
    #update(){
        const length = this.track.items.length;
        for(let i=0;i<length;i++){
            this.track.items[i].setAttr({
                ariaLabel : `Slide ${i+1} of ${length}`,
                dataSlideIndex : i
            })
            this.bullets.items[i].setAttr({
                dataIndex : i,
                ariaLabel : `Go to slide ${i}`
            })
            this.bullets[i].events.click?.destroy();
            this.bullets[i].onClick(()=>this.goto(i))
        }
    }
    #addSlide(UIElement){
        this.track.append(this.cache.slideBuilder(UIElement).setAttr({
            ariaRoledescription : "slide",
            role : "group",
            ariaLabel : "" // link to update
        }));
        this.bullets.append(
         text().size("15px","15px").style({
            borderRadius:"50%",
            cursor : "pointer",
            border : "2px solid white",
            background : "red"
         }).setAttr({
            role : "button",
            tabIndex : 0
         })
        )
        return this;
    }
    addSlides(...slides){
        slides.forEach(n=>this.#addSlide(n));
        this.#update();
        this.#updateAriaHidden();
        return this;
    }
}

export{
    __ZikoUISlider__
}