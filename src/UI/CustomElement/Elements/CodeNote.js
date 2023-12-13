import { ZikoUIFlex } from "../Flex.js"
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

const CodeNote = () => new ZikoUINoteBook()
export {CodeNote}