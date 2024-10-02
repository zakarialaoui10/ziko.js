import { html } from "../../../primitives/misc/index.js";
import { Flex } from "../../Flex";
import { text } from "../../../primitives/text/index.js";
import { ZikoUICodeNote } from "./code-note";


const Input=(codeText="")=>html("code",codeText).style({
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

const Output=()=>html("output").style({
    width:"100%",
    height:"auto",
    padding:"5px 0",
})
const Left=(ctx)=>Flex(
    text("[ ]")
    ).style({
        width:"50px",
        //height:getComputedStyle(ctx.Input.element).height,
        height:"50px",
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
        globalThis.__Ziko__.__Config__.default.target=e.target.parent.parent[1][1];
    }),
    text('📋').style(BTN_STYLE).onClick(()=>{
        navigator.clipboard.writeText(ctx.codeText)
    }),
    text('✖️').style(BTN_STYLE).onClick(()=>ctx.remove()),
    text('✖️').style(BTN_STYLE).onClick(()=>ctx.remove()),
).style({
    width:"70px",
    height:"50px",
    //background:"cyan",
    margin:"10px 0"
}).horizontal(0,0).wrap(true);
export{
    Input,
    Output,
    Right,
    Left
}