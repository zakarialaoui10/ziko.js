import { 
    obj2str,
    arr2str,
    markdown2html,
    adoc2html,
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
    json2xml,
    json2xmlFile,
    svg2str,
    svg2ascii,
    svg2imgUrl,
    svg2img,
 } from "./converter/index.js";
import parseXML from "./parser/xml.js";
import { preload } from "./api/preload.js";
import {str,Str} from "./string/index.js"
const Data={
    str,
    Str,
    parseXML,
    preload,
    obj2str,
    arr2str,
    markdown2html,
    adoc2html,
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
    json2xml,
    json2xmlFile,
    svg2str,
    svg2ascii,
    svg2imgUrl,
    svg2img,
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
export * from "./converter/index.js";
export * from "./string/index.js"
export default Data