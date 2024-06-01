const mixin=(target, ...sources)=>{
    sources.forEach(source => {
        Object.getOwnPropertyNames(source.prototype).forEach(name => {
            if (name !== 'constructor') {
                target.prototype[name] = source.prototype[name];
            }
        });
    });
}

export{
    mixin
}
