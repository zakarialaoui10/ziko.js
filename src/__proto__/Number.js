import {
    add, 
    sub,
    mul,
    div,
    modulo,
    inRange,
    deg2rad,
    rad2deg,
 } from "../Math/Utils";
function __NumberProto__(){
    Object.defineProperties(Number.prototype,{
        inRange:{
            value: function(a,b) {
                return inRange(this.valueOf(),a,b)
            }
        },
        add:{
            value: function(...n) {
                return add(this.valueOf(),...n)
            }
        },
        sub:{
            value: function(...n) {
                return sub(this.valueOf(),...n)
            }
        },
        mul:{
            value: function(...n) {
                return mul(this.valueOf(),...n)
            }
        },
        div:{
            value: function(...n) {
                return div(this.valueOf(),...n)
            }
        },
        modulo:{
            value: function(...n) {
                return modulo(this.valueOf(),...n)
            }
        },
        norm:{
            value: function(min,max) {
                return norm(this.valueOf(),min,max)
            }
        },
        lerp:{
            value: function(min,max) {
                return lerp(this.valueOf(),min,max)
            }
        },
        map:{
            value: function(a,b,c,d) {
                return map(this.valueOf(),a,b,c,d)
            }
        },
        clamp:{
            value: function(min,max) {
                return clamp(this.valueOf(),min,max)
            }
        },
        toDeg:{
            value: function() {
                return rad2deg(this.valueOf())
            }
        },
        toRad:{
            value: function() {
                return deg2rad(this.valueOf())
            }
        },
    
    })
}
export {__NumberProto__} 