import { Complex , complex } from "../Complex";
import { PI } from "../const";
import { cos , sin  } from "../Functions";
const fft=x=>{
    const output = [];
    const N = x.length;
    if(!(x[0]instanceof Complex))x=x.map((n)=>complex(n,0));
    for (let k = 0; k < N; k++) {
      let re = 0,im=0;
      for (let n = 0; n < N; n++) {
        const phi = (2*PI * k * n) / N;
        re += x[n].a*cos(phi)+x[n].b*sin(phi);
        im += -x[n].a*sin(phi)+x[n].b*cos(phi);
      }
      re = re / N;
      im = im / N;
      output[k] = complex(re,im);
    }
    return {
        output,
        re:output.map(n=>n.a),
        im:output.map(n=>n.b),
        z:output.map(n=>n.z),
        phi:output.map(n=>n.phi)
    }
  }
  const ifft=x=>{
    const output = [];
    const N = x.length;
      if(!(x[0]instanceof Complex))x=x.map((n)=>complex(n,0));
    for (let k = 0; k < N; k++) {
      let re=0,im=0;
      for (let n = 0; n < N; n++) {
        const phi = (2*PI * k * n) / N;
        re += x[n].a*cos(phi)+x[n].b*sin(phi);
        im += x[n].a*sin(phi)+x[n].b*cos(phi);
      }
      re = re / N;
      im = im / N;
  
      output[k] = complex(re,im);
    }
    return {
        output,
        re:output.map(n=>n.a),
        im:output.map(n=>n.b),
        z:output.map(n=>n.z),
        phi:output.map(n=>n.phi)
    };
  }

export{
    fft,
    ifft
}