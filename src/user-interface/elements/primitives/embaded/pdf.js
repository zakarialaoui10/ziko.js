import  ZikoUIElement  from "../ZikoUIElement.js";

class ZikoUIPdf extends ZikoUIElement{
    constructor(src, title = "Pdf Document Embaded in Zikojs App"){
        super("embed")
        // this.setAttr(JSON.stringify({
        //     src,
        //     type:"application/pdf",
        //     "aria-label":title
        // }))
        this.setAttr("src",src)
        this.setAttr("type","application/pdf")
        this.setAttr("aria-label",title)
        this.setAttr("tab-index","0")
    }
}

const PdfViewer=(src, title)=>new ZikoUIPdf(src, title);
window.PdfViewer = PdfViewer
export{
    ZikoUIPdf,
    PdfViewer
}