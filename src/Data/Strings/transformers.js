const camel2hiphencase=text=>{
    const arr=text.split("");
    for(let i=0;i<arr.length;i++){
        if(arr[i]<="Z"&&arr[i]>="A")
        arr[i]="-"+arr[i].toLowerCase()
    }
    return arr.join("")
}
const camel2snakecase=text=>{
    const arr=text.split("");
    for(let i=0;i<arr.length;i++){
        if(arr[i]<="Z"&&arr[i]>="A")
        arr[i]="_"+arr[i].toLowerCase()
    }
    return arr.join("")
}
export{
    camel2hiphencase,
    camel2snakecase
}
