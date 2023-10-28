
import{Complex} from "../Complex/index.js";
import{Matrix}from "../Matrix/index.js"
import{arange}from "../Utils/index.js"

// class Logic1{
//     static not(input) {
//         if (typeof input === "number") return +!input;
//         else if (input instanceof Matrix)
//             return new Matrix(
//                 input.rows,
//                 input.cols,
//                 input.arr.flat(1).map((n) => Logic.not(n))
//             );
//         else if (input instanceof Complex) return new Complex(Logic.not(input.a), Logic.not(input.b));
//         else if (input instanceof Array) return input.map((n) => Logic.not(n));
//     }
//     static and(a, ...b) {
//         if (typeof a === "number") return b.reduce((n, m) => (n &= m), a);
//         else if (a instanceof Matrix)
//             return new Matrix(
//                 a.rows,
//                 a.cols,
//                 a.arr.flat(1).map((n) => Logic.and(n, b))
//             );
//         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.and(a.b, b));
//         else if (a instanceof Array) return a.map((n) => Logic.and(n, b));
//     }
//     static or(a, ...b) {
//         if (typeof a === "number") return b.reduce((n, m) => (n |= m), a);
//         else if (a instanceof Matrix)
//             return new Matrix(
//                 a.rows,
//                 a.cols,
//                 a.arr.flat(1).map((n) => Logic.or(n, b))
//             );
//         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.or(a.b, b));
//         else if (a instanceof Array) return a.map((n) => Logic.or(n, b));
//     }
//     static nand(a, ...b) {
//         return Logic.not(Logic.and(a, b));
//     }
//     static nor(a, ...b) {
//         return Logic.not(Logic.or(a, b));
//     }
//     static xor(a, ...b) {
//         if (typeof a === "number") {
//             const c = b.Count(1);
//             switch (c) {
//                 case 0:
//                     return a;
//                 case 1:
//                     return Logic.not(a);
//                 default:
//                     return 0;
//             }
//         } else if (a instanceof Matrix)
//             return new Matrix(
//                 a.rows,
//                 a.cols,
//                 a.arr.flat(1).map((n) => Logic.xor(n, b))
//             );
//         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.xor(a.b, b));
//         else if (a instanceof Array) return a.map((n) => Logic.xor(n, b));
//     }
//     static xnor(a, ...b) {
//         return Logic.not(Logic.xor(a, b));
//     }
// }
// class BaseConversion {
//     constructor() {}
//     static dec2base(dec, base) {
//         if (typeof dec === "number") return (dec >>> 0).toString(base);
//         else if (dec instanceof Matrix)
//             return new Matrix(
//                 dec.rows,
//                 dec.cols,
//                 dec.arr.flat(1).map((n) => (n >>> 0).toString(base))
//             );
//         else if (dec instanceof Complex) return new Complex((dec.a >>> 0).toString(base), (dec.b >>> 0).toString(base));
//         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2base(n, base));
//     }
//     static bin2base(bin, base) {
//         if (typeof bin === "number") return parseInt(bin, 2).toString(base);
//         else if (bin instanceof Matrix)
//             return new Matrix(
//                 bin.rows,
//                 bin.cols,
//                 bin.arr.flat(1).map((n) => parseInt(n, 2).toString(base))
//             );
//         else if (bin instanceof Complex) return new Complex(parseInt(bin.a, 2).toString(base), parseInt(bin.b, 2).toString(base));
//         else if (bin instanceof Array) return bin.map((n) => BaseConversion.bin2base(n, base));
//     }
//     static oct2base(oct, base) {
//         if (typeof oct === "number") return +parseInt(oct, 8).toString(base);
//         else if (oct instanceof Matrix)
//             return new Matrix(
//                 oct.rows,
//                 oct.cols,
//                 oct.arr.flat(1).map((n) => parseInt(n, 8).toString(base))
//             );
//         else if (oct instanceof Complex) return new Complex(parseInt(oct.a, 8).toString(base), parseInt(oct.b, 8).toString(base));
//         else if (oct instanceof Array) return oct.map((n) => BaseConversion.oct2base(n, base));

