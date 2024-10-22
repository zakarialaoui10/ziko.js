<img src="docs/assets/zikojs.png" width="200" align="right" alt="zikojs logo">

*💡 **Zikojs** a versatile JavaScript library offering a rich set of UI components, advanced mathematical utilities,Reactivity,animations,client side routing and graphics capabilities* 

## Features :

### 🔰 No Template Engines :
zikojs UI module adopts a distinctive approach to building and updating user interfaces. It doesn't rely on predefined markup templates. Instead, it leverages a hyperscript-like syntax to dynamically create and update user interfaces.

### 🔰 Built in File-Based Routing with Single Page Application

ZikoJS provides an intuitive file-based routing mechanism that simplifies the development of single-page applications. By organizing your page components into a directory structure, you can automatically generate routes based on the file paths. This approach enhances the maintainability of your code by allowing you to easily manage and navigate between different views in your application.

To implement file-based routing, simply use the following code:

```js
import { FileBasedRouting } from "ziko";
FileBasedRouting(import.meta.glob("./src/pages/**/*.js"))
```
In this example, the import.meta.glob function dynamically imports all JavaScript files from the specified directory (./src/pages/**). Each file represents a separate route in your application, allowing you to create a clean and organized routing structure without the need for manual route configuration.

### 🔰 Flexible Integration with Popular Frameworks/Libraries

**ZikoJS** is designed to seamlessly integrate into other frameworks and libraries. By installing the [ziko-wrapper](https://github.com/zakarialaoui10/ziko-wrapper) package, you can easily use ZikoJS within your favorite frontend ecosystems.

Currently supported frameworks: 
 - ***REACT***
 - ***Solid***
 - ***Preact***
 - ***Svelte***
 - ***Vue***

### 🔰 Custom Markdown Parser 

[Mdzjs](https://github.com/zakarialaoui10/mdzjs) allowing you to write markdown content alongside Zikojs Elements 

```md
---
 module : 
  - import InteractiveBlock from "./InteractiveBlock"
 title : Article 1
---

# Hello World this is markdown heading 

<InteractiveBlock data = "Hello" />
```

### 🔰 Growing Add-On Ecosystem

|Addon|Purpose|Dependencies|Repository|
|-|-|-|-|
|ziko-gl||`threejs`|
|ziko-code||`codeMirror`||
|ziko-chart||`chartjs`||
|ziko-pdf||`jsPdf.js`||
|ziko-xls||`xls.js`||
|ziko-lottie||`Lottie-web`|
|ziko-rough||`rough.js`|
|ziko-icons||`fontawesome`|
|ziko-tippy||`tippy.js`|

