class ZikoEvent{
    constructor(Target){
        this.Target=window;
        this.setTarget(Target)
    }
    setTarget(UI){
        this.Target=UI?.element||document.querySelector(UI);
        return this;
    }
    preventDefault(config={}){
        Object.assign(this.cache.preventDefault,config);
        return this;
    }
}