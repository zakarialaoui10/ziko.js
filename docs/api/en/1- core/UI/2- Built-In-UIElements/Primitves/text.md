- **Text Elements :**
  - ***`text(...str : (string | number | boolean)[])`*** : Represents a standard text element.
    - `📦 .setValue(newTextContent : string, add : boolean)`
  - ***`p(UIElement : []ZikoUIElement)`*** : Represents a paragraph element
  
  **Usage**
   ```js
   const t1 = text("Hello World")
   const t2 = text("Hello from Zikojs").style({
    color: "darkblue"
   })
   const para = p(
    t1,
    t2
   )
   ```
- **Headings Elements :**
  - ***`h1(text : string)`*** : Represents the top-level heading.
  - ***`h2(text : string)`*** : Represents a second-level heading.
  - ***`h3(text : string)`*** : Represents a third-level heading.
  - ***`h4(text : string)`*** : Represents a fourth-level heading.
  - ***`h5(text : string)`*** : Represents a fifth-level heading.
  - ***`h6(text : string)`*** : Represents a sixth-level heading.