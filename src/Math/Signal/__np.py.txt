import numpy as np
lin_R=np.linspace(1,10,10,)
lin_C=np.linspace(10j+1,10+1j,10)
print("Linspace")
print(lin_R)
print("-"*70)
print(lin_C)
log_R=np.logspace(1,10,10, base = 2)
log_C=np.logspace(10j+1,10+1j,10 , base = 2)
print("-"*70)
print("Logspace")
print(log_R)
print("-"*70)
print(log_C)
geo_R=np.geomspace(1,512,10)
geo_C=np.geomspace(1+1j,512+512j,10)
print("-"*70)
print("geomspace")
print(geo_R)
print("-"*70)
print(geo_C)


# // const logspace=(a,b,n=b-a+1,base=E,endpoint=true)=>{
# //     if(a instanceof Complex||b instanceof Complex){
# //         a=complex(a);
# //         b=complex(b);
# //         n=n??abs(b.a-a.a)
# //         const X=linspace(a.a,b.a,n,base,endpoint);
# //         const Y=linspace(a.b,b.b,n,base,endpoint);
# //         const Z=new Array(X.length).fill(0)
# //         const ZZ=Z.map((n,i) => pow(base,complex(X[i],Y[i])));
# //         return ZZ;
# //     }
# //     const start=base**min(a,b);
# //     const stop=base**max(a,b);
# //     const y = linspace(ln(start) / ln(base), ln(stop) / ln(base), n, endpoint);
# //     const result=y.map(n => pow(base, n));
# //     return a<b?result:result.reverse();
# // }