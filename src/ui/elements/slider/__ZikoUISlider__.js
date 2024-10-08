import { Section, ZikoUISection } from "../../semantic";
import { text } from "../../text";
import { Flex } from "../flex";
class __ZikoUISlider__ extends ZikoUISection{
    constructor(){
        super("section","");
        Object.assign(this.cache,{
            currentIndex : 0,
            slideBuilder : null,
        })
        this.container = Flex().size("100%","100%").vertical(0,0).style({
            // width:"100%",
            overflow:"hidden"
        });
        // this.style({
        //     // width:"100%",
        //     overflow:"hidden"
        // });
        this.container.setAttr({
            ariaRoledescription : "carousel",
            ariaLive: "polite",
            ariaLabel : "Content Slider"
        })
        this.track = Section().size("100%","100%").style({
            transition : "transform 0.3s ease-in-out",
        });
        this.bullets = Flex().style({
            // position : "absolute",
            // top : 0,
            gap : "10px",
            padding:"10px",
        })
        this.container.append(
            this.track,
            this.bullets
        )
        this.append(this.container)
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
        const bullet = text().size("15px","15px").style({
            borderRadius:"50%",
            cursor : "pointer",
            border : "3px solid blue",
            background : "white"
         }).setAttr({
            role : "button",
            tabIndex : 0
         })
         .onPtrEnter(e=>e.target.st.background("gold").scale(1.2,1.2))
         .onPtrLeave(e=>e.target.st.background("white").scale(1,1))
        this.bullets.append(
         bullet
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