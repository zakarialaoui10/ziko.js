 📝 Javascript provides a built-in Math module with various functions. 

⚠️However, there is room for improvement in terms of efficiency. For instance, the Math.sqrt(x) function can calculate the square root of a number x, but it has limitations such as the inability to accept multiple parameters and the inability to map the function to different data types like Arrays and Objects.

💡 In zikojs, I have addressed these limitations, providing a more versatile and efficient solution.

📋 Example : 
|zikojs|Vanilla js Equivalent|
|-|-|
|`sqrt(9)`|`sqrt(9)`|
|`sqrt(4,9,16)`|`[Math.sqrt(4),Math.sqrt(9),Math.sqrt(16)]`|
|`sqrt([4,9,16])`|`[Math.sqrt(4),Math.sqrt(9),Math.sqrt(16)]`|
|`sqrt([4,9],16)`|`[[Math.sqrt(4),Math.sqrt(9)],Math.sqrt(16)]`|
|`sqrt({x:4,y:9})`|`{x:sqrt(4),sqrt(9)}`|


📢 Generally, zikojs allows you to input an infinite number of parameters, including deep arrays, objects, Maps, Sets, and more. The return value retains the input structure and calculates the result for each element accordingly.

📋 For Example : 
```js
sqrt({
    a:1,
    b:2,
    c:[3,4],
    d:[[
        [5,6]
        ]],
    e:{
        f:[
            {g:7}
            ]
    },
    h:new Map([["i",8],["j",9]]),
    k:{
        l:{
            m:new Set([10,11])
        },
        n:[12]
    }
})
```
This would return : 
```js
{
    a:sqrt(1),
    b:sqrt(2),
    c:[sqrt(3),sqrt(4)],
    d:[[
        [sqrt(5),sqrt(6)]
        ]],
    e:{
        f:[
            {g:sqrt(7)}
            ]
    },
    h:new Map([["i",sqrt(8)],["j",sqrt(9)]]),
    k:{
        l:{
            m:new Set([sqrt(10),sqrt(11)])
        },
        n:[sqrt(12)]
    }
}
```

💡 You can apply this approach to build your custom function ;
```js
 import {mapfun} from "ziko";
 const parabolic_func=(a,b,c,x)=>a*(x**2)+b*x+c;
 const parabol=(a,b,c,...X)=>mapfun(n=>parabolic_func(a,b,c,n),...X)
 const a=-1.5,b=2,c=3;
 X0=[0,1,2,3];
 X1={x10:0,x11:1,x12:2,x13:3}
 console.log(parabol(a,b,c,X0));
 // [3,3,1,3]
 console.log(parabol(a,b,c,X1));
 // {x10: 3,x11: 3,x12: 1,x13: -3}
 console.log(parabol(a,b,c,X0,X1))
 /*
 [
    [3,3,1,3],
    {x10: 3,x11: 3,x12: 1,x13: -3}
    ]
 */
```
Or you can use the currying syntaxe :
```js
 import {mapfun} from "ziko";
 const parabolic_func=(a,b,c,x)=>a*(x**2)+b*x+c;
 const map_parabolic_func=(a,b,c)=>(...X)=>mapfun(n=>parabolic_func(a,b,c,n),...X);
 const a=-1.5,b=2,c=3;
 const X=[0,1,2,3];
 console.log(parabolic_func(a,b,c)(X));
 // [3,3,1,3]
```
If you find the mapfun utility particularly useful and wish to use it independently, I have created a standalone micro package named mapfun. This micro package contains only the mapfun functions, allowing you to integrate it seamlessly into your projects without the need for the entire zikojs library.

For more information and to explore the mapfun micro package, visit [mapfun](https://github.com/zakarialaoui10/mapfun) on GitHub .

You may not necessarily rely on the mapfun utility every time, as ZikoJS offers a variety of built-in mathematical functions that built on the top of `mapfun` and the Math module in javascript .

Here you will find the built in Mathematic functions in zikojs

- <code id="ziko-math-functions-abs">abs(...x)</code> : Calculate the absolute value of the arguments `(...X)`
- <code id="ziko-math-functions-sqrt">sqrt(...x)</code>  
- <code id="ziko-math-functions-pow">pow(x,n)</code> 
- <code id="ziko-math-functions-sqrtn">sqrtn(x,n)</code>  
- <code id="ziko-math-functions-e">e(...x)</code>  
- <code id="ziko-math-functions-ln">ln(...x)</code>  
- <code id="ziko-math-functions-cos">cos(...x)</code>  
- <code id="ziko-math-functions-sin">sin(...x)</code>  
- <code id="ziko-math-functions-tan">tan(...x)</code>  
- <code id="ziko-math-functions-sinc">sinc(...x)</code>  
- <code id="ziko-math-functions-acos">acos(...x)</code>  
- <code id="ziko-math-functions-asin">asin(...x)</code>  
- <code id="ziko-math-functions-atan">atan(...x)</code>  
- <code id="ziko-math-functions-cosh">cosh(...x)</code>  
- <code id="ziko-math-functions-sinh">sinh(...x)</code>  
- <code id="ziko-math-functions-acosh">acosh(...x)</code>  
- <code id="ziko-math-functions-asinh">asinh(...x)</code>  
- <code id="ziko-math-functions-atanh">atanh(...x)</code>  
- <code id="ziko-math-functions-cot">cot(...x)</code>  
- <code id="ziko-math-functions-sec">sec(...x)</code>  
- <code id="ziko-math-functions-csc">csc(...x)</code>  
- <code id="ziko-math-functions-acot">acot(...x)</code>  
- <code id="ziko-math-functions-coth">coth(...x)</code>  
- <code id="ziko-math-functions-acosh">acosh(...x)</code>  
- <code id="ziko-math-functions-asinh">asinh(...x)</code>  
- <code id="ziko-math-functions-atanh">atanh(...x)</code>  
- <code id="ziko-math-functions-atan2">atan2(x,y,?rad)</code>  
- <code id="ziko-math-functions-hypot">hypot(...x)</code>  
- <code id="ziko-math-functions-min">min(...x)</code>  
- <code id="ziko-math-functions-max">max(...x)</code>  
- <code id="ziko-math-functions-sign">sign(...x)</code>  
- <code id="ziko-math-functions-sig">sig(...x)</code>  
- <code id="ziko-math-functions-fact">fact(...x)</code>  
- <code id="ziko-math-functions-round">round(...x)</code>  
- <code id="ziko-math-functions-floor">floor(...x)</code>  
- <code id="ziko-math-functions-ceil">ceil(...x)</code>  
