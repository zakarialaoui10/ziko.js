const objects2arr=data=>[Object.keys(data[0]),...data.map(n=>Object.values(n))];
const objects2csv=(data,delimiter)=>objects2arr(data).map(n=>n.join(delimiter)).join("\n")
const json2arr=json=>objects2arr(JSON.parse(json));
const json2csv=(json,delimiter)=>objects2csv(JSON.parse(json),delimiter);
window.oc=objects2csv
export{
    objects2arr,
    objects2csv,
    json2arr,
    json2csv
}
