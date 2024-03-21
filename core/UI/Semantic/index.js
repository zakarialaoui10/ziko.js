import ZikoUIElement from "../ZikoUIElement.js";
class ZikoUIMain extends ZikoUIElement{
    constructor(){
      super("main","Main");
    }
  }
  class ZikoUIHeader extends ZikoUIElement{
    constructor(){
      super("header","Header");
    }
  }
  class ZikoUINav extends ZikoUIElement{
    constructor(){
      super("nav","Nav");
    }
  }
  class ZikoUISection extends ZikoUIElement{
    constructor(){
      super("section","Section");
      this.style({position:"relative"})
    }
  }
  class ZikoUIArticle extends ZikoUIElement{
    constructor(){
      super("article","Article");
    }
  }
  class ZikoUIAside extends ZikoUIElement{
    constructor(){
      super("aside","Aside");
    }
  }
  class ZikoUIFooter extends ZikoUIElement{
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