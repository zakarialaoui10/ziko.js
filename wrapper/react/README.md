# Overview
react-ziko is a tool designed for rendering [ziko](https://github.com/zakarialaoui10/ziko.js) elements within a React application.

# Install 
```bash
  npm i react-ziko
```
# Usage
```jsx
import ZikoUI from "react-ziko";
import { text } from "ziko";
const ui = text("Hello World").style({
    color:"darkblue"
});
export default function App() {
  return (
    <main>
      <ZikoUI ui={ui.render(false)} />
    </main>
  );
}

```
# Dependencies
 - [React](https://react.dev/) :  
 - [Zikojs](https://github.com/zakarialaoui10/ziko.js) :