import Ziko from "../../dist/ziko.mjs"
Ziko.UI.ExtractAll()
Ziko.Math.ExtractAll()
const A=Svg(500).style({
    margin:"20px 10vw",
    background:"#333377"
})
const B=svgCircle(100,100,20)
A.add(B)


export default A