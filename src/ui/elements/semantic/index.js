import {ZikoUIContainerElement} from "../ZikoUIContainerElement.js";
class ZikoUIMain extends ZikoUIContainerElement{
    constructor(){
      super("main","Main");
    }
    get isMain(){
      return true
    }
  }
  class ZikoUIHeader extends ZikoUIContainerElement{
    constructor(){
      super("header","Header");
    }
    get isHeader(){
      return true
    }
  }
  class ZikoUINav extends ZikoUIContainerElement{
    constructor(){
      super("nav","Nav");
    }
    get isNav(){
      return true
    }
  }
  class ZikoUISection extends ZikoUIContainerElement{
    constructor(){
      super("section","Section");
      this.style({position:"relative"})
    }
    get isSection(){
      return true
    }
  }
  class ZikoUIArticle extends ZikoUIContainerElement{
    constructor(){
      super("article","Article");
    }
    get isArticle(){
      return true
    }
  }
  class ZikoUIAside extends ZikoUIContainerElement{
    constructor(){
      super("aside","Aside");
    }
    get isAside(){
      return true
    }
  }
  class ZikoUIFooter extends ZikoUIContainerElement{
    constructor(){
      super("footer","Footer");
      this.element=document?.createElement("footer");
    }
    get isFooter(){
      return true
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