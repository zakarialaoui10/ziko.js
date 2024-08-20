const obj2str=(object)=>{
    // Helper function to handle recursion
    const recursiveToString = (obj) => {
      if (Array.isArray(obj)) {
        return obj.toString();
      } else if (typeof obj === 'object' && obj !== null) {
        return `{ ${Object.entries(obj)
          .map(([key, value]) => `${key}:${recursiveToString(value)}`)
          .join(" , ")} }`;
      } else {
        return String(obj); 
      }
    };
  
    return recursiveToString(object);
  };
export{
    obj2str
}