class AbstractZikoMath {}
import Ziko from "../index.js"
import {PI,E,EPSILON} from "./Const.js"
import { Signal } from "./Signal/Signal.js";
import{
    cos,
    sin,
    tan,
    cot,
    sec,
    csc,
    abs,
    sqrt,
    pow,
    sqrtn,
    e,
    ln,
    acos,
    asin,
    atan,
    acot,
    cosh,
    sinh,
    tanh,
    coth,
    acosh,
    asinh,
    atanh,
    min,
    max,
    sign,
    floor,
    ceil,
    round,
    fact,
    hypot,
    sig,
    atan2,
  } from "./Functions.js";
import {Random} from "./Random.js";
import { Derivation } from "./Numeric/index.js";
import {complex,Complex} from "./complex.js";
import{Matrix,LinearSystem,matrix,matrix2,matrix3,matrix4}from "./Matrix.js"
//import {Logic,Permutation,Combinaison,PowerSet,subset}from "./Discret/index.js"
import Discret from "./Discret/index.js";
import {Logic,Base} from "./Discret/index.js";
import {
    Utils,
    zeros,
    ones,
    numbers,
    sum,
    prod,
    add,
    mul,
    div,
    sub,
    modulo,
    rad2deg,
    deg2rad,
    arange,
    linspace,
    norm,
    lerp,
    map,
    clamp,
    pgcd,
    ppcm,
    aproximatelyEqual,
    cartesianProduct
  }from "./Utils.js"
const ZikoMath={
    PI,
    E,
    EPSILON,
    Random,
    complex,
    Complex,
    Matrix,
    LinearSystem,
    matrix,
    matrix2,
    matrix3,
    matrix4,
    cos,
    sin,
    tan,
    sec,
    csc,
    cot,
    abs,
    sqrt,
    pow,
    sqrtn,
    e,
    ln,
    acos,
    asin,
    atan,
    acot,
    cosh,
    sinh,
    tanh,
    coth,
    acosh,
    asinh,
    atanh,
    min,
    max,
    sign,
    floor,
    ceil,
    round,
    fact,
    hypot,
    sig,
    atan2,
    Derivation,
    Utils,
    numbers,
    zeros,
    ones,
    sum,
    prod,
    add,
    mul,
    div,
    sub,
    modulo,
    rad2deg,
    deg2rad,
    arange,
    linspace,
    norm,
    lerp,
    map,
    clamp,
    pgcd,
    ppcm,
    aproximatelyEqual,
    cartesianProduct,
    Discret,
    Logic,
    Base,
    /*Permutation,
    Combinaison,
    PowerSet,
    subset,*/
    Signal,
    ExtractAll:function(){
        if(window){
            for (let i = 0; i < Object.keys(Ziko.Math).length; i++) {
                window[Object.keys(Ziko.Math)[i]] = Object.values(Ziko.Math)[i];
            }
        }
        return this;
    },
    RemoveAll:function(){
        if(window){
            for (let i = 0; i < Object.keys(Ziko.Math).length; i++) delete window[Object.keys(Ziko.Math)[i]];   
        }
        return this;
    }
}
export {AbstractZikoMath}
export default ZikoMath;

