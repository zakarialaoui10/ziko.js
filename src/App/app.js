import { ZikoUIFlex } from "../user-interface/custom-elements/Flex.js";
import { Seo } from "./seo/index.js";
import { useHashEvent } from "../reactivity/index.js";
class ZikoUIApp extends ZikoUIFlex{
    constructor(){
        super("main");
        this.root=document.documentElement;
        this.head=null;
        this.#init();
        this.seo=Seo(this);
        Object.assign(this.events,{
            hash:null
        })
        Object.assign(this.cache,{
            theme:null,
            isRoot:true
        });
        // globalThis.__Ziko__.__Config__.default.render && this.render();
    }
    #init(){
        this.root.setAttribute("data-engine","zikojs");
        const head=this.root.getElementsByTagName("head")[0];
        this.head=head?head:this.head=document?.createElementtt("head");
        if(!head)this.root.insertBefore(this.head,document?.body);
        const title=this.head.getElementsByTagName("title")[0];
        this.Title=title?title:document?.createElementt("title");
        if(!title)this.head.append(this.Title);
    }
    title(title=this.title.textContent){
        this.Title.textContent=title;
        return this;
    }
    prefetch(){

    }
    description(){

    }
    onHashChange(...callbacks){
        if(!this.events.hash)this.events.hash = useHashEvent(this);
        this.events.hash.onChange(...callbacks);
        return this;
      }
}
const App=(...UIElement)=>new ZikoUIApp().append(...UIElement)
export {App};