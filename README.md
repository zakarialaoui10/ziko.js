<img src="documentation/assets/zikojs.png" width="200" align="right" alt="zikojs logo">

*💡 **Zikojs** a versatile JavaScript library offering a rich set of UI components, advanced mathematical utilities,Reactivity,animations,client side routing and graphics capabilities* 

<br>


**⏳ It will be released soon ... ⏳**


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
 - ## 🔰 Rich UI elements
| HTML Element      | Description              |Syntaxe   |
|---|---|---|
| `ZikoHtml`        | Custom HTML element      |
| `text`            | Text content             |
| `p`               | Paragraph                |
| `h1-h6`           | Headings 1-6             |
| `btn`             | Button                   |
| `br`              | Line break               |
| `hr`              | Horizontal rule          |
| `brs`             |         |
| `hrs`             |    |
| `link`            | Link                     |
| `ol`              | Ordered list             |
| `ul`              | Unordered list           |
| `input`           | Input                    |
| `search`          | Search input             |
| `slider`          | Slider input             |
| `checkbox`        | Checkbox input           |
| `radio`           | Radio button input       |
| `datalist`        | Data list input          |
| `inputNumber`     | Number input             |
| `inputColor`      | Color input              |
| `inputDate`       | Date input               |
| `inputDateTime`   | Date-time input          |
| `inputEmail`      | Email input              |
| `inputImage`      | Image input              |
| `inputPassword`   | Password input           |
| `inputTime`       | Time input               |
| `select`          | Select dropdown          |
| `textarea`        | Text area                |
| `inputCamera`     | Camera input             |
| `image`           | Image element            |
| `video`           | Video element            |
| `audio`           | Audio element            |
| `figure`          | Figure element           |
| `Flex`            | Flex container           |
| `Carousel`        | Carousel container       |
| `Grid`            | Grid container           |
| `Header`          | Header section           |
| `Main`            | Main section             |
| `Section`         | Section                  |
| `Article`         | Article section          |
| `Aside`           | Aside section            |
| `Nav`             | Navigation section       |
| `Footer`          | Footer section           |
| `Table`           | Table element            |
| `CodeNote`        | Code note                |
| `Tabs`            | Tabs container           |
| `Accordion`       | Accordion container      |
| `Canvas`          | Canvas element           |
| `Svg`             | SVG Container            |
| `Menu`            | Menu element             |
| `Popup`           | Popup element            |
| `Popover`         | Popover element          |
| `Timeline`        | Timeline element         |
| `Swipper`         | Swipper element          |
| `Toast`           | Toast element            |
| `Treeview`        | Treeview element         |
| `Columns`         | Columns element          |

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
This projet is licensed under the terms of MIT License 
<img src="https://img.shields.io/github/license/zakarialaoui10/zikojs?color=rgb%2820%2C21%2C169%29" width="100" align="right">

 






