import ZikoCanvasElement from "./_element.js";
import { matrix } from "../../../Math/Matrix/index.js";
class CanvasPoints extends ZikoCanvasElement{
    constructor(ptsX,ptsY){
        super();
        this.pointsMatrix=null;
        this.fromXY(ptsX,ptsY);
    }
    get points(){
        return this.pointsMatrix.T.arr;
    }
    draw(ctx){
        if(this.cache.config.rendered){
            ctx.save();
            this.applyNormalStyle(ctx);
            ctx.beginPath();
            ctx.moveTo(...this.points[0]);
            for(let i=1;i<this.points.length;i++){
                ctx.lineTo(...this.points[i])
            }
            ctx.stroke();
            ctx.restore();
        }
        return this;
    }
    fromXY(X,Y){
        this.pointsMatrix=matrix([X,Y]);
        return this;
    }
    push(ptsX,ptsY){
        this.pointsMatrix.hstack(matrix([ptsX,ptsY]))
        if(this.parent)this.parent.draw();
        return this;
    }
}

const canvasPoints=(ptsX=[],ptsY=[])=>new CanvasPoints(ptsX,ptsY);
export{canvasPoints};