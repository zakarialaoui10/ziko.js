const mixin = (target, ...sources) => {
    sources.forEach(source => {
        Object.getOwnPropertyNames(source.prototype).forEach(name => {
            if (name !== 'constructor') {
                target[name] = source.prototype[name];
            }
        });
    });
}

class A {
    constructor(){
        this.msg="from A";
    }
    a() {
        console.log(this.msg);
        return this;
    }
}

class B{
    constructor(){
        this.msg="from B";
    }
    b() {
        console.log(this.msg);
        return this;
    }
}

class AB {
    constructor() {
        this.msg="from AB"
        mixin(this.__proto__, A, B);
    }
}

ab=new AB()
export{
    mixin
}
