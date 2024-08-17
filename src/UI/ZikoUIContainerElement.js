import ZikoUIElement from "./ZikoUIElement";
import { text } from "./Text";
class ZikoUIContainerElement extends ZikoUIElement{
    constructor(element, name=""){
        super(element, name)
        this.items = [];
    }
    maintain() {
      for (let i = 0; i < this.items.length; i++)
        Object.assign(this, { [[i]]: this.items[i] });
      this.length = this.items.length;
      return this;
    }
    at(index) {
      return this.items.at(index);
    }
    append(...ele) {
        if(this.cache.isFrozzen){
          console.warn("You can't append new item to frozzen element");
          return this;
        }
        for (let i = 0; i < ele.length; i++){
        if(["number","string"].includes(typeof ele[i]))ele[i]=text(ele[i]);
          if (ele[i] instanceof ZikoUIElement) {
            ele[i].cache.parent=this;
            this.element.appendChild(ele[i].element);
            ele[i].Target = this.element;
            this.items.push(ele[i]);
          } else if (ele[i] instanceof Object) {
            if (ele[i]?.style) this.style(ele[i]?.style);
            if (ele[i]?.attr) {
              Object.entries(ele[i].attr).forEach((n) =>
                this.setAttr("" + n[0], n[1]),
              );
            }
          }
        }
        this.maintain();
        return this;
      }
      insertAt(index, ...ele) {
        if (index >= this.element.children.length) this.append(...ele);
        else
          for (let i = 0; i < ele.length; i++) {
            if(["number","string"].includes(typeof ele[i]))ele[i]=text(ele[i]);
            this.element.insertBefore(ele[i].element, this.items[index].element);
            this.items.splice(index, 0, ele[i]);
          }
        return this;
      }
      // remove(...ele) {
      //   if(ele.length==0){
      //     if(this.cache.parent)this.cache.parent.remove(this);
      //     else if(this.target.children.length && [...this.target.children].includes(this.element)) this.target.removeChild(this.element);
      //   }
      //   else {
      //     const remove = (ele) => {
      //       if(typeof ele === "number") ele=this.items[ele];
      //       if(ele instanceof ZikoUIElement)this.element.removeChild(ele.element);
      //         this.items=this.items.filter(n=>n!==ele);
      //     };
      //     for (let i = 0; i < ele.length; i++) remove(ele[i]);
      //     for (let i = 0; i < this.items.length; i++)Object.assign(this, { [[i]]: this.items[i] });
      //     // Remove from item 
      //   }
      //   return this;
      // }
      remove(...ele) {
          const remove = (ele) => {
            if(typeof ele === "number") ele=this.items[ele];
            if(ele instanceof ZikoUIElement)this.element.removeChild(ele.element);
              this.items=this.items.filter(n=>n!==ele);
          };
          for (let i = 0; i < ele.length; i++) remove(ele[i]);
          for (let i = 0; i < this.items.length; i++)Object.assign(this, { [[i]]: this.items[i] });
          // Remove from item 
        return this;
      }
      forEach(callback){
        this.items.forEach(callback);
        return this;
      }
      map(callback){
        return this.items.map(callback);
      }
      find(condition){
        return this.items.filter(condition);
      }
      filter(condition_callback,if_callback=()=>{},else_callback=()=>{}){
        const FilterItems=this.items.filter(condition_callback);
        FilterItems.forEach(if_callback);
        this.items.filter(item => !FilterItems.includes(item)).forEach(else_callback);
        return this;
      }
      filterByTextContent(text,exactMatch=false){
        this.items.forEach(n=>n.render());
        this.filter(
          n=>!(exactMatch?n.text===text:n.text.includes(text)),
          e=>e.unrender()
        )
        // this.items.filter(n=>{
        //   const content=n.element.textContent;
        //   return !(exactMatch?content===text:content.includes(text))
        // }).map(n=>n.unrender());
        //  return this;
      }
      filterByClass(value){
        this.items.map(n=>n.render());
        this.items.filter(n=>!n.classes.includes(value)).map(n=>n.unrender());
        return this; 
      }
      sortByTextContent(value, displays) {
        let item = this.children;
        item
          .filter((n) => !n.textContent.toLowerCase().includes(value.toLowerCase()))
          .map((n) => {
            n.style.display = "none";
          });
        item
          .filter((n) => n.textContent.toLowerCase().includes(value.toLowerCase()))
          .map((n, i) => (n.style.display = displays[i]));
        //return item.filter(n=>n.style.display!="none")
        item.filter((n) => n.style.display != "none");
        return this;
      }
}
export default ZikoUIContainerElement;