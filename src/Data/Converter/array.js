import { obj2str } from "./object.js";
import { Complex } from "../../Math/Complex";
// const arr2str=(array)=>{
//     const stringifyArray = (arr) => {
//       return arr.map(item => {
//         if (Array.isArray(item)) return `[${stringifyArray(item)}]`;
//         if (item instanceof Complex) return item.toString();
//         if(item instanceof Object) return obj2str(item);
//         else return String(item);
//       }).join(', ');
//     };
  
//     return `[${stringifyArray(array)}]`;
//   };
// const arr2str = (array, indentLevel = 0) => {
//   const indent = '  '.repeat(indentLevel);
//   const nextIndent = '  '.repeat(indentLevel + 1);

//   const stringifyArray = (arr, level = 0) => {
//     return arr.map(item => {
//       if (Array.isArray(item)) return `\n${nextIndent}[${stringifyArray(item, level + 1)}\n${nextIndent}]`;
//       if (item instanceof Complex) return item.toString();
//       if (item instanceof Object) return `\n${nextIndent}${obj2str(item, level + 1)}`;
//       else return String(item);
//     }).join(', ');
//   };

//   return `[\n${stringifyArray(array, indentLevel)}\n${indent}]`;
// };

// const arr2str = (array, useIndentation = true, indentLevel = 0) => {
//   const indent = useIndentation ? '  '.repeat(indentLevel) : '';
//   const nextIndent = useIndentation ? '  '.repeat(indentLevel + 1) : '';

//   const stringifyArray = (arr, level = 0) => {
//     return arr.map(item => {
//       if (Array.isArray(item)) {
//         return useIndentation 
//           ? `\n${nextIndent}[${stringifyArray(item, level + 1)}\n${nextIndent}]` 
//           : `[${stringifyArray(item, level + 1)}]`;
//       }
//       if (item instanceof Complex) return item.toString();
//       if (item instanceof Object) {
//         return useIndentation 
//           ? `\n${nextIndent}${obj2str(item, level + 1, useIndentation)}` 
//           : obj2str(item, level + 1, useIndentation);
//       }
//       return String(item);
//     }).join(', ');
//   };

//   return useIndentation 
//     ? `[\n${stringifyArray(array, indentLevel)}\n${indent}]` 
//     : `[${stringifyArray(array, indentLevel)}]`;
// };

const arr2str = (array, useIndentation = true, indentLevel = 0) => {
  const indent = useIndentation ? '  '.repeat(indentLevel) : '';
  const nextIndent = useIndentation ? '  '.repeat(indentLevel + 1) : '';

  const stringifyArray = (arr, level = 0) => {
    return arr.map(item => {
      if (Array.isArray(item)) return `\n${nextIndent}[${stringifyArray(item, level + 1)}]`;
      if (item instanceof Complex) return item.toString();
      if (item instanceof Object) return `\n${nextIndent}${obj2str(item, level + 1, useIndentation)}`;
      return String(item);
    }).join(', ');
  };
  return `[\n${stringifyArray(array, indentLevel)}\n${indent}]`.replace("[\n\n","[\n");
};


export{
    arr2str
}