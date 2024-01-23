const _objects2arr=data=>[Object.keys(data[0]),...data.map(n=>Object.values(n))];
const _objects2csv=(data,delimiter)=>_objects2arr(data).map(n=>n.join(delimiter)).join("\n")
const json2arr=json=>json instanceof Object?_objects2arr(json):_objects2arr(JSON.parse(json));
const json2csv=(json,delimiter)=>json instanceof Object?_objects2csv(json,delimiter):_objects2csv(JSON.parse(json),delimiter);
function _processObject(obj, indent) {
    const yamlLines = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if (typeof value === 'object' && value !== null) {
                yamlLines.push(`${indent}${key}:`);
                const nestedLines = _processObject(value, `${indent}  `);
                yamlLines.push(...nestedLines);
            } else {
                yamlLines.push(`${indent}${key}: ${value}`);
            }
        }
    }

    return yamlLines;
}

const _object2yml=(object,indent="")=>_processObject(object,indent).join('\n')
const json2yml=(json,indent)=>json instanceof Object?_object2yml(json,indent):_object2yml(JSON.parse(json),indent)




export{
    json2arr,
    json2csv,
    json2yml
}
