export function SceneComposer(){
    return {
        size:function(w = "100%", h = "100%") {
            if(typeof(w)==="number")w=w+"px";
            if(typeof(h)==="number")h=h+"px";
            waitElm(this.element).then((e)=>{
                this.element.style.width=w;
                this.element.style.height=h;
                this.canvas.style.margin=0;
                this.camera.currentCamera.aspect=(this.element.clientWidth)/(this.element.clientHeight); 
                this.camera.currentCamera.updateProjectionMatrix();
                this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
                this.renderGl();
            })
            return this;
        },
        background:function(){

        },
    }
}