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
- 🔰 [No Template Engines]()
- 🔰 [Flexible Integration with Popular Frameworks/Libraries]()
- 🔰 [Extensive Add-On Ecosystem]()
- 🔰 [The capability to function in both browser-based and Node.js environments]()
- 🔰 [Methodes Extracting]()
- 🔰 [Mathematical Utilities & Tips]()
- 🔰 [Rich UI elements]()
- 🔰 [Methodes Chaining]()
- 🔰 [Events Handling]()
- 🔰 [Functions decorators]()
- 🔰 [Reactivity]()
- 🔰 [Routing for Single Page Applications (SPA)]()
- 🔰 [Multithreading supports]
- 🔰 [Responsive Design based on Flex element and resize observer]()
- 🔰 [Loop and animations support]()

## ⭐️ Show your support <a name="support"></a>

If you appreciate the library, kindly demonstrate your support by giving it a star!<br>
[![Star](https://img.shields.io/github/stars/zakarialaoui10/ziko.js?style=social)](https://github.com/zakarialaoui10/ziko.js)
<!--## Financial support-->
# License 
This projet is licensed under the terms of MIT License 
<img src="https://img.shields.io/github/license/zakarialaoui10/zikojs?color=rgb%2820%2C21%2C169%29" width="100" align="right">

 





