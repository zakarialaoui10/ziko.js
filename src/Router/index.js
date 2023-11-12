class ZikoSPA{
    constructor(root_UI,routes){
        this.root_UI=root_UI;
        this.routes=new Map([
            [404,text("Error 404")],
            ...Object.entries(routes)
        ]);
        this.maintain();
        window.addEventListener("popstate",()=>this.render(location.pathname));
    }
    set(path,wrapper){
        this.routes.set(path,wrapper);
        this.maintain();
        return this;
    }
    maintain(){
        this.root_UI.append(...this.routes.values());
        [...this.routes.values()].map(n=>n.render(false));
        return this;
    }
    render(path){
        (this.routes.get(path)??this.routes.get(403)).render(true);
        window.history.pushState({}, "", path);
        return this;
    }
}
const SPA=(root_UI,routes)=>new ZikoSPA(root_UI,routes);

export {SPA}