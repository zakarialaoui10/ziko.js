// var __Target__=null;
// if(globalThis?.document?.body)__Target__=document.body;
const __ZikoConfig__={
    default:{
        target:null,
        render:true
    },
    setDefault:function(pairs){
        const keys=Object.keys(pairs);
        const values=Object.values(pairs);
        for(let i=0;i<keys.length;i++)this.default[keys[i]]=values[i];
    },
    init:()=>document.documentElement.setAttribute("data-engine","zikojs")
}
export * from "./__init__";
export * from "./__Target__";
export * from "./__UI__";
export {__ZikoConfig__}
