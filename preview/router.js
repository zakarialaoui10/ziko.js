class Router {
    constructor(routes) {
      this.routes = routes;
      this.mainPageElement = document.getElementById("main-page");
      this.setupEventListeners();
      this.handleLocation();
    }
  
    setupEventListeners() {
      window.onpopstate = () => this.handleLocation();
    }
  
    route(event) {
      event = event || window.event;
      event.preventDefault();
      window.history.pushState({}, "", event.target.href);
      this.handleLocation();
    }
  
    async handleLocation() {
      const path = window.location.pathname;
      const route = this.routes[path] || this.routes[404];
      const html = await fetch(route).then((data) => data.text());
      this.mainPageElement.innerHTML = html;
    }
  }
  
//   const routes = {
//     404: "/pages/404.html",
//     "/": "/pages/index.html",
//     "/about": "/pages/about.html",
//     "/lorem": "/pages/lorem.html",
//   };
  
  const router =(routes) => new Router(routes);
  //window.route = (event) => router.route(event);
  export default router