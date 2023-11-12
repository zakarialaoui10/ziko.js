# Get Started 
# Features 
 - ## Methodes Extracting :
   
```js
 Ziko.ExtractAll()
 // if you want to extract only UI methodes you can use Ziko.UI.Extractll()
```
🏷️ This method simplifies syntax by extracting all UI, Math, Time, Graphics, and other methods within the Ziko framework. Instead of writing specific namespace prefixes like `Ziko.UI.text("Hi")` or `Ziko.Math.complex(1,2)`, you can directly use simplified syntax such as `text("Hi")` and `complex(1,1)`.

⚠️ Be careful with this method because it will overwrite any existing global or local variables and functions with the same names as the extracted methods. 

 - ## Mathematical Utilities

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
 - ## Methodes Chaining 

```js
   text("hello world")
  .style({ color: "red" })
  .onPtrMove(throttle(() => console.log("hi")));
```
 - ## Events Handling
*** Example of creating simple Paint sketch using canvas and pointer events ***
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
 - ## Reactivity
 - ### Single Page Application
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
 - ## Multithreading supports
 

```js
Ziko.Multi(() => {
  s = 0;
  for (i = 0; i < 10000000000; i++) s += i;
  return s;
}, console.log);
 ```
 - loop and animations support 

<!--
## Math
The Math module serves as the fundamental building block for all UI elements, graphics, and animations in this system.
### Functions
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
 ### Matrix
 ### Complex
 ### Random
 ### Signal 
 ### Utils 
## UI
 ### Text
 ### List 
 ### Media 
 ### Input
 ### Table 
 ### Flex 
 ### Grid 
## Time
 ### loop
 ### animation
## Graphics
 ### Canvas
 ### Svg
 ### 3D 
## Events
 ### Pointer
  #### Simple Paint sketch
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
 ### Key
  ```
   const inp=input().onKeyDown(throttle(e=>console.log(e.kd),1000));
  ```
 ### Drag
## Reactivite
 ### Watch Size
 ### Watch Intersction
## Data
 ### Parser 
## Router 
 ### Single Page Application
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

 
 

# License 
This projet is licensed under the terms of MIT License .<br>
<img src="https://img.shields.io/github/license/zakarialaoui10/zikojs?color=rgb%2820%2C21%2C169%29">

 






