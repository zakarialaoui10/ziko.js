
import{Complex}from"../Complex/index.js"
import { Utils } from "../Utils/index.js";
import{Base}from"../Discret/index.js"

class Random {
    static rand(a = 1, b) {
        return b ? Math.random() * (b - a) + a : a * Math.random();
    }
    static randInt(a, b) {
        return Math.floor(Random.rand(a, b));
    }
    static get randBin() {
        return Random.randInt(2);
    }
    static get randOct() {
        return Random.randInt(8);
    }
    static get randHex() {
        return Random.randInt(16);
    }
    static choice(choices = [1, 2, 3], p = new Array(choices.length).fill(1 / choices.length)) {
        let newchoice = new Array(100);
        p=Utils.accum(...p).map(n=>n*100)
        newchoice.fill(choices[0], 0, p[0]);
        for (let i = 1; i < choices.length; i++) newchoice.fill(choices[i], p[i - 1], p[i]);
        return newchoice[Random.randInt(newchoice.length - 1)];
    }
    static shuffle(arr){
        return arr.sort(()=>0.5-Math.random())
    }
    static rands(n, a, b) {
        return new Array(n).fill(0).map(() => Random.rand(a, b));
    }
    static randsInt(n, a, b) {
        return new Array(n).fill(0).map(() => Random.randInt(a, b));
    }
    static randsBin(n) {
        return new Array(n).fill(0).map(() => Random.randInt(2));
    }
    static randsOct(n) {
        return new Array(n).fill(0).map(() => Random.randInt(8));
    }
    static randsHex(n) {
        return new Array(n).fill(0).map(() => Random.randInt(16));
    }
    static choices(n, choices, p) {
        return new Array(n).fill(0).map(() => Random.choice(choices, p));
    }
    static permutation(...arr) {
        return arr.permS[Random.randInt(arr.length)];
    }
    static get randomColor() {
        return "#" + Base.dec2hex(Random.rand(16777216)).padStart(6,0);
    }
    static randComplex(a = 0, b = 1) {
        return new Complex(...Random.rands(2, a, b));
    }
    static randIntComplex(a = 0, b = 1) {
        return new Complex(...Random.randsInt(2, a, b));
    }
    static get randBinComplex() {
        return new Complex(...Random.randsBin(2));
    }
    static get randOctComplex() {
        return new Complex(...Random.randsOct(2));
    }
    static get randHexComplex() {
        return new Complex(...Random.randsOct(2));
    }
    static randsComplex(n, a = 0, b = 1) {
        return new Array(n).fill(0).map(() => Random.randComplex(a, b));
    }
    static randsIntComplex(n, a = 0, b = 1) {
        return new Array(n).fill(0).map(() => Random.randIntComplex(a, b));
    }
    static randsBinComplex(n) {
        return new Array(n).fill(0).map(() => Random.randBinComplex);
    }
    static randsOctComplex(n) {
        return new Array(n).fill(0).map(() => Random.randOctComplex);
    }
    static randsHexComplex(n) {
        return new Array(n).fill(0).map(() => Random.randHexComplex);
    }
}
export{Random}