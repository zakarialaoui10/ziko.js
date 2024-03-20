import ZikoUIElement from "../ZikoUIElement.js";
class ZikoUIMain extends ZikoUIElement{
    constructor(){
      super("main","Main");
      this.render();
    }
  }
  class ZikoUIHeader extends ZikoUIElement{
    constructor(){
      super("header","Header");
      this.render();
    }
  }
  class ZikoUINav extends ZikoUIElement{
    constructor(){
      super("nav","Nav");
      this.render();
    }
  }
  class ZikoUISection extends ZikoUIElement{
    constructor(){
      super("section","Section");
      this.style({position:"relative"})
      this.render();
    }
  }
  class ZikoUIArticle extends ZikoUIElement{
    constructor(){
      super("article","Article");
      this.render();
    }
  }
  class ZikoUIAside extends ZikoUIElement{
    constructor(){
      super("aside","Aside");
      this.render();
    }
  }
  class ZikoUIFooter extends ZikoUIElement{
    constructor(){
      super("footer","Footer");
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