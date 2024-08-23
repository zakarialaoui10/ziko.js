import {PI,E,EPSILON} from "./const.js"
import { Signal } from "./Signal";
import{
    cos,
    sin,
    tan,
    sinc,
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
  } from "./Functions";
import {Random} from "./Random";
//import { Derivation } from "./Numeric";
import {complex,Complex} from "./Complex";
import{Matrix,LinearSystem,matrix,matrix2,matrix3,matrix4}from "./Matrix"
import Discret from "./Discret";
import {Logic,Base,Permutation,Combinaison,powerSet,subSet} from "./Discret";
import {
    Utils,
    zeros,
    ones,
    nums,
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
    logspace,
    geomspace,
    norm,
    lerp,
    map,
    clamp,
    pgcd,
    ppcm,
    isApproximatlyEqual,
    inRange,
    cartesianProduct,
    mapfun
  }from "./Utils"
const Math={
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
    sinc,
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
   // Derivation,
    Utils,
    mapfun,
    nums,
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
    logspace,
    geomspace,
    norm,
    lerp,
    map,
    clamp,
    pgcd,
    ppcm,
    isApproximatlyEqual,
    inRange,
    cartesianProduct,
    Discret,
    Logic,
    Base,
    Permutation,
    Combinaison,
    powerSet,
    subSet,
    Signal,
    ExtractAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'ExtractAll' && key !== 'RemoveAll') {
                globalThis[key] = this[key];
            }
        }
        return this;
    },
    RemoveAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'RemoveAll') {
                delete globalThis[key];
            }
        }
        return this;
    }
}
export * from "./const.js"
export * from "./Functions"
export * from "./Complex"
export * from "./Matrix"
export * from "./Discret"
export * from "./Numeric"
export * from "./Random"
export * from "./Signal"
export * from "./Utils"
export * from "./Statistics"
export default Math;

