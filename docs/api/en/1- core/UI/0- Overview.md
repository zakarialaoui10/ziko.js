zikojs UI module adopts a distinctive approach to building and updating user interfaces. 
It doesn't rely on predefined markup templates. Instead, it leverages a hyperscript-like syntax to dynamically create and update user interfaces.

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
