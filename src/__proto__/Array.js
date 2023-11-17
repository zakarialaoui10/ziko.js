import {
    add, 
    sub,
    mul,
    div,
    modulo,
    inRange,
    mapfun
 } from "../Math/Utils";
function __ArrayProto__(){
    Object.defineProperties(Array.prototype,{
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
        _map:{
            value: function(a,b,c,d) {
                return map(this.valueOf(),a,b,c,d)
            }
        },
        clamp:{
            value: function(min,max) {
                return clamp(this.valueOf(),min,max)
            }
        },
        deepMap:{
            value: function(callback) {
                return mapfun(callback,...this.valueOf())
            }
        },
        
    })
}
export {__ArrayProto__} 