<img src="docs/assets/zikojs.png" width="200" align="right" alt="zikojs logo">

*💡 **Zikojs** a versatile JavaScript library offering a rich set of UI components, advanced mathematical utilities,Reactivity,animations,client side routing and graphics capabilities* 

<br>

# Install 
```bash
npm install ziko
```
# ⚡ Get started
## Node
 ```bash
  npx create-ziko-app [My_App]
 ```
  ```
  cd [My_App]
  npm run dev
  ```
## Browser
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zikojs</title>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/npm/ziko@latest/dist/ziko.js"></script>
    <script>
        Ziko.ExtractAll()
        const hello = p("Hello World").style({
            color: "gold",
            fontSize: "30px",
            fontWeight: "bold"
            })
            .onPtrEnter(e=>e.target.st.color(Random.color()))
            .onPtrLeave(e=>e.target.st.color("gold"))
        Ziko.App(
            hello
        ).style({
            width: "100vw",
            height: "100vh",
            background: "darkblue"
            }).vertical(0, "space-around")
        
    </script>
</body>
</html>
```
## Documentation
## 🎬 Demos 
- ### [  Windows entanglement using zikojs and ziko-three ](https://www.linkedin.com/feed/update/urn:li:activity:7144023650394918913/) 

## 📃 [wiki](https://github.com/zakarialaoui10/ziko.js/wiki)

## 💡 [Features]() 

<details>
 <summary>
  <strong> 🔰 The capability to function in both browser-based and Node.js environments
  </strong>
 </summary>
</details>
<details>
 <summary>
  <strong> 🔰 Methodes Extracting  </strong>
 </summary>
 
 ```js
 Ziko.ExtractAll()
 // if you want to extract only UI methodes you can use Ziko.UI.Extractll()
```
🏷️ This method simplifies syntax by extracting all UI, Math, Time, Graphics, and other methods within the Ziko framework. Instead of writing specific namespace prefixes like `Ziko.UI.text("Hi")` , `Ziko.Math.complex(1,2)` , `Ziko.Math.matrix([[1,2],[2,3]])`, you can directly use simplified syntax such as `text("Hi")` , `complex(1,1)` and `matrix([[1,2],[2,3]])`.

⚠️ Be careful with this method because it will overwrite any existing global or local variables and functions with the same names as the extracted methods. 
</details>

<details>
 <summary>
  <strong> 🔰 Mathematical Utilities & Tips </strong>
 </summary>

 ### mapfun  
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

You may not necessarily rely on the mapfun utility every time, as ZikoJS offers a variety of built-in mathematical functions that built on the top of `mapfun` and the Math module in javascript .

Here you will find the built in Mathematic functions in zikojs

`abs(...x)`,`sqrt(...x)`,`pow(x,n)`,`sqrtn(x,n)`,`e(...x)`,`ln(...x)`,`cos(...x)`,`sin(...x)`,`tan(...x)`,`sinc(...x)`,`acos(...x)`,`asin(...x)`,`atan(...x)`,`cosh(...x)`,`sinh(...x)`,`acosh(...x)`,`asinh(...x)`,`atanh(...x)`,`cot(...x)`,`sec(...x)`,`csc(...x)`,`acot(...x)`,`coth(...x)`,`acosh(...x)`,`asinh(...x)`,`atanh(...x)`,`atan2(x,y,?rad)`,`hypot(...x)`,`min(...x)`,`max(...x)`,`sign(...x)`,`sig(...x)`,`fact(...x)`,`round(...x)`,`floor(...x)`,`ceil(...x)`

### Matrix
### Complex
</details>
<details>
 <summary>
  <strong> 🔰 Rich UI elements </strong>
 </summary>
</details>
<details>
 <summary>
  <strong> 🔰 Methodes Chaining </strong>
 </summary>
 
  ```js
   text("hello world")
  .style({ color: "red" })
  .onPtrMove(useThrottle(() => console.log("hi")));
```
 </details>

<details>
 <summary>
  <strong> 🔰 Events Handling</strong>
 </summary>

 Example of creating simple Paint sketch using canvas and pointer events : 
```js
const Scene=Canvas().view(-10,-10,10,10).size(500,500).adjust()
c.onPtrDown(e=>{
    c.ctx.beginPath()
    c.ctx.moveTo(
        map(e.dx,0,c.element.offsetWidth,c.Xmin,c.Xmax),
        map(e.dy,0,c.element.offseHeight,c.Ymin,c.Ymax)
        )
})
c.onPtrMove(e=>{
    if(e.isDown){
        const x=map(e.mx,0,c.element.offsetWidth,c.axisMatrix[0][0],c.axisMatrix[1][0])
        const y=map(e.my,0,c.element.offsetHeight,c.axisMatrix[1][1],c.axisMatrix[0][1])
        c.append(canvasCircle(x,y,1).color({fill:"#5555AA"}).fill())
   }
c.onPtrUp(()=>{})
  ```
</details>

<details>
 <summary>
  <strong> 🔰 Functions decorators </strong>
 </summary>

 ```js
   const inp=input().onKeyDown(throttle(e=>console.log(e.kd),1000));
   ```
</details>

<details>
 <summary>
  <strong> 🔰 Reactivity </strong>
 </summary>

 ### Events
 ### Observers
 ### Use

</details>

<details>
 <summary>
  <strong> 🔰 Rich UI Elements Based on Math modules </strong>
 </summary>
     for example in `Table` you can use methodes like `hsatck` `vstack` `transpose` ...
</details>

<details>
 <summary>
  <strong> 🔰 Routing for Single Page Applications (SPA) </strong>
 </summary>

```js
const main= Ziko.App()
const p1=Section()
const p2=Section()
S=Ziko.SPA(
   main,{
     "/page1":p1,
     "/page2":p2
 })
// You can use regex to define routes
S.get(
 pattern,
 path=>handler(path)
)
 ```

***⚠️ Ensure that your server serves only the index page for all incoming requests.*** 

***💡 Example using expressjs :***

```js
 app.get('*', (req , res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```
</details>

<details>
 <summary>
  <strong>🔰 Multithreading supports</strong>
 </summary>

 ```js
useThread(() => {
  s = 0;
  for (i = 0; i < 10000000000; i++) s += i;
  return s;
}, console.log);
 ```
</details>

<details>
 <summary>
  <strong> 🔰 Responsive Design using Flex element and resize observer </strong>
 </summary>
</details>

<details>
 <summary>
  <strong> 🔰 Loop and animations support </strong>
 </summary>
</details>



## ⭐️ Show your support <a name="support"></a>

If you appreciate the library, kindly demonstrate your support by giving it a star!<br>
[![Star](https://img.shields.io/github/stars/zakarialaoui10/ziko.js?style=social)](https://github.com/zakarialaoui10/ziko.js)
<!--## Financial support-->
# License 
This projet is licensed under the terms of MIT License 
<img src="https://img.shields.io/github/license/zakarialaoui10/zikojs?color=rgb%2820%2C21%2C169%29" width="100" align="right">

 






