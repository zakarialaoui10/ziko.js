class ZikoMutationObserver {
    constructor(UIElement, options) {
      this.UIElement = UIElement;
      this.options = options || { attributes: true, childList: true, subtree: true };
      this.observer = null;
      this.streamingEnabled = false;
      this.mutationHistory = {
        attributes: [],
        childList: [],
        subtree: [],
      };
  
      this.observeCallback = (mutationsList, observer) => {
        if (this.streamingEnabled) {
          for (const mutation of mutationsList) {
            if (mutation.type === 'attributes') {
              this.mutationHistory.attributes.push(mutation);
            } else if (mutation.type === 'childList') {
              this.mutationHistory.childList.push(mutation);
            } else if (mutation.type === 'subtree') {
              this.mutationHistory.subtree.push(mutation);
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
        this.observer.observe(this.UIElement, this.options);
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

const Watch=(UIElement,options,callback)=>{
    const Observer= new ZikoMutationObserver(UIElement,options);
    if(callback)Observer.observe(callback);
    return Observer
}

export default Watch;