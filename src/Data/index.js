import { 
    markdown2html,
    csv2arr,
    csv2matrix,
    csv2object,
    csv2json,
    csv2sql,
    json2arr,
    json2csv,
    json2csvFile,
    json2yml,
    json2ymlFile,
    svg2str,
    svg2ascii,
    svg2imgUrl,
    svg2img
 } from "./Converter";
import parseXML from "./Parser/xml";
import { preload } from "./Api";
const Data={
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
    json2csvFile,
    json2yml,
    json2ymlFile,
    svg2str,
    svg2ascii,
    svg2imgUrl,
    svg2img,
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
export * from "./Converter" 
export default Data