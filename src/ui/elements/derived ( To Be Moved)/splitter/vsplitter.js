import { __ZikoUISplitter__ } from "./__ZikoUISplitter__";
class ZikoUIVerticalSplitter extends __ZikoUISplitter__{
    constructor(topPane, bottomPane){
        super("column", "ns-resize", "height")
        this.topPane = topPane.style({
            height:"50%",
            flexGrow: 1,
            overflow: "hidden"
        });
        this.bottomPane = bottomPane.style({
            height:"50%",
            flexGrow: 1,
            overflow: "hidden"
        });
        this.element?.append(
            this.topPane.element,
            this.resizer.element,
            this.bottomPane.element
        );
        this.onPtrMove(e=>{
            if (!this.cache.isResizing) return;
            const containerHeight = this.element.getBoundingClientRect().height; // height
            const pointerRelativeYpos = e.event.clientY - this.element.getBoundingClientRect().y; // y
            let newTopPaneHeight = (pointerRelativeYpos / containerHeight) * 100;
            let newBottomPaneHeight = 100 - newTopPaneHeight;
            if (newTopPaneHeight < 0) newTopPaneHeight = 0;
            if (newBottomPaneHeight < 0) newBottomPaneHeight = 0;
            this.topPane.element.style.height = `${newTopPaneHeight}%`;
            this.bottomPane.element.style.height = `${newBottomPaneHeight}%`;
        })
    }
    get isHorizontalSplitter(){
        return true;
    }
}
const vSplitter=(topPane, bottomPane)=>new ZikoUIVerticalSplitter(topPane, bottomPane);
export{
    ZikoUIVerticalSplitter,
    vSplitter
}