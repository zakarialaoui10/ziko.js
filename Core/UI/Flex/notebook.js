import { ZikoUIFlex } from "./flex.js"
class ZikoUINoteBook extends ZikoUIFlex{
    constructor(){
        super()
    }
    addSection(){
        const Input=Section().style({
            width:"80%",
            height:"50px",
            margin:"5px 0px",
            border:"1px red solid"
        })
        this.append(Input);
        return this;
    }
}

const Notebook = () => new ZikoUINoteBook()
export {Notebook}