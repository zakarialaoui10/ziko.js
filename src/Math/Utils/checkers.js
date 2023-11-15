const isInRange=(x,min,max)=>{
    return x>=min && x<=max
}
const isApproximatlyEqual=(a,b,Err=0.0001)=>{
    return Math.abs(a-b)<=Err;
}
export{
    isInRange,
    isApproximatlyEqual
}