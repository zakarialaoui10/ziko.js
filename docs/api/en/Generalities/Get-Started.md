# Getting Started
<img src="../../../assets/zikojs.png" width="200" align="right" alt="zikojs logo">
💡 Zikojs a versatile JavaScript library offering a rich set of UI components, advanced mathematical utilities,Reactivity,animations,client side routing and graphics capabilities .

This getting started describes how to install, link, load and use zikojs.

## Install 
Math.js can be installed via [npm]() :
```bash
 npm install zikojs
```
## Link or Donwload

zikojs can be downloaded or linked from various content delivery networks :

### CDN :
 #### Normal 
 ```html 
<script src="https://cdn.jsdelivr.net/gh/zakarialaoui10/ziko.js@main/dist/ziko.js"></script>
```
 #### Minified
  ```html 
<script src="https://cdn.jsdelivr.net/gh/zakarialaoui10/ziko.js@main/dist/ziko.min.js"></script>
```
### Unpkg
### jsDeliver
### pageCdn

## Load
zikojs can be used in node.js and in the browser. 
The library must be loaded and instantiated. When creating an instance,
 ### Es Module
```js
import Ziko from "ziko"
```
 ### Commonjs
```js
const Ziko=require("ziko")
```
 ### Browser 
## Extract methodes
You can extract all zikojs functions , classes and variables using : 
 ```js
  Ziko.ExtractAll()
 ```
🏷️ This method simplifies syntax by extracting all UI, Math, Time, Graphics, and other methods within the Ziko framework. Instead of writing specific namespace prefixes like ` Ziko.UI.text("Hi") ` , ` Ziko.Math.complex(1,2) ` , ` Ziko.Math.matrix([[1,2],[2,3]]) `, you can directly use simplified syntax such as ` text("Hi") ` , ` complex(1,1) ` and ` matrix([[1,2],[2,3]]) `.

⚠️ Be careful with this method because it will overwrite any existing global or local variables and functions with the same names as the extracted methods.

## Features
## Addons
 soon ...
## Interfacing 
 soon ...

