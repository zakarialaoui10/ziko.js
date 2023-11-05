import ZikoCanvasElement from "./_element.js";
import { matrix } from "../../../Math/Matrix/index.js";
class CanvasPoints extends ZikoCanvasElement{
    constructor(ptsX,ptsY){
        super();
        this.fromXY(ptsX,ptsY);
        this.pointsMatrix=null;
    }
    get points(){
        return this.pointsMatrix.T.arr;
    }
    draw(ctx){
        ctx.save();
        this.applyNormalStyle();
        ctx.beginPath();
        ctx.moveTo(...this.points[0]);
        for(let i=1;i<this.points.length;i++){
            ctx.lineTo(...this.points[i])
        }
        ctx.stroke();
        ctx.restore();
        return this;
    }
    fromXY(X,Y){
        this.pointsMatrix=matrix([X,Y]);
        return this;
    }
}

const canvasPoints=(ptsX=[],ptsY=[])=>new CanvasPoints(ptsX,ptsY);
export{canvasPoints};