import { 
    markdown2html,
    csv2arr,
    csv2matrix,
    csv2object,
    csv2json,
    csv2sql,
    json2arr,
    json2csv,
    json2yml
 } from "./Converter";
import parseXML from "./Parser/xml";
import { preload } from "./Api";
const Data={
    markdown2html,
    csv2arr,
    csv2matrix,
    csv2object,
    csv2json,
    csv2sql,
    json2arr,
    json2csv,
    json2yml,
    preload,
    parseXML,
    ExtractAll:function(){
        for (let i = 0; i < Object.keys(this).length; i++) {
            globalThis[Object.keys(this)[i]] = Object.values(this)[i];
        }
        return this;
    },
    RemoveAll:function(){
        for (let i = 0; i < Object.keys(this).length; i++) delete globalThis[Object.keys(this)[i]];   
        return this;
    }
}
export{
    parseXML,
    preload,
    markdown2html,
    csv2arr,
    csv2matrix,
    csv2object,
    csv2json,
    csv2sql,
    json2arr,
    json2csv,
    json2yml
}
export default Data