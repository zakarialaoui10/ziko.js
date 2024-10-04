import { __ZikoUISlider__ } from "./__ZikoUISlider__";
class ZikoUIVerticalSlider extends __ZikoUISlider__{
    constructor(...slides){
        super("section","vSlider");
        this.track.size("100%","auto")
        this.addSlides(...slides);
    }
    #updatePos(){
        const height = this.height;
        this.track.st.translateY(-this.cache.currentIndex * height);
    }
    goto(n = 0){
        this.cache.currentIndex = 0;
        this.#updatePos()
    }
    next(n = 1){
        this.cache.currentIndex += n;
        this.#updatePos();
        return this;
    }
    previous(n = 2){
        this.cache.currentIndex -= n;
        this.#updatePos();
        return this;
    }
    
}

const vSlider=(...slides)=>new ZikoUIVerticalSlider(...slides);
window.vSlider = vSlider
export{
    vSlider
}