//         //return oct instanceof Array?oct.map((n)=>parseInt(n,8).toString(base)):parseInt(bin,8).toString(base);
//     }
//     static hex2base(hex, base) {
//         if (typeof hex === "number") return +parseInt(hex, 16).toString(base);
//         else if (hex instanceof Matrix)
//             return new Matrix(
//                 hex.rows,
//                 hex.cols,
//                 hex.arr.flat(1).map((n) => parseInt(n, 16).toString(base))
//             );
//         else if (hex instanceof Complex) return new Complex(parseInt(hex.a, 16).toString(base), parseInt(hex.b, 16).toString(base));
//         else if (hex instanceof Array) return hex.map((n) => BaseConversion.hex2base(n, base));
//     }
//     static bin2dec(bin) {
//         //return bin instanceof Array?bin.map((n)=>bin2base(n,10)):bin2base(bin,10);

//         if (typeof bin === "number") return +BaseConversion.bin2base(bin, 10);
//         else if (bin instanceof Matrix)
//             return new Matrix(
//                 bin.rows,
//                 bin.cols,
//                 bin.arr.flat(1).map((n) => +BaseConversion.bin2base(n, 10))
//             );
//         else if (bin instanceof Complex) return new Complex(+BaseConversion.bin2base(bin.a, 10), +BaseConversion.bin2base(bin.b, 10));
//         else if (bin instanceof Array) return bin.map((n) => BaseConversion.bin2dec(n));
//     }
//     static dec2bin(dec) {
//         //return +BaseConversion.dec2base(dec,2);

