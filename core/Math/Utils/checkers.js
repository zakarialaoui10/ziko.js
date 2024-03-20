const inRange=(x,a,b)=>{
    const [min,max]=[Math.min(a,b),Math.max(a,b)]
    return x>=min && x<=max
}
const isApproximatlyEqual=(a,b,Err=0.0001)=>{
    return Math.abs(a-b)<=Err;
}
export{
    inRange,
    isApproximatlyEqual
}