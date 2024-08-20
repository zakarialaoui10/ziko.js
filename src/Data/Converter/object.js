import { arr2str } from "..";
import { Complex, Matrix } from "../../Math";

// const obj2str=(object)=>{
//     const recursiveToString = (obj) => {
//       if (Array.isArray(obj)) return arr2str(obj);
//       if (typeof obj === 'object' && obj !== null) {
//         return `{ ${Object.entries(obj)
//           .map(([key, value]) => `${key}:${recursiveToString(value)}`)
//           .join(" , ")} }`;
//       }
//       return String(obj); 
//     };
//     return recursiveToString(object);
//   };
//   const obj2str = (object) => {
//     const recursiveToString = (obj, indentLevel = 0) => {
//       const indent = '  '.repeat(indentLevel);
//       const nextIndent = '  '.repeat(indentLevel + 1);
//       if(Array.isArray(obj)) return arr2str(obj, indentLevel);
//       if(obj instanceof Complex || obj instanceof Matrix) return obj.toString();
//       if (typeof obj === 'object' && obj !== null) {
//         const entries = Object.entries(obj)
//           .map(([key, value]) => `${nextIndent}${key}: ${recursiveToString(value, indentLevel + 1)}`)
//           .join(",\n");
  
//         return `{\n${entries}\n${indent}}`;
//       }
  
//       return String(obj);
//     };
  
//     return recursiveToString(object);
//   };
const obj2str = (object, useIndentation = true, indentLevel = 0) => {
    const recursiveToString = (obj, level = 0) => {
      const indent = useIndentation ? '  '.repeat(level) : '';
      const nextIndent = useIndentation ? '  '.repeat(level + 1) : '';
    if (Array.isArray(obj)) return arr2str(obj, false, level);
    if(obj instanceof Complex || obj instanceof Matrix) return obj.toString();
    if (typeof obj === 'object' && obj !== null) {
        const entries = Object.entries(obj)
          .map(([key, value]) => useIndentation 
            ? `${nextIndent}${key}: ${recursiveToString(value, level + 1)}` 
            : `${key}: ${recursiveToString(value, level + 1)}`
          ).join(useIndentation ? ",\n" : ", ");
  
        return useIndentation 
          ? `{\n${entries}\n${indent}}` 
          : `{${entries}}`;
      }
  
      return String(obj);
    };
  
    return recursiveToString(object, indentLevel);
  };
export{
    obj2str
}