import  ZikoUIElement  from "../ZikoUIElement.js";
class ZikoUIPdf extends ZikoUIElement{
    constructor(src, title = "Pdf Document Embaded in Zikojs App"){
        super("embed","PDFViewer")
        this.setAttr({
            src:src,
            type: "application/pdf",
            ariaLabel: title,
            tabIndex: "0",
        })
    }
}
const PDFViewer=(src, title)=>new ZikoUIPdf(src, title);
window.PDFViewer = PDFViewer
export{
    ZikoUIPdf,
    PDFViewer
}