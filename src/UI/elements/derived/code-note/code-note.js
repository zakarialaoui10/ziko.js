import { ZikoUIFlex } from "../Flex";
import { CodeCell } from "./code-cell";
class ZikoUICodeNote extends ZikoUIFlex{
    constructor(){
        super("section");
        Object.assign(this.cache,{
            order:0,
            currentNote:null,
            currentNoteIndex:null
        })
        this.vertical(0,0);
    }
    get isCodeNote(){
        return true;
      }
    setCurrentNote(currentNote){
        this.cache.currentNote=currentNote;
        this.cache.currentNoteIndex=this.items.findIndex(n=>n===currentNote);
        currentNote.focus();
        this.items.forEach(n=>n.Input.style({
            border: "1px solid #ccc"
        }))
        currentNote.Input.style({
            border:"2px lightgreen solid"
        });
        return this;
    }
    addNote(text=""){
        this.append(CodeCell(text));
        return this;
    }
    execute(){
        this.cache.currentNote.execute();
        this.incrementOrder();
        return this;
    }
    incrementOrder(){
        this.cache.order++;
        this.cache.currentNote.setOrder(this.cache.order);
        return this;
    }
    next(){
        if(this.cache.currentNote===this.items.at(-1)){
            this.addNote();
            this.setCurrentNote(this.items.at(-1));
        }
        else this.setCurrentNote(this.items[this.cache.currentNoteIndex+1]); 
        return this;
    }
    previous(){
        // add append before
        if(this.cache.currentNote!==this.items[0]){
            this.setCurrentNote(this.items[this.cache.currentNoteIndex-1]);
        }
        return this;
    }
    data(){
        return this.items.map(n=>n.cellData());
    }
    serialize(){
        return JSON.stringify(this.data());
    }
    import(data=[]){
        data.forEach((n,i)=>this.addNote(data[i].input));
        return this;
    }
}
const CodeNote=()=>new ZikoUICodeNote();
export{
    CodeNote,
    ZikoUICodeNote
}