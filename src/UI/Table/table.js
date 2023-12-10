import ZikoUIElement from "../ZikoUIElement.js"
import { tbody,caption,ZikoUICaption,thead} from "./elements.js";
import { matrix } from "../../Math/Matrix/index.js";
import { MatrixToTableUI } from "./utils.js";
class ZikoUITable extends ZikoUIElement {
    constructor(body=matrix(0,0),{caption=null,thead=null,tfoot=null}={}){
        super();
        this.element = document.createElement("table");
        this.fromMatrix(body)
        this.structure={
            caption:null,
            head:null,
            body:0,
            foot:null
        }
        this.render()
    }
    get caption(){

    }
    get header(){

    }
    get body(){

    }
    get footer(){

    }
    setCaption(c){
        this.tCaption=caption(c);
        this.append(this.tCaption);
        return this;
    }
    removeCaption(){
        this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
        return this;
    }
    setHeader(...c){
        this.tHead=thead(...c);
        this.append(this.tHead);
        return this;
    }
    removeHeader(){
        this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
        return this;
    }
    setFooter(c){
        this.tCaption=caption(c);
        this.append(this.tCaption);
        return this;
    }
    removeFooter(){
        this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
        return this;
    }
    fromMatrix(bodyMatrix) {
        (bodyMatrix instanceof Array)?this.bodyMatrix=matrix(bodyMatrix):this.bodyMatrix=bodyMatrix;
        if(this?.tbody?.items?.length)this.tbody.remove()
        this.tbody=tbody()
        this.append(this.tbody);
        this.tbody.append(...MatrixToTableUI(this.bodyMatrix))
        //this.structure.body.append(...MatrixToTableUI(matrix))
        //this.cellStyles({ padding: "0.2rem 0.4rem", textAlign: "center" });
        return this;
      }
    transpose() {
        this.fromMatrix(this.bodyMatrix.T);
        return this;
      }
    hstack(m) {
        if(m instanceof ZikoUITable)m=m.bodyMatrix
        this.fromMatrix(this.bodyMatrix.clone.hstack(m));
        return this;
    }
    vstack(m) {
        if(m instanceof ZikoUITable)m=m.bodyMatrix
        this.fromMatrix(this.bodyMatrix.clone.vstack(m));
        return this;
    }
    slice(r0=0,c0=0,r1=this.bodyMatrix.rows-1,c1=this.bodyMatrix.cols-1) {
        this.fromMatrix(this.bodyMatrix.slice(r0,c0,r1,c1));
        return this;
      }
    sortByCols(n, config = { type: "num", order: "asc" }) {
        this.fromMatrix(this.bodyMatrix.clone.sortTable(n, config));
        return this;
    }
    sortByRows(n, config = { type: "num", order: "asc" }) {
        this.fromMatrix(this.bodyMatrix.T.clone.sortTable(n, config).T);
        return this;
    }
    filterByRows(item) {
        this.fromMatrix(this.bodyMatrix.clone.filterByRows(item));
        return this;
    }
    filterByCols(item) {
        this.fromMatrix(this.bodyMatrix.clone.filterByCols(item));
        return this;
      }
    forEachTd(){}
}
const Table=(matrix)=>new ZikoUITable(matrix)
export {Table}
