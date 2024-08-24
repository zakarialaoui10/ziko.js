class ZikoMutationObserver {
    constructor(targetUIElement, options) {
      this.target = targetUIElement;
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
        this.observer.observe(this.target.element, this.options);
        // this.callback = ([e]) => callback.call(e,this.target);
        this.callback = ([e]) => callback.call(e, this);
        this.streamingEnabled = true;
      }
    }
  
    pause(options) {
      if (this.observer) {
        this.observer.disconnect();
        if (options) {
          this.observer.observe(this.target, options);
        }
      }
    }
  
    reset(options) {
      if (this.observer) {
        this.observer.disconnect();
        this.observer.observe(this.target, options || this.options);
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

const watch=(targetUIElement,options={},callback=null)=>{
    const Observer= new ZikoMutationObserver(targetUIElement,options);
    if(callback)Observer.observe(callback);
    return Observer
}
// const watchAttr = (targetUIElement, callback = null) => {
//   const options = { attributes: true, childList: false, subtree: false };
//   return watch(targetUIElement, options, ([e])=>callback.call(e,targetUIElement));
// };
const watchAttr = (targetUIElement, callback = null) => {
  const options = { attributes: true, childList: false, subtree: false };
  return watch(targetUIElement, options, callback);
};

const watchChildren = (targetUIElement, callback = null) => {
  const options = { attributes: false, childList: true, subtree: false };
  return watch(targetUIElement, options, callback);
};
export { 
  watch,
  watchAttr,
  watchChildren
 }; 