class ZikoUIRoot extends ZikoUIElement {
    constructor() {
      super();
      this.element = document.body;
      window.addEventListener("resize", () => this.size());
    }
    size(w = window.innerWidth + "px", h = window.innerHeight + "px") {
      this.element.style.width = w;
      this.element.style.height = h;
      return this;
    }
    append(element) {
      this.element.appendChild(element.element);
      return this;
    }
  }
  const Root = (element) => new ZikoUIRoot().append(element);
  export default Root;