//         if (typeof dec === "number") return +BaseConversion.dec2base(dec, 2);
//         else if (dec instanceof Matrix)
//             return new Matrix(
//                 dec.rows,
//                 dec.cols,
//                 dec.arr.flat(1).map((n) => +BaseConversion.dec2base(n, 2))
//             );
//         else if (dec instanceof Complex) return new Complex(+BaseConversion.dec2base(dec.a, 2), +BaseConversion.dec2base(dec.a, 2));
//         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2bin(n));
//     }
//     static dec2oct(dec) {
//         if (typeof dec === "number") return +BaseConversion.dec2base(dec, 8);
//         else if (dec instanceof Matrix)
//             return new Matrix(
//                 dec.rows,
//                 dec.cols,
//                 dec.arr.flat(1).map((n) => +BaseConversion.dec2base(n, 8))
//             );
//         else if (dec instanceof Complex) return new Complex(+BaseConversion.dec2base(dec.a, 8), +BaseConversion.dec2base(dec.a, 8));
//         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2oct(n));
//     }
//     static dec2hex(dec) {
//         if (typeof dec === "number") return BaseConversion.dec2base(dec, 16);
//         //else if(dec instanceof Matrix)return new Matrix(dec.rows,dec.cols,dec.arr.flat(1).map(n=>BaseConversion.dec2base(n,16)));
//         //else if(dec instanceof Complex)return new Complex(BaseConversion.dec2base(dec.a,16),BaseConversion.dec2base(dec.a,16));
//         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2hex(n));
//     }
//     static IEEE32toDec(Bin){
//         let IEEE32=Bin.split(" ").join("").padEnd(32,"0");
//         let s=IEEE32[0];
//         let e=2**(+("0b"+IEEE32.slice(1,9))-127)
//         let m=IEEE32.slice(9,32).split("").map(n=>+n)
//         let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
//         let dec=(-1)**s*(1+M)*e;
//         return dec
//     }
//     static IEEE64toDec(Bin){
//         let IEEE64=Bin.split(" ").join("").padEnd(64,"0");
//         let s=IEEE64[0];
//         let e=2**(+("0b"+IEEE64.slice(1,12))-1023)
//         let m=IEEE64.slice(13,64).split("").map(n=>+n)
//         let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
//         let dec=(-1)**s*(1+M)*e;
//         return dec
//     }
// }
class Permutation {
    static withDiscount(arr, l = arr.length) {
        if (l === 1) {
            return arr.map((n) => [n]);
        }
        const permutations = [];
        let smallerPermutations;
        smallerPermutations = this.withDiscount(arr, l - 1);
        arr.forEach((currentOption) => {
            smallerPermutations.forEach((smallerPermutation) => {
                permutations.push([currentOption].concat(smallerPermutation));
            });
        });
        return permutations;
    }
    static withoutDiscount(arr) {
        const l = arr.length;
        if (l === 1) {
            return arr.map((n) => [n]);
        }
        const permutations = [];
        const smallerPermutations = this.withoutDiscount(arr.slice(1));
        const firstOption = arr[0];
        for (let i = 0; i < smallerPermutations.length; i++) {
            const smallerPermutation = smallerPermutations[i];
            for (let j = 0; j <= smallerPermutation.length; j++) {
                const permutationPrefix = smallerPermutation.slice(0, j);
                const permutationSuffix = smallerPermutation.slice(j);
                permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
            }
        }
        return permutations;
    }
}
class Combinaison {
    static withDiscount(comboOptions, comboLength) {
        if (comboLength === 1) {
            return comboOptions.map((comboOption) => [comboOption]);
        }
        // Init combinations array.
        const combos = [];
        // Remember characters one by one and concatenate them to combinations of smaller lengths.
        // We don't extract elements here because the repetitions are allowed.
        comboOptions.forEach((currentOption, optionIndex) => {
            // Generate combinations of smaller size.
            const smallerCombos = this.withDiscount(comboOptions.slice(optionIndex), comboLength - 1);
            // Concatenate currentOption with all combinations of smaller size.
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });
        });
        return combos;
    }
    static withoutDiscount(comboOptions, comboLength) {
        // If the length of the combination is 1 then each element of the original array
        // is a combination itself.
        if (comboLength === 1) {
            return comboOptions.map((comboOption) => [comboOption]);
        }
        // Init combinations array.
        const combos = [];
        // Extract characters one by one and concatenate them to combinations of smaller lengths.
        // We need to extract them because we don't want to have repetitions after concatenation.
        comboOptions.forEach((currentOption, optionIndex) => {
            // Generate combinations of smaller size.
            const smallerCombos = this.withoutDiscount(comboOptions.slice(optionIndex + 1), comboLength - 1);
            // Concatenate currentOption with all combinations of smaller size.
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });
        });

        return combos;
    }
}
function PowerSet(originalSet) {
    const subSets = [];
    const numberOfCombinations = 2 ** originalSet.length;
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
        const subSet = [];
        for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(originalSet[setElementIndex]);
            }
        }
        subSets.push(subSet);
    }
    return subSets;
}
var subset = (...arr) => {
    let list = arange(0, 2 ** arr.length, 1);
    let bin = list.toBin.map((n) => n.padStart(arr.length, 0)).map((n) => n.split("").map((n) => +n));
    let sub = bin.map((n) => n.map((m, i) => (m = arr[i])));
    for (let i = 0; i < sub.length; i++) for (let j = 0; j < sub[i].length; j++) sub[i][j] = { n: sub[i][j], m: bin[i][j] };
    sub = sub.map((n) => n.filter((x) => x.m == 1));
    sub = sub.map((n) => n.map((m) => m.n));
    return sub;
}

//export {Logic,BaseConversion,Permutation,Combinaison,PowerSet,subset}

import {Logic} from "./logic.js"
import {Base} from "./conversion.js"
var Discret={
    Logic,
    Base,
    Permutation,
    Combinaison,
    PowerSet,
    subset
}
export default Discret;
export {Logic} from "./logic.js"
export {Base} from "./conversion.js"