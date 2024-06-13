## Introduction

**`ZikoUIElement`** is the constructor class of every UI element in zikojs. 
It encapsulates the properties and behaviors of a UI element, including its HTML representation, styling, attributes, and event handling...
You can create a new UI element using the following syntax :

```js
 const UI = new ZikoUIElement(element);
 // element can be an HTML tag string or a DOM element.
```
Alternatively, you can simply use the [Built-in UI Elements]() provided by zikojs UI module."

In general, ZikoUIElement supports:
 - Nesting UI elements within each other.
 - Applying styling to UI elements using object notation.
 - Event handling 
 - Manipulating the DOM by adding, removing, and modifying child elements.

## Methodes & Getters

 ### Acces
   - `📦 .at(index)` : Retrieves the UI element at the specified index within the ZikoUIElement
   - `🧊 [index]` : Alternative syntax for accessing UI elements by index
 ### Content 
   - `🧩 .html` : Get the HTML content of the UI element
   - `🧩 .text`:  Get the Text content of the UI element
 ### DOM  
   - `📦 .clone()` :
   - `📦 .render()` : Render the UI element to the DOM
   - `📦 .renderAfter(delay)` : Render the UI element after a specified delay
   - `📦 .unrender()` : Remove the UI element from the DOM.
   - `📦 .unrederAfter(delay)` : Remove the UI element from the DOM after a specified delay.
   - `📦 .append(...items)` : Append child elements to the UI element
   - `📦 .remove(...items)` : Remove child elements from the UI element
   - `📦 .inserAt(index,...items)` : Insert child elements at a specified index within the UI element.
   - `📦 .setTarget(target)` :
   - `📦 .forEach(callback)` : Iterate over child elements and applies a callback function.
   - `📦 .map(callback)` : Map over child elements and applies a callback function.
   - `📦 .find(condition)` : Find All child elements that match a specified condition.
   - `📦 .filter(condition,if_callback,else_callback)` : Filter child elements based on a condition, with optional callbacks for filtered and non-filtered elements.
   - `📦 .filterByTextContent(text,exactMatch)` : Filter child elements based on text content, with an option for exact matching.
   - `📦 .filterByClass(value)` : Filter child elements based on class name.
   - `📦 .sortByTextConten(value,displays)` : Sort child elements by their text content.

 ### Attributes
   - `📦 .setAttr(name,values)` : Set attribute(s) on the UI element.
   - `📦 .removeveAttr(...names)` : Remove attribute(s) from the UI element.
   - `📦 .setId(value)` : Set the ID attribute of the UI element.
   - `📦 .setClasses(...classes)` : Set CSS classes on the UI element.
   - `📦 .addClasses(...classes)` : Add CSS classes to the UI element.
   - `🧩 .attr` : Get the attributes of the UI element.
   - `🧩 .id` : Get the Id of the UI element.
   - `🧩 .classes` : Get the classes of the UI element.

 ### CSSOM
   - `📦 .style(styleObject)` : Set the Style of the UI element.
   - `📦 .size(width,height)` : Set the size of the UI element.
   - `🧩 .st` :
      - `🧩🧩 .st.styles`
      - `🧩📦 .st.add`
      - `🧩📦 .st.delete`
      - `🧩📦 .st.color()`
      - `🧩📦 .st.background()`
      - `🧩📦 .st.backgroundColor()`
      - `🧩📦 .st.display()`
      - `🧩📦 .st.margin()`
      - `🧩📦 .st.marginTop()`
      - `🧩📦 .st.marginBottom()`
      - `🧩📦 .st.marginRight()`
      - `🧩📦 .st.marginLeft()`
      - `🧩📦 .st.padding()`
      - `🧩📦 .st.paddingTop()`
      - `🧩📦 .st.paddingBottom()`
      - `🧩📦 .st.paddingRight()`
      - `🧩📦 .st.paddingLeft()`
      - `🧩📦 .st.width()`
      - `🧩📦 .st.height()`
      - `🧩📦 .st.border()`
      - `🧩📦 .st.borderTop()`
      - `🧩📦 .st.borderBottom()`
      - `🧩📦 .st.borderRight()`
      - `🧩📦 .st.borderLeft()`
      - `🧩📦 .st.cursor()`
      - `🧩📦 .st.font()`
      - `🧩📦 .st.fontSize()`
      - `🧩📦 .st.fontFamily()`
      - `🧩📦 .st.show()`
      - `🧩📦 .st.hide()`
      - `🧩📦 .st.translate()`
      - `🧩📦 .st.translateX()`
      - `🧩📦 .st.translateY()`
      - `🧩📦 .st.translateZ()`
      - `🧩📦 .st.scale()`
      - `🧩📦 .st.scaleX()`
      - `🧩📦 .st.scaleY()`
      - `🧩📦 .st.perspective()`
      - `🧩📦 .st.flipeX()`
      - `🧩📦 .st.flipeY()`
      - `🧩📦 .st.flipeZ()`
      - `🧩📦 .st.fadeIn()`
      - `🧩📦 .st.fadeOut()`
      - `🧩📦 .st.isBlock()`
      - `🧩📦 .st.isInline()`
      
    

 ### Events
   - `🧩 .evt ` : Get the events registered on the UI element.
  #### Custom Events
   - `📦 .emit(event,detail)` : Emit a custom event from the UI element with optional detail.
   - `📦 .on(event,...callbacks)` : Register event handlers for custom events.

  #### useClickEvt
   - `🧩 .evt.click`
   - `📦 .onClick(...callbacks)`
   - `📦 .onDbClick(...callbacks)`

  #### usePointerEvt Events
   - `🧩 .evt.ptr`
   - `📦 .onPtrDown(...callbacks)`
   - `📦 .onPtrMove(...callbacks)`
   - `📦 .onPtrUp(...callbacks)`
   - `📦 .onPtrEnter(...callbacks)`
   - `📦 .onPtrLeave(...callbacks)`
   - `📦 .onPtrOut(...callbacks)`

  #### useMouseEvt Events
   - `🧩 .evt.mouse`
   - `📦 .onMouseDown(...callbacks)`
   - `📦 .onMouseMove(...callbacks)`
   - `📦 .onMouseUp(...callbacks)`
   - `📦 .onMouseEnter(...callbacks)`
   - `📦 .onMouseLeave(...callbacks)`
   - `📦 .onMouseOut(...callbacks)`
   - `📦 .onWheel(...callbacks)`

  #### Keyboard Events
   - `🧩 .evt.key`
   - `📦 .onKeyDown(...callbacks)`
   - `📦 .onKeyPress(...callbacks)`
   - `📦 .onKeyUp(...callbacks)`
   - `📦 .onKeysDown(...callbacks)`

  #### useFocusEvt Events
   - `🧩 .evt.focus`
   - `📦 .onFocus(...callbacks)`
   - `📦 .onBlur(...callbacks)`

  #### useDragEvt
   - `🧩 .evt.drag`
   - `📦 .onDragStart(...callbacks)` 
   - `📦 .onDrag(...callbacks)`
   - `📦 .onDragEnd(...callbacks)`
   - `📦 .onDrop(...callbacks)`

  #### useClipboardEvt Events 
   - `🧩 .evt.clipboard`
   - `📦 .onSelect(...callbacks)`:
   - `📦 .onCopy(...callbacks)`:
   - `📦 .onCut(...callbacks)`:
   - `📦 .onPaste(...callbacks)`:

 ### Watchers
  - `🧩 .observer : `
  - `📦 .watchSize(callback)` : Observe changes in the size of the UI element
  - `📦 .watchIntersection(callback)` : Observe intersection changes of the UI element with other elements.
  - `📦 .watchAttr(callback)` : Observe changes in attributes of the UI element.
  - `📦 .watchChildren(callback)` : Observe changes in child elements of the UI element.
 ### Misc 
  - `📦 .toPdf()` :
  
<p style="font-size:25px; text-align:right">
<a href="#introduction" style="font-size:25px; text-align:right">⬆️</a>
</p>





