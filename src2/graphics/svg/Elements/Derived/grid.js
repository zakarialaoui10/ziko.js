import { svgPath } from "../Basic/path"
const svgGrid=(w,h,r=10,c=10)=>{
    let path=svgPath().fill("none").stroke("coral").strokeWidth(0.6)
    console.log({x:w/r,y:h/c})
    for(let i=0;i<w;i++) path.moveTo(0,i*w/r).hr(w)
    for(let j=0;j<h;j++) path.moveTo(j*h/c,0).vr(h)
    return path
}
export{ svgGrid };