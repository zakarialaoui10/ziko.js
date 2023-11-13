
import{Complex}from"../Complex/index.js"
import { Utils } from "../Utils/index.js";
import{Base}from"../Discret/index.js"
import { matrix } from "../Matrix/index.js";

class Random {
    static float(a = 1, b) {
        return b ? Math.random() * (b - a) + a : a * Math.random();
    }
    static int(a, b) {
        return Math.floor(this.float(a, b));
    }
    static bin() {
        return this.int(2);
    }
    static oct() {
        return this.int(8);
    }
    static hex() {
        return this.int(16);
    }
    static choice(choices = [1, 2, 3], p = new Array(choices.length).fill(1 / choices.length)) {
        let newchoice = new Array(100);
        p=Utils.accum(...p).map(n=>n*100)
        newchoice.fill(choices[0], 0, p[0]);
        for (let i = 1; i < choices.length; i++) newchoice.fill(choices[i], p[i - 1], p[i]);
        return newchoice[this.int(newchoice.length - 1)];
    }
    static shuffle(arr){
        return arr.sort(()=>0.5-Math.random())
    }
    static floats(n, a, b) {
        return new Array(n).fill(0).map(() => this.float(a, b));
    }
    static ints(n, a, b) {
        return new Array(n).fill(0).map(() => this.int(a, b));
    }
    static bins(n) {
        return new Array(n).fill(0).map(() => this.int(2));
    }
    static octs(n) {
        return new Array(n).fill(0).map(() => this.int(8));
    }
    static hexes(n) {
        return new Array(n).fill(0).map(() => this.int(16));
    }
    static choices(n, choices, p) {
        return new Array(n).fill(0).map(() => this.choice(choices, p));
    }
    static permutation(...arr) {
        return arr.permS[this.int(arr.length)];
    }
    static color() {
        return "#" + Base.dec2hex(this.float(16777216)).padStart(6,0);
    }
    static colors(n) {
        return new Array(n).fill(null).map(()=>this.color());
    }
    static complex(a = [0,1], b = [0,1]) {
        return new Complex(
            this.float(a[0], a[1]),
            this.float(b[0], b[1])
            );
    }
    static complexInt(a = [0,1], b = [0,1]) {
        return new Complex(
            this.int(a[0], a[1]),
            this.int(b[0], b[1])
            );
    }
    static complexBin() {
        return new Complex(...this.bins(2));
    }
    static complexOct() {
        return new Complex(...this.octs(2));
    }
    static complexHex() {
        return new Complex(...this.octs(2));
    }
    static complexes(n, a = 0, b = 1) {
        return new Array(n).fill(0).map(() => this.complex(a, b));
    }
    static complexesInt(n, a = 0, b = 1) {
        return new Array(n).fill(0).map(() => this.complexInt(a, b));
    }
    static complexesBin(n) {
        return new Array(n).fill(0).map(() => this.complexBin());
    }
    static complexesOct(n) {
        return new Array(n).fill(0).map(() => this.complexOct());
    }
    static complexesHex(n) {
        return new Array(n).fill(0).map(() => this.complexHex());
    }
    static matrix(r,c,min,max){
        return matrix(r,c,this.floats(r*c,min,max))
    }
    static matrixBin(r,c){
        return matrix(r,c,this.bins(r*c))
    }
    static matrixOct(r,c,min,max){
        return matrix(r,c,this.octs(r*c))
    }
    static matrixHex(r,c,min,max){
        return matrix(r,c,this.hex(r*c))
    }
    static matrixColor(r,c){
        return matrix(r,c,this.colors(r*c))
    }
}
export{Random}