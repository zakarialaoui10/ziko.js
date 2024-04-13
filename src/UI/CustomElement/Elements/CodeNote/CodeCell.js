import { Flex, ZikoUIFlex } from "../../Flex";
import { ZikoUICodeNote } from "./CodeNote";
import { 
    Input,
    Output,
    Right,
    Left
 } from "./SubElements";
class ZikoUICodeCell extends ZikoUIFlex{
    constructor(code="",{type="js",order=null}={}){
        super("section")
        Object.assign(this.cache,{
            state:null,
            order,
            type,
            metadata:{
                created:Date.now(),
                updated:null
            }
        })
        this.Input=Input(code);
        this.Output=Output();
        this.InOut=Flex(
            this.Input,
            this.Output
        ).vertical().style({
            width:"100%",
            margin:"10px auto"
        });
        this.RightControl=Right(this);
        this.LeftControl=Left(this)
        this.append(
            this.LeftControl,
            this.InOut,
            this.RightControl
        )
        this.horizontal(-1,1).style({
            //background:"#444",
            width:"95vw",
            margin:"0 auto",
            border:"1px darkblue dotted"
        })
        this.Input.onKeyDown(e=>{
            if(e.kd==="Enter"){
                if(e.event.shiftKey){
                    e.event.preventDefault();
                    this.execute(this.cache.order);
                }
                else {
                    //console.log(this.Input.element.firstChild.firstChild.textContent.at(-1))
                }
            }
            if(this.cache.parent instanceof ZikoUICodeNote){
                if(e.kd==="ArrowDown" && e.event.shiftKey ){
                    this.cache.parent.next();
                }
                if(e.kd==="ArrowUp" && e.event.shiftKey){
                    this.cache.parent.previous();
                }
            }
        }
        )
        this.Input.onFocus(()=>{
            if(this.cache.parent instanceof ZikoUICodeNote){
                this.cache.parent.cache.currentNote=this;
                this.cache.parent.setCurrentNote(this);
            }
        })
        this.Input.onPaste((e)=>{
            //e.event.preventDefault();
            //this.setValue(this.codeText.trim())
        })
        // this.Input.onKeyPress(e=>{
        //     if(e.kp==="(")a.Input.element.textContent+=")";
        //     if(e.kp==="[")a.Input.element.textContent+="]";
        //     if(e.kp==="{")a.Input.element.textContent+="}";
        // })    
    }
    // space &nbsp
    get codeText() {
        return this.Input.element.innerText.trim();
    }
    get codeHTML() {
        return this.Input.element.innerHTML;
    }
    get outputHTML(){
        return this.Output.element.innerHTML;
    }
    setValue(codeText){
        this.Input[0].setValue(codeText);
        return this;
    }
    cellData(){
        return {
            input:this.codeText,
            output:this.outputHTML,
            order:this.cache.order,
            type:this.cache.type     
        }
    }
    execute(order){
        this.clearOutput();
        this.evaluate(order);
        this.cache.metadata.updated=Date.now();
        return this;
    }
    #evaluateJs(order){
        try{
            this.LeftControl[0].setValue("pending");
            this.cache.state="pending";  
            globalThis.eval(this.Input.element.innerText);
        }
        catch(err){
            console.log(err)
            text(`Error : ${err.message}`).style({
                color:"red",
                background:"gold",
                border:"2px red solid",
                padding:"10px",
                margin:"10px 0",
                display:"flex",
                justifyContent: "center",
            });
            this.LeftControl[0].setValue("Err");
            this.cache.state="Error";            
        }
        finally{
            if(this.cache.state==="pending"){
                this.cache.state="success";
                this.setOrder(order);
                if(this.cache.parent instanceof ZikoUICodeNote){
                    this.cache.parent.incrementOrder();
                    this.cache.parent.next();
                }
            }
        }
    }
    #evaluateMd(){

    }
    #evaluateHtml(){

    }
    evaluate(order){
        globalThis.__Ziko__.__Config__.default.target=this.Output.element;
        switch(this.cache.type){
            case "js":this.#evaluateJs(order);break;
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
    setOrder(order,render=true){
        this.cache.order=order;
        if(render){
            (typeof order === "number")?this.LeftControl[0].setValue(`[${order}]`):this.LeftControl[0].setValue("[-]");
        }
        return this;
    }
    focus(){
        this.Input.element.focus();
        return this;
    }
}


const CodeCell=(codeText,{type,order}={})=>new ZikoUICodeCell(codeText,{type,order});
export{
    CodeCell
}