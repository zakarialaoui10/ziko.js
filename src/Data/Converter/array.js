import { Complex } from "../../Math/Complex";
const arr2str=(array)=>{
    const stringifyArray = (arr) => {
      return arr.map(item => {
        if (Array.isArray(item)) {
          // Recursively handle nested arrays
          return `[${stringifyArray(item)}]`;
        } else if (item instanceof Complex) {
          // Use Complex's own toString method
          return item.toString();
        } else {
          // Convert other items to string
          return item.toString();
        }
      }).join(', ');
    };
  
    return `[${stringifyArray(array)}]`;
  };

export{
    arr2str
}