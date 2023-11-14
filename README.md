<img src="assets/zikojs.png" width="150" height="150" align="right" alt="zikojs logo">

*💡 **Zikojs** a versatile JavaScript library offering a rich set of UI components, advanced mathematical utilities,Reactivity,animations,client side routing and graphics capabilities* 

<br>

# Features 
 - ## 🔰 Methodes Extracting :
   
```js
 Ziko.ExtractAll()
 // if you want to extract only UI methodes you can use Ziko.UI.Extractll()
```
🏷️ This method simplifies syntax by extracting all UI, Math, Time, Graphics, and other methods within the Ziko framework. Instead of writing specific namespace prefixes like `Ziko.UI.text("Hi")` , `Ziko.Math.complex(1,2)` , `Ziko.Math.matrix([[1,2],[2,3]])`, you can directly use simplified syntax such as `text("Hi")` , `complex(1,1)` and `matrix([[1,2],[2,3]])`.

⚠️ Be careful with this method because it will overwrite any existing global or local variables and functions with the same names as the extracted methods. 

 - ## 🔰 Mathematical Utilities

```js
 const a = cos(0);
 const b = sin(0,PI/2,PI)
 const c = ln([1,2,3])
 const d= cos({
             a:PI,
             b:PI/2,
             c:{
              d:PI/4,
              e:[PI,PI/2,PI/3,PI/4,PI/6]
         }})
```    
 - ## 🔰 Methodes Chaining 

```js
   text("hello world")
  .style({ color: "red" })
  .onPtrMove(throttle(() => console.log("hi")));
```
 - ## 🔰 Events Handling
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
 - ## 🔰 Functions decorators
   ```js
   const inp=input().onKeyDown(throttle(e=>console.log(e.kd),1000));
   ```
 - ## 🔰 Reactivity :
   You can watch Elements resizes , intersections , mutations ..
 - ## 🔰 Rich UI Elements Based on Math modules
   for example in `Table` you can use methodes like `hsatck` `vstack` `transpose` ...
 - ## 🔰 Routing for Single Page Applications (SPA)
 ```js
const main= Section()
const p1=Section()
const p2=Section()
S=Ziko.SPA(
   main,{
     "/page1":p1,
     "/svg":P2
 })
 ```

***⚠️ Ensure that your server serves only the index page for all incoming requests.*** 

***💡 Example using expressjs :***

```js
 app.get('*', (req , res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```
 - ## 🔰 Multithreading supports
 
```js
Ziko.Multi(() => {
  s = 0;
  for (i = 0; i < 10000000000; i++) s += i;
  return s;
}, console.log);
 ```
 - ## 🔰 Responsive Design using Flex element and resize observer
 - ## 🔰 Loop and animations support 



 
 

# License 
This projet is licensed under the terms of MIT License .<br>
<img src="https://img.shields.io/github/license/zakarialaoui10/zikojs?color=rgb%2820%2C21%2C169%29">

 






