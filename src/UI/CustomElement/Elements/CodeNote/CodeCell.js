import {ZikoHtml} from "../../../Misc";
import { Flex, ZikoUIFlex } from "../../Flex";
import { ZikoUICodeNote } from "./CodeNote";
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
            if(e.kd==="Enter" && e.event.shiftKey){
                e.event.preventDefault();
                this.execute(this.cache.order);
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
        // this.Input.onKeyPress(e=>{
        //     if(e.kp==="(")a.Input.element.textContent+=")";
        //     if(e.kp==="[")a.Input.element.textContent+="]";
        //     if(e.kp==="{")a.Input.element.textContent+="}";
        // })    
    }
    // space &nbsp
    get codeText() {
        return this.Input.element.innerText;
    }
    get codeHTML() {
        return this.Input.element.innerHTML;
    }
    get outputHTML(){
        return this.Output.element.innerHTML;
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
        if(this.cache.parent instanceof ZikoUICodeNote){
            this.cache.parent.next();
        }
        return this;
    }
    #evaluateJs(order){
        try{
            this.LeftControl[0].setValue("pending");
            this.cache.state="pending";  
            globalThis.eval(this.Input.element.innerText);
        }
        catch(err){
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
                this.cache.parent.incrementOrder()
            }
        }
    }
    #evaluateMd(){

    }
    #evaluateHtml(){

    }
    evaluate(order){
        globalThis.__Target__=this.Output.element;
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
}).setAttr("contenteditable",true).setAttr("spellcheck",false);
const Output=()=>ZikoHtml("output").style({
    width:"100%",
    height:"auto",
    padding:"5px 0",
})
const Left=(ctx)=>Flex(
    text("[ ]")
    ).style({
        width:"50px",
        height:getComputedStyle(ctx.Input.element).height,
        margin:"10px 4px",
        padding:"5px",
        color:"darkblue",
        borderBottom:"4px solid gold",
    }).horizontal(0,0);
const BTN_STYLE={
    background:"none",
    width:"25px",
    height:"25px",
    fontSize:"1.2rem",
    cursor:"pointer"
}
const Right=(ctx)=>Flex(
    text('▶️').style(BTN_STYLE).onClick(e=>{
        if(ctx.parent instanceof ZikoUICodeNote)ctx.parent.setCurrentNote(ctx);
        ctx.execute();
        globalThis.__Target__=e.target.parent.parent[1][1];
    }),
    text('📋').style(BTN_STYLE).onClick(()=>{
        navigator.clipboard.writeText(ctx.Input.element.innerText)
    }),
    text('✖️').style(BTN_STYLE).onClick(()=>ctx.remove()),
).style({
    width:"70px",
    height:"50px",
    //background:"cyan",
    margin:"10px 0"
}).horizontal(0,0).wrap(true)
const CodeCell=(codeText,{type,order}={})=>new ZikoUICodeCell(codeText,{type,order});
export{
    CodeCell
}