import { complex } from "../Complex/index.js";
import {fft,ifft} from "./fft.js";
// should be processed in other thread
class Filter{
    constructor(input){
        this.input=input;
        this.input_fft=fft(this.input);
        this.output_fft=[]
    }
    // get length(){
    //     return this.input.length;
    // }
    lowPass(fc){
        this.input_fft.output.forEach((n,i)=>{
            n=n.z<fc
            ? this.output_fft[i]=this.input_fft.output[i]
            : this.output_fft[i]=complex(0,0)
        })
        return ifft(this.output_fft).re;
    }
    highPass(fc){
        this.input_fft.output.forEach((n,i)=>{
            n=n.z>fc
            ? this.output_fft[i]=this.input_fft.output[i]
            : this.output_fft[i]=complex(0,0)
        })
        return ifft(this.output_fft).re;
    }
    bandePass(){

    }
    bandeCoupe(){

    }
}
const filter=input=>new Filter(input);
export{
    filter
}