import ZikoUIElement from "../UI/ZikoUIElement";
import { Seo } from "./Seo/index.js";
import { Themes } from "./Theme/index.js";
class ZikoUIApp extends ZikoUIElement{
    constructor(){
        super();
        this.id="ziko-app";
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
            background: `var(--background-${this.id})`,
            currentLine: `var(--currentLine-${this.id})`,
            selection: `var(--selection-${this.id})`,
            foreground: `var(--foreground-${this.id})`,
            comment: `var(--comment-${this.id})`,
            cyan: `var(--cyan-${this.id})`,
            green: `var(--green-${this.id})`,
            orange: `var(--orange-${this.id})`,
            pink: `var(--pink-${this.id})`,
            purple: `var(--purple-${this.id})`,
            red: `var(--red-${this.id})`,
            yellow: `var(--yellow-${this.id})`,
        }
    }
    useTheme(index){
        const keys=Object.keys(Themes);
        for(let a in Themes[keys[index]]){
            this.root.style.setProperty(`--${a}-${this.id}`, Themes[keys[index]][a]);
        }
        console.log(keys[index])
        return this;
    }
}
const App=()=>new ZikoUIApp()
export default App;