import ZikoUIContainerElement from "../ZikoUIContainerElement.js";
class ZikoUIMain extends ZikoUIContainerElement{
    constructor(){
      super("main","Main");
    }
  }
  class ZikoUIHeader extends ZikoUIContainerElement{
    constructor(){
      super("header","Header");
    }
  }
  class ZikoUINav extends ZikoUIContainerElement{
    constructor(){
      super("nav","Nav");
    }
  }
  class ZikoUISection extends ZikoUIContainerElement{
    constructor(){
      super("section","Section");
      this.style({position:"relative"})
    }
  }
  class ZikoUIArticle extends ZikoUIContainerElement{
    constructor(){
      super("article","Article");
    }
  }
  class ZikoUIAside extends ZikoUIContainerElement{
    constructor(){
      super("aside","Aside");
    }
  }
  class ZikoUIFooter extends ZikoUIContainerElement{
    constructor(){
      super("footer","Footer");
      this.element=document.createElement("footer");
    }
  }
const Section = (...ZikoUIElement) => new ZikoUISection().append(...ZikoUIElement);
const Article = (...ZikoUIElement) => new ZikoUIArticle().append(...ZikoUIElement);
const Main = (...ZikoUIElement) => new ZikoUIMain().append(...ZikoUIElement);
const Header = (...ZikoUIElement) => new ZikoUIHeader().append(...ZikoUIElement);
const Footer = (...ZikoUIElement) => new ZikoUIFooter().append(...ZikoUIElement);
const Nav = (...ZikoUIElement) => new ZikoUINav().append(...ZikoUIElement);
const Aside = (...ZikoUIElement) => new ZikoUIAside().append(...ZikoUIElement);
export{
  Header,
  Main,
  Section,
  Article,
  Aside,
  Nav,
  Footer,
  ZikoUIHeader,
  ZikoUIMain,
  ZikoUISection,
  ZikoUIArticle,
  ZikoUIAside,
  ZikoUINav,
  ZikoUIFooter
}