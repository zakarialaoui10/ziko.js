import {ZikoUIContainerElement} from "../../ZikoUIElement.js";
class ZikoUIModal extends ZikoUIContainerElement{
    constructor(...UIElements){
        super("dialog", "modal")
        this.append(...UIElements);
        Object.assign(this.cache,{
            config:{
                mode:"modal",
                useTransition:true
            }
        });
        this.style({
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            border: "none",
            backgroundCcolor: "#f5f5f5",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px"
        });
        this.close()
    }
    open(){
        if(!this.element.open){
            switch(this.cache.config.mode){
                case "modal": this.element.showModal(); break;
                case "dialog": this.element.show(); break;
                default : this.element.show(); break;
            }
            // this.style({
            //     display : "flex",
            // })
            this.st.fadeIn(1000)
            this.emit("modal:opened");
        }
        return this;
    }
    close(){
        // this.style({
        //     display : "none"
        // })
        this.st.fadeOut(1000)
        if(this.element.open){
            this.element.close();
        }
        this.emit("modal:closed");
        return this;
    }
    closeAfter(t = 1000){
        globalThis?.setTimeout(()=>this.close(), t);
        return this;
    }
    onOpen(callback){
        this.on("modal:opened",callback.bind(this));
        return this;
    }
    onClose(callback){
        this.on("modal:closed",callback.bind(this));
        return this;
    }
    useModal(){
        this.cache.config.mode = "modal";
        return this;
    }
    useDialog(){
        this.cache.config.mode = "dialog";
        return this; 
    }
    useTransition(enabled = true){
        this.cache.config.useTransition = enabled;
        return this;
    }
}

const Modal=(...UIElements)=>new ZikoUIModal(...UIElements);
export{
    Modal,
    ZikoUIModal
}

/*
a=Modal(text("Hello")).style({
 width:"100%",
 height:"100%"
})
Flex(a).size("400px","400px").style({border:"1px red solid"})
*/