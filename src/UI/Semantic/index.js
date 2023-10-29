import ZikoUIElement from "../ZikoUIElement.js"
class ZikoUIMain extends ZikoUIElement{
    constructor(){
      super();
      this.element=document.createElement("main");
      this.render();
    }
  }
  class ZikoUIHeader extends ZikoUIElement{
    constructor(){
      super();
      this.element=document.createElement("header");
      this.render();
    }
  }
  class ZikoUINav extends ZikoUIElement{
    constructor(){
      super();
      this.element=document.createElement("nav");
      this.render();
    }
  }
  class ZikoUISection extends ZikoUIElement{
    constructor(){
      super();
      this.element=document.createElement("section");
      this.style({position:"relative"})
      this.render();
    }
  }
  class ZikoUIArticle extends ZikoUIElement{
    constructor(){
      super();
      this.element=document.createElement("article");
      this.render();
    }
  }
  class ZikoUIAside extends ZikoUIElement{
    constructor(){
      super();
      this.element=document.createElement("aside");
      this.render();
    }
  }
  class ZikoUIFooter extends ZikoUIElement{
    constructor(){
      super();
      this.element=document.createElement("footer");
      this.render();
    }
  }
const Section = (...ZikoUIElement) => new ZikoUISection().append(...ZikoUIElement);
const Article = (...ZikoUIElement) => new ZikoUIArticle().append(...ZikoUIElement);
const Main = (...ZikoUIElement) => new ZikoUIMain().append(...ZikoUIElement);
const Header = (...ZikoUIElement) => new ZikoUIHeader().append(...ZikoUIElement);
const Footer = (...ZikoUIElement) => new ZikoUIFooter().append(...ZikoUIElement);
const Nav = (...ZikoUIElement) => new ZikoUINav().append(...ZikoUIElement);
const Aside = (...ZikoUIElement) => new ZikoUIAside().append(...ZikoUIElement);
export{Section,Article,Main,Header,Footer,Nav,Aside,ZikoUISection}