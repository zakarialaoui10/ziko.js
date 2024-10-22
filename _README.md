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
### 🔰 No Template Engines :

zikojs UI module adopts a distinctive approach to building and updating user interfaces. 
It doesn't rely on predefined markup templates. Instead, it leverages a hyperscript-like syntax to dynamically create and update user interfaces.

<details>
<summary> See More </summary>

For instance, consider the following JavaScript code using zikojs:
```js
 para=p(
    text("hello"),
    text("world")
    )
    .style({
        color:"darkblue"
    })
    .forEach(n=>n.onPtrEnter(e=>{
        console.log(e.target.text)
    }));
```
`p(...)` - This line creates a paragraph element (&lt;p&gt;) using zikojs. Inside the p() function, we pass in two text() function calls, which create text nodes containing "hello" and "world" respectively. These will be the contents of the paragraph.

`.style({...})` - This method sets the style of the paragraph element. In this case, it sets the color to "darkblue".

`.forEach(...)` - This method iterates over the two items of the paragraph element. Inside the callback function, it sets up an event listener for the "pointerenter" event on each child element. When the pointer enters any child element, it logs the text content of that element to the console.

>[!TIP]
To acces the para items you can use Array like syntaxe , `para[index]` or `para.at(index)` (index can positive or negative integer)

This code snippet produces the equivalent HTML structure:
```html
 <p style="color:darkblue">
    <span>hello</span>
    <span>world</span>
 </p>
 <script>
    para=document.querySelector(p);
    [...a.children].forEach(
        n=>n.addEventListener("pointerenter",e=>{
            console.log(e.target.textContent)
            }))
 </script>
```
In summary, zikojs UI module enables dynamic creation and manipulation of user interfaces without relying on static markup templates, offering flexibility and control over UI elements.

</details>



### 🔰 Flexible Integration with Popular Frameworks/Libraries

You can integrate it inside other frameworks/libraries like React , Vue , Svelte ... To do so, all you need to do is install the [ziko-wrapper](https://www.npmjs.com/package/ziko-wrapper) package.

### 🔰 Extensive Add-On Ecosystem

|Addon|Purpose|Dependecy|Links|
|-|-|-|-|
|ziko-gl|-|`Three.js`|[NPM](https://www.npmjs.com/package/zikogl) [GITHUB](https://github.com/zakarialaoui10/zikogl/)|
|ziko-chart|-|`Chart.js`<br>`D3.js`|[NPM](https://www.npmjs.com/package/ziko-chart) [GITHUB](https://github.com/zakarialaoui10/ziko-chart/)|
|ziko-xls|-|`Xls.js`<br>`Hansontable.js`<br>|[NPM](https://www.npmjs.com/package/ziko-xls) [GITHUB](https://github.com/zakarialaoui10/ziko-xls/)|
|ziko-pdf|-|`jsPdf.js`<br>`Pdf.js`<br>|[NPM](https://www.npmjs.com/package/ziko-pdf) [GITHUB](https://github.com/zakarialaoui10/ziko-pdf/)|
|ziko-lottie|render Lottie file within zikojs app|`Lottie-web`|[NPM](https://www.npmjs.com/package/ziko-lottie) [GITHUB](https://github.com/zakarialaoui10/ziko-lottie/)|
### 🔰 The capability to function in both browser-based and Node.js environments
### 🔰 Methodes Extracting

<details>
 <summary>
  See More
 </summary>
 
 ```js
 Ziko.ExtractAll()
 // if you want to extract only UI methodes you can use Ziko.UI.Extractll()
```
🏷️ This method simplifies syntax by extracting all UI, Math, Time, Graphics, and other methods within the Ziko framework. Instead of writing specific namespace prefixes like `Ziko.UI.text("Hi")` , `Ziko.Math.complex(1,2)` , `Ziko.Math.matrix([[1,2],[2,3]])`, you can directly use simplified syntax such as `text("Hi")` , `complex(1,1)` and `matrix([[1,2],[2,3]])`.

⚠️ Be careful with this method because it will overwrite any existing global or local variables and functions with the same names as the extracted methods. 
</details>

### 🔰 Mathematical Utilities & Tips
### 🔰 Rich UI elements
### 🔰 Methodes Chaining
It allows multiple methods to be called sequentially on an object, enhancing code readability and conciseness.
<details>
<summary> See More </summary>
</details>

### 🔰 Events Handling

<details>
<summary>
See More
</summary>

Example of creating simple Paint sketch using canvas and pointer events : 
```js
Scene=Canvas().size("500px","500px")
Scene.onPtrDown(e=>{
    e.target.ctx.beginPath()
    e.target.ctx.moveTo(
        map(e.dx,0,e.target.element.offsetWidth,e.target.Xmin,e.target.Xmax),
        map(e.dy,0,e.target.element.offseHeight,e.target.Ymin,e.target.Ymax)
        )
})
Scene.onPtrMove(e=>{
    if(e.isDown){
        const x=map(e.mx,0,e.target.element.offsetWidth,e.target.axisMatrix[0][0],e.target.axisMatrix[1][0])
        const y=map(e.my,0,e.target.element.offsetHeight,e.target.axisMatrix[1][1],e.target.axisMatrix[0][1])
        e.target.append(canvasCircle(x,y,1).color({fill:"#5555AA"}).fill())
   }})

Scene.onPtrUp(()=>{})
  ```
</details>

### 🔰 Functions decorators

```js
   const inp=input().onKeyDown(throttle(e=>console.log(e.kd),1000));
```

### 🔰 Reactivity
### 🔰 Routing for Single Page Applications (SPA)

Zikojs has a built-in Single page application router based on history browser api

<details>
 <summary>
  <strong> See More </strong>
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


### 🔰 Multithreading supports

 ```js
useThread(() => {
  s = 0;
  for (i = 0; i < 10000000000; i++) s += i;
  return s;
}, console.log);
 ```
 
### 🔰 Responsive Design based on Flex element and resize observer
### 🔰 Loop and animations support

## ⭐️ Show your support <a name="support"></a>

If you appreciate the library, kindly demonstrate your support by giving it a star!<br>
[![Star](https://img.shields.io/github/stars/zakarialaoui10/ziko.js?style=social)](https://github.com/zakarialaoui10/ziko.js)
<!--## Financial support-->
# License 
This projet is licensed under the terms of MIT License 
<img src="https://img.shields.io/github/license/zakarialaoui10/zikojs?color=rgb%2820%2C21%2C169%29" width="100" align="right">

 





