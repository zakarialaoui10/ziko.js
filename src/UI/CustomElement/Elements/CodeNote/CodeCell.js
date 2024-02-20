import { useSuccesifKeys } from "../../../../Reactivity";
import {ZikoHtml} from "../../../Misc";
import { Flex } from "../../Flex";
class ZikoCodeCell{
    constructor(code="",{type="js",order=null}={}){
        this.Input=Input(code);
        this.Output=Output();
        this.type=type;
        this.order=order;
        this.metadata={}
        this.InOut=Flex(
            this.Input,
            this.Output
        ).vertical().style({
            width:"90vw",
            margin:"20px auto"
        });
        this.Right=null;
        this.Left=null;
        this.Input.onKeyDown(e=>{
            if(e.kd==="Enter" && e.event.shiftKey){
                e.event.preventDefault();
                this.execute();
            }
        }
        )
        this.Input.onKeyPress(e=>{
            if(e.kp==="(")a.Input.element.textContent+=")";
            if(e.kp==="[")a.Input.element.textContent+="]";
            if(e.kp==="{")a.Input.element.textContent+="}";
        })    
    }
    // space &nbsp
    get codeText() {
        return this.Input.element.textContent;
    }
    get codeHTML() {
        return this.Input.element.innerHTML;
    }
    get outputHTML(){
        return this.Output.element.innerHTML;
    }
    Cell(){
        return {
            input:this.codeText,
            output:this.outputHTML,
            order:this.order,
            type:this.type     
        }
    }
    execute(){
        this.clearOutput()
        this.evaluate();
        return this;
    }
    #evaluateJs(){
        try{
            globalThis.eval(this.Input.element.innerText);
        }
        catch(err){
            console.error(err);
        }
    }
    #evaluateMd(){

    }
    #evaluateHtml(){

    }
    evaluate(){
        globalThis.__Target__=this.Output.element;
        switch(this.type){
            case "js":this.#evaluateJs();break;
        }
        return this;
    }
    clearInput(){
        this.Output.element.innerText="";
        return this;
    }
    clearOutput(){
        this.Output.element.innerText="";
        return this;
    }
    setOrder(order){
        this.order=order;
        return this;
    }
    remove(){
        this.InOut.remove();
    }
}

const Input=(codeText="")=>ZikoHtml("code",codeText).style({
    width:"100%",
    height:"auto",
    padding:"10px",
    boxSizing:"border-box",
    border: "1px solid #ccc", 
    outline: "none",
    fontSize: "1rem", 
    fontFamily: "Lucida Console, Courier New, monospace", 
    padding: "1rem 0.5rem", 
    wordBreak:"break-all",
    background:"#f6f8fa",
    color:"#0062C3"
}).setAttr("contenteditable",true);
const Output=()=>ZikoHtml("output").style({
    width:"100%",
    height:"auto",
})

const CodeCell=(codeText,{type}={})=>new ZikoCodeCell(codeText,{type});
export{
    CodeCell
}