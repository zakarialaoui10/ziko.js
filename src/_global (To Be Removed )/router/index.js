import { text } from "../../ui/elements/primitives/text/index.js";
class ZikoSPA{
    constructor(root_UI,routes){
        this.root_UI=root_UI;
        this.routes=new Map([
            [404,text("Error 404")],
            ...Object.entries(routes)
        ]);
        this.patterns=new Map();
        this.maintain();
        window.onpopstate = this.render(location.pathname);

    }
    // get(path,wrapper){
    //     (path instanceof RegExp)
    //     ? this.patterns.set(path,wrapper)
    //     : this.routes.set(path,wrapper);
    //     this.maintain();
    //     return this;
    // }
    get(path, wrapper) {
        if (typeof path === 'string' && path.includes(':')) {
            const params = [];
            const regex = new RegExp(`^${path.replace(/:([^/]+)/g, (match, paramName) => {
                params.push(paramName);
                return '(.+)';
            })}$`);
            this.patterns.set(regex, (path) => {
                const values = regex.exec(path).slice(1);
                wrapper(...values);
            });
        } else {
            (path instanceof RegExp)
            ? this.patterns.set(path, wrapper)
                : this.routes.set(path, wrapper);
        }
        this.maintain();
        return this;
    }
    maintain(){
        this.root_UI.append(...this.routes.values());
        [...this.routes.values()].map(n=>n.render(false));
        this.render(location.pathname)
        return this;
    }
    render(path){
        if(this.routes.get(path))this.routes.get(path).render(true);
        else{   
            const key=[...this.patterns.keys()].find(pattern=>pattern.test(path))
            if(key)this.patterns.get(key)(path);
            else this.routes.get(404).render(true)
        }
        window.history.pushState({}, "", path);
        return this;
    }
}
const SPA=(root_UI,routes,patterns)=>new ZikoSPA(root_UI,routes,patterns);

export {SPA}

/*
 // Static 
  S.get("/url",wrapper)
// Dynamique 
 s.get("/url/name/:name/id/:id",(path,name,id)=>handler())
// regEx
*/