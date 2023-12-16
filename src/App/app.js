import ZikoUIElement from "../UI/ZikoUIElement";
import { Seo } from "./Seo/index.js";
import { Themes,ZikoTheme } from "./Theme/index.js";
class ZikoUIApp extends ZikoUIElement{
    constructor(){
        super();
        this.root=document.documentElement;
        this.element=document.createElement("main");
        this.head=null;
        this.#init();
        this.seo=Seo(this);
        Object.assign(this.cache,{theme:null});
        this.render();
    }
    #init(){
        this.root.setAttribute("data-engine","zikojs");
        const head=this.root.getElementsByTagName("head")[0];
        this.head=head?head:this.head=document.createElement("head");
        if(!head)this.root.insertBefore(this.head,document.body);
        const title=this.head.getElementsByTagName("title")[0];
        this.Title=title?title:this.head=document.createElement("title");
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
    get Theme(){
        return this.theme?.Theme;
    }
    useTheme(index){
        if(!this.theme)this.theme=ZikoTheme();
        this.theme.use(index);
        return this;
    }
}
const App=()=>new ZikoUIApp()
export default App;