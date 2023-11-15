import { complex } from "../Complex";
import { Matrix, matrix } from "../Matrix";
import { mapfun } from "./mapfun";
const AddNumberTo=a=>{
    return {
        Number:(...b)=>{
            return a+b
        },
        Array:(A)=>{
            const Y=[];
            for(let i=0;i<A.length;i++){
                if(typeof A[i]==="number")Y.push(a+A[i]);
                else {
                    if(A[i] instanceof Complex){
                        Y.push(complex(a+A[i].a,a+A[i].b));
                    }      
                    else if(A[i] instanceof Matrix){
                        Y.push(matrix(A[i].rows,A[i].cols,AddNumberTo(a).Array(A[i].arr.flat())))
                    }
                    else if(A[i] instanceof Array){
                        Y.push(AddNumberTo(a).Array(A[i]))
                    }
                }
            }
        return Y
        },
        Complex:(z)=>{
            return complex(z.a+a,z.b+a);
        },
        Matrix:(m)=>{
            return matrix(mapfun(n=>n+a,m.arr)) 
        }
    }
}
const add=(a,...n)=>{
    if(typeof a==="number")return AddNumberTo(a).Array([...n])
}
window.AddNumberTo=AddNumberTo
window._add=add
export {AddNumberTo}