import ZikoUIElement from "../UI/ZikoUIElement";
class ZikoUIApp extends ZikoUIElement{
    constructor(){
        super();
        this.root=document.documentElement;
        this.element=document.body;
    }
    useTheme(){

    }
}
const App=()=>new ZikoUIApp()
export default App;