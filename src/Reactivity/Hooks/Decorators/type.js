function useType(func, ...expectedTypes) {
  const argNames = func.toString()
    .match(/\(([^)]*)\)/)[1]
    .split(',')
    .map(arg => arg.trim());
  return function(...args) {
    const lastExpectedType = expectedTypes[expectedTypes.length - 1];
    for (let i = 0; i < args.length; i++) {
      const isRestParam = i >= expectedTypes.length;
      const expectedType = isRestParam ? lastExpectedType : expectedTypes[i];
      const arg = args[i];
      const argName = isRestParam ? `${argNames[argNames.length - 1]}[${i - expectedTypes.length + 1}]` : argNames[i] || `Argument ${i + 1}`;
      let isValid = false;
      if(typeof expectedType === "object"){
        if (expectedType.or) {
          for (const type of expectedType.types) {
            if (checkTypeOrInstance(type, arg)) {
              isValid = true;
              break;
            }
          }
        }
        if (expectedType.nor) {
          for (const type of expectedType.types) {
            if (checkTypeOrInstance(type, arg)) {
              isValid = false;
              break;
            }
            isValid = true
          }
        } 
        else if (expectedType.not) isValid = !checkTypeOrInstance(expectedType.type, arg);
      }
      else isValid = checkTypeOrInstance(expectedType, arg);
      // Should Fix Nor error Message
      if (!isValid) {
        // const expectedTypeName = typeof expectedType === 'object'
        //   ? expectedType.or
        //     ? expectedType.types.map(type => (typeof type === 'string' ? type : type.name)).join(' or ')
        //     : expectedType.not
        //     ? `not ${typeof expectedType.type === 'string' ? expectedType.type : expectedType.type.name}`
        //     : Array.isArray(expectedType)
        //     ? `[${expectedType.map(type => (typeof type === 'string' ? type : type.name)).join(', ')}]`
        //     : `{${Object.entries(expectedType).map(([key, type]) => `${key}: ${typeof type === 'string' ? type : type.name}`).join(', ')}}`
        //   : typeof expectedType === 'string'
        //   ? expectedType
        //   : expectedType.name;
        // throw new TypeError(`${argName} should be of type ${expectedTypeName}`);
        throw new TypeError("jjj")
      }
    }
    return func(...args);
  };
}

function useOr(...types) {
  return { or: true, types };
}
function useNot(type) {
  return { not: true, type };
}
function useNor(...types){
  return { nor: true, types}
}
const checkTypeOrInstance = (type, arg) => {
  if (typeof type === 'string') return typeof arg === type;
  else if (type instanceof Function) return arg instanceof type;
  else if (Array.isArray(type)) 
    return (!Array.isArray(arg) || arg.length !== type.length)? false: arg.every((item, index) => checkTypeOrInstance(type[index], item));  
  else if (typeof type === 'object' && !Array.isArray(type)) 
    return (typeof arg !== 'object' || arg === null)? false : Object.keys(type).every(key => key in arg && checkTypeOrInstance(type[key], arg[key]))  
  return false;
};
globalThis.useType = useType
globalThis.useNot = useNot
globalThis.useOr = useOr

function add(a, b = 0){
  return a+b
 }
 
add = useType(add,"number",useNor("string","number"))
 
console.log(add(1))

export{
  useType
}