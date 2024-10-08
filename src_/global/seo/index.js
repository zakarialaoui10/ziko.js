class ZikoSeo{
    constructor(app){
        this.app=app;
        this.meta={};
        this.#setMeta("generator","zikojs")
    }
    #setMeta(key,value){
        const meta=document.querySelector(`meta[name=${key}]`);
        this.meta=meta?meta:document?.createElement("meta");
        this.meta.setAttribute("name",key);
        this.meta.setAttribute("content",value);
        if(!meta)this.app.head.append(this.meta);
        return this;     
    }
    charset(charset="utf-8"){
        const meta=document.querySelector("meta[charset]");
        this.meta=meta?meta:document?.createElement("meta");
        this.meta.setAttribute("charset",charset);
        if(!meta)this.app.head.append(this.meta);
        return this;
    }
    description(description){
        this.#setMeta("description",description);
        return this;    
    }
    viewport(viewport="width=device-width, initial-scale=1.0"){
        this.#setMeta("viewport",viewport);
        return this;    
    }
    keywords(...keywords){
        keywords.push("zikojs");
        keywords=[...new Set(keywords)].join(", ");
        this.#setMeta("keywords",keywords);
        return this;
    }
    author(name="",email=""){
        const author=[name,email].join(", ");
        this.#setMeta("author",author);
        return this;
    }
}
const Seo=(app)=>new ZikoSeo(app);
export{Seo}