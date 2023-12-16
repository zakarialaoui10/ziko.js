import ZikoUIElement from "../UI/ZikoUIElement";
import { Seo } from "./Seo/index.js";
import { Themes } from "./Theme/index.js";
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
        return{
            background: `var(--background-${this.uuid})`,
            currentLine: `var(--currentLine-${this.uuid})`,
            selection: `var(--selection-${this.uuid})`,
            foreground: `var(--foreground-${this.uuid})`,
            comment: `var(--comment-${this.uuid})`,
            cyan: `var(--cyan-${this.uuid})`,
            green: `var(--green-${this.uuid})`,
            orange: `var(--orange-${this.uuid})`,
            pink: `var(--pink-${this.uuid})`,
            purple: `var(--purple-${this.uuid})`,
            red: `var(--red-${this.uuid})`,
            yellow: `var(--yellow-${this.uuid})`,
        }
    }
    useTheme(index){
        const keys=Object.keys(Themes);
        for(let a in Themes[keys[index]]){
            this.root.style.setProperty(`--${a}-${this.id}`, Themes[keys[index]][a]);
        }
        return this;
    }
}
const App=()=>new ZikoUIApp()
export default App;