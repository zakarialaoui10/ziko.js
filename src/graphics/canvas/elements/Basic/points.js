import ZikoCanvasElement from "../element.js";
import { matrix } from "../../../../math/matrix/index.js";
class CanvasPoints extends ZikoCanvasElement{
    constructor(ptsX,ptsY){
        super();
        this.pointsMatrix=null;
        this.path=new Path2D();
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
            this.path.moveTo(this.points[1][0]+this._x,this.points[1][1]+this._y);
            for(let i=1;i<this.points.length;i++){
                this.path.lineTo(this.points[i][0]+this._x,this.points[i][1]+this._y)
            }
            ctx.stroke(this.path);
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
    isIn(x,y){
        let is;
        if(this.parent){
            this.parent.ctx.setTransform(1,0,0,1,0,0);
            is=this.parent.ctx.isPointInPath(this.path,x,y);
            this.parent.applyTransformMatrix();
        }
        return is;
    }
}

const canvasPoints=(ptsX=[],ptsY=[])=>new CanvasPoints(ptsX,ptsY);
export{canvasPoints};