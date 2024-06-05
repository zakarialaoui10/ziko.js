const removeExtraSpace=str=>str.replace(/\s+/g,' ');
const count=(str,value)=>str.split("").filter(x => x==value).length;
const countWords=(str,value)=>str.split(" ").filter(x => x==value).length;

export * from "./transformers.js";
export * from "./checkers.js"
export{
    removeExtraSpace,
    count,
    countWords
}