import ZikoUIElement from "../ZikoUIElement.js";
import { ZikoUIFlex } from "../Flex/flex.js";
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
const FlexHeader = (...ZikoUIElement) => new ZikoUIFlex("header").append(...ZikoUIElement);
const FlexMain = (...ZikoUIElement) => new ZikoUIFlex("main").append(...ZikoUIElement);
const FlexArticle = (...ZikoUIElement) => new ZikoUIFlex("article").append(...ZikoUIElement);
const FlexSection = (...ZikoUIElement) => new ZikoUIFlex("section").append(...ZikoUIElement);
const FlexAside = (...ZikoUIElement) => new ZikoUIFlex("aside").append(...ZikoUIElement);
const FlexNav = (...ZikoUIElement) => new ZikoUIFlex("nav").append(...ZikoUIElement);
const FlexFooter = (...ZikoUIElement) => new ZikoUIFlex("footer").append(...ZikoUIElement);
export{
  Header,
  FlexHeader,
  Main,
  FlexMain,
  Section,
  FlexSection,
  Article,
  FlexArticle,
  Aside,
  FlexAside,
  Nav,
  FlexNav,
  Footer,
  FlexFooter,
  ZikoUISection
  }