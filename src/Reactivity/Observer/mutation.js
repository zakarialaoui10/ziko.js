class ZikoMutationObserver {
    constructor(UIElement, options) {
      this.UIElement = UIElement;
      this.options = options || { attributes: true, childList: true, subtree: true };
      this.observer = null;
      this.streamingEnabled = true;
      this.mutationHistory = {
        attributes: [],
        childList: [],
        subtree: [],
      };
  
      this.observeCallback = (mutationsList, observer) => {
        if (this.streamingEnabled) {
          for (const mutation of mutationsList) {
            switch(mutation.type){
              case 'attributes':this.mutationHistory.attributes.push(mutation.target.getAttribute(mutation.attributeName));break;
              case 'childList':this.mutationHistory.childList.push(mutation);break;
              case 'subtree':this.mutationHistory.subtree.push(mutation);break;
            }
          }
        }
        if (this.callback) {
          this.callback(mutationsList, observer);
        }
      };
    }
  
    observe(callback) {
      if(!this.observer) {
        this.observer = new MutationObserver(this.observeCallback);
        this.observer.observe(this.UIElement.element, this.options);
        this.callback = callback;
        this.streamingEnabled = true;
      }
    }
  
    pause(options) {
      if (this.observer) {
        this.observer.disconnect();
        if (options) {
          this.observer.observe(this.UIElement, options);
        }
      }
    }
  
    reset(options) {
      if (this.observer) {
        this.observer.disconnect();
        this.observer.observe(this.UIElement, options || this.options);
      }
    }
  
    clear() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
        this.mutationHistory = {
          attributes: [],
          childList: [],
          subtree: [],
        };
      }
      this.streamingEnabled = false;
      return this;
    }
  
    getMutationHistory() {
      return this.mutationHistory;
    }
  
    enableStreaming() {
      this.streamingEnabled = true;
      return this;
    }
  
    disableStreaming() {
      this.streamingEnabled = false;
      return this;
    }
  }

const watch=(UIElement,options={},callback=null)=>{
    const Observer= new ZikoMutationObserver(UIElement,options);
    if(callback)Observer.observe(callback);
    return Observer
}
const watchAttr = (UIElement, callback = null) => {
  const options = { attributes: true, childList: false, subtree: false };
  return watch(UIElement, options, ([e])=>callback.call(e,UIElement));
};

const watchChildren = (UIElement, callback = null) => {
  const options = { attributes: false, childList: true, subtree: false };
  return watch(UIElement, options, ([e])=>callback.call(e,UIElement));
};
export { 
  watch,
  watchAttr,
  watchChildren
 }; 