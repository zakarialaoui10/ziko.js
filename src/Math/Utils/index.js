import { mapfun } from "./mapfun.js";
import{abs}from "../Functions/index.js"
import{Matrix}from "../Matrix/index.js"
import{complex,Complex}from"../Complex/index.js"
import{E} from "../const.js";
import { 
    add,
    sub,
    mul,
    div,
    modulo
 } from "./arithmetic.js";
import {
    zeros,
    ones,
    nums,
    norm,
    lerp,
    map,
    clamp,
    arange,
    linspace,
    logspace,
    geomspace
} from "../Signal/functions.js"
import {
    deg2rad,
    rad2deg
} from "./conversions.js"
import{
    sum,
    prod,
    min,
    max,
    accum
} from "../Statistics/functions.js"
import{
    inRange,
    isApproximatlyEqual
} from "./checkers.js"
import{
    cartesianProduct,
    ppcm,
    pgcd
} from "./discret.js"
const Utils={
    add,
    sub,
    mul,
    div,
    modulo,

    zeros,
    ones,
    nums,
    norm,
    lerp,
    map,
    clamp,
    arange,
    linspace,
    logspace,
    geomspace,

    sum,
    prod,
    accum,

    cartesianProduct,
    ppcm,
    pgcd,

    deg2rad,
    rad2deg,

    inRange,
    isApproximatlyEqual
}
export {
    mapfun,
    Utils,
    zeros,
    ones,
    nums,
    sum,
    prod,
    add,
    mul,
    sub,
    div,
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
  };
 