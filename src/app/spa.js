import { text } from "../ui";
import { dynamicRoutesParser,routesMatcher } from "./routes";
class ZikoSPA{
    constructor({wrapper,routes}){
        this.wrapper=wrapper;
        this.routes=new Map([
            ["404",text("Error 404")],
            ...Object.entries(routes)
        ]);
        this.clear();
        globalThis.onpopstate = this.render(location.pathname);
    }
    // get(path, callback) {
    //     this.clear()
    //     const {type, params} = routesParser(path);
    //     if(type === "dynamic") {
    //       let element = callback.call(this,params);
    //       (element?.isZikoUIElement) && element.render(this.wrapper);
    //     }
    //     return this;
    // }
    clear(){
        [...this.routes].forEach(n=>{
            !isDynamic(n[0]) && n[1].unrender()
        })   
        this.wrapper.clear();
        return this;
    }
    render(path){
        const [mask, callback] = [...this.routes].find(route=>routesMatcher(route[0],path));
        let element ;
        if(isDynamic(mask)){
            const params = dynamicRoutesParser(mask, path)
            element = callback.call(this,params)
        }
        else {
            callback?.isZikoUIElement && callback.render(this.wrapper); 
            if(typeof callback === "function") element = callback();  
        }
        if(element?.isZikoUIElement) element.render(this.wrapper);
        globalThis.history.pushState({}, "", path);
        return this;
    }
}
const SPA=({wrapper,routes,patterns})=>new ZikoSPA({wrapper,routes,patterns});

export {
    ZikoSPA,
    SPA
}

function isDynamic(path) {
    const DynamicPattern = /:\w+/;    
    return DynamicPattern.test(path);
  }
/*
 // Static 
  S.get("/url",wrapper)
// Dynamique 
 s.get("/url/name/:name/id/:id",(path,name,id)=>handler())
// regEx
*/