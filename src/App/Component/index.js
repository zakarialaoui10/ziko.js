class ZikoUIComponent extends HTMLElement{
    constructor(){
        super()
        this.shadowDOM = this.attachShadow({ mode: 'open' });
        this.setAttribute('role', 'region');
        this.setAttribute('data-engine',"zikojs")
    }
    connectedCallback() {
        this.observeContentChanges();
    }
    observeContentChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    while (this.shadowDOM.firstChild) {
                        this.shadowDOM.removeChild(this.shadowDOM.firstChild);
                    }
                    __Ziko__.__Config__.setDefault({ target: this.shadowDOM });
                    globalThis.eval(this.innerHTML);
                }
            });
        });
        observer.observe(this, { childList: true, subtree: true, characterData: true });
    }

    disconnectedCallback() {
        console.log('ZikoUIComponent removed from page.');
    }
}
if(globalThis.document){
    globalThis.customElements.define('ziko-ui', ZikoUIComponent);
}
export{
    ZikoUIComponent
}
