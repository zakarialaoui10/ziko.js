import fs from "fs"
import path from "path" 
import dir2tree from "dir2tree"
const ROOT = path.join(process.cwd(),'..',"src");
const TARGET = path.join(process.cwd(),".");
const MyTree = dir2tree(ROOT,{
  fileContent:false,
  lineCount:true,
  sortBy:"extension",
  skipFile:["ger.md"],
  skipFolder:[".git","node_modules","assets",""],
  skipExtension:["json"],
},[]);
console.log(MyTree.tree)
MyTree.flat(Infinity).write(TARGET,"generated.json")