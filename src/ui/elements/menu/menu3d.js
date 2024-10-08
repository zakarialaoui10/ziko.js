import {ZikoUIElement} from "../ZikoUIElement.js";
import { ZikoUIFlex } from "../flex"
class ZikoUIMenu3d extends ZikoUIFlex{
    constructor(controller, content){
        super("div", "menu3d")
        this.controller = controller;
        this.content = content;
        this.cover = null;
        Object.assign(this.cache,{
            config:{
                useTransfo : false,
                isOpen : false,
                position : "left",
                threshold : 40,
                angle : 70,
                overlap : 6,
                width : 300,
                height : 300,
                transitionDuration: '0.5s',
                transitionEasing: 'ease',
                menuTransformOrigin : null,
                menuTransformClosed : null,
                menuTransformOpened : null,
                contentTransformOrigin : null,
                contentTransformClosed : null,
                contentTransformOpened : null,
            }
        })
        this.append(
            this.controller,
            this.content
        )
        this.update();
    }
    get isOpen(){
        return this.cache.config.isOpen;
    }
    update(){
        this.controller.style({
            display:"none",
            padding:"20px",
            overflow:"auto",
            background:"darkblue",
            color: "#eee",
            webkitboxSizing: "border-box",
            mozBoxSizing: "border-box",
	        boxSizing:"border-box",
        });
        this.content.style({
            padding:"20px 40px",
            width: "100%",
            height: "100%",
            // overflowY:"auto",
            background:"gold",
            color: "#eee",
            webkitboxSizing: "border-box",
            mozBoxSizing: "border-box",
	        boxSizing:"border-box",
            webkitOverflowScrolling:"touch",
            webkitTransformStyle: "preserve-3d"
        });
        this.setupPositions();
        this.setupWrapper();
        this.setupCover()
        this.setupMenu();
        this.setupContent()
    }
    setupPositions() {
        this.cache.config.menuTransformOpened = '';
        this.cache.config.contentTransformClosed = '';
        let menuAngle = this.cache.config.angle;
        let contentAngle = this.cache.config.angle / -2;
        switch( this.cache.config.position ) {
            case "top":
                this.cache.config.menuTransformOrigin = '50% 0%';
                this.cache.config.menuTransformClosed = `rotateX(${menuAngle}deg) translateY(-100%) translateY(${this.cache.config.overlap}px)`
                this.cache.config.contentTransformOrigin = '50% 0';
                this.cache.config.contentTransformOpened = `translateY(${this.height/2}px) rotateX(${contentAngle}deg)`
                break;
            case "right":
                this.cache.config.menuTransformOrigin = '100% 50%';
                this.cache.config.menuTransformClosed = 'rotateY( ' + menuAngle + 'deg ) translateX( 100% ) translateX( -2px ) scale( 1.01 )';
                this.cache.config.contentTransformOrigin = '100% 50%';
                this.cache.config.contentTransformOpened = 'translateX( -'+ this.width/2 +'px ) rotateY( ' + contentAngle + 'deg )';
                break;
            case "bottom":
                this.cache.config.menuTransformOrigin = '50% 100%';
                this.cache.config.menuTransformClosed = 'rotateX( ' + -menuAngle + 'deg ) translateY( 100% ) translateY( -'+ this.cache.config.overlap +'px )';
                this.cache.config.contentTransformOrigin = '50% 100%';
                this.cache.config.contentTransformOpened = 'translateY( -'+ this.height/2 +'px ) rotateX( ' + -contentAngle + 'deg )';
                break;
            default:
                this.cache.config.menuTransformOrigin = '100% 50%';
                this.cache.config.menuTransformClosed = 'translateX( -100% ) translateX( '+ this.cache.config.overlap +'px ) scale( 1.01 ) rotateY( ' + -menuAngle + 'deg )';
                this.cache.config.contentTransformOrigin = '0 50%';
                this.cache.config.contentTransformOpened = 'translateX( '+ this.width/2 +'px ) rotateY( ' + -contentAngle + 'deg )';
                break;
        }
    }
    setupWrapper() {
        this.style({
            perspective : "800px",
            perspectiveOrigin : this.cache.config.contentTransformOrigin
        })
    }
    setupCover(){
        if( this.cover ) this.cover.element.parentNode.removeChild( this.cover.element );
                this.cover=new ZikoUIElement("div","div").style({
                    position:"absolute",
					display:"block",
					width:"100%",
					height:"100%",
					left:0,
					top:0,
					zIndex:1000,
					visibility:"hidden",
					opacity:0,
					transition: `all ${this.cache.config.transitionDuration} ${this.cache.config.transitionEasing}`
                })
				this.content.element.appendChild( this.cover.element );
    }
    setupMenu() {
        // var style = dom.menu.style;
        switch( this.cache.config.position ) {
            case "top":
                this.controller.style({
                    width : "100%",
                    height : `${this.height/2}px`
                });break;
            case "right":
                this.controller.style({
                    right : 0,
                    width : `${this.width/2}px`,
                    height : "100%"
                });break;
            case "bottom":
                this.controller.style({
                    bottom : "0",
                    width : "100%",
                    height : `${this.height/2}px`
                });break;
            case "left":
                this.controller.style({
                    width : `${this.width/2}px`,
                    height : "100%"
                });break;
        }
        this.controller.style({
            position : "fixed",
            display : "block",
            zIndex : 1,
            transform : this.cache.config.menuTransformClosed,
            transformOrigin : this.cache.config.menuTransformOrigin,
            transition : 'all ' + this.cache.config.transitionDuration +' '+ this.cache.config.transitionEasing
        })
        }
        setupContent() {
            this.content.style({
                transform : this.cache.config.contentTransformClosed,
                transformOrigin : this.cache.config.contentTransformOrigin,
                transition : `all ${this.cache.config.transitionDuration} ${this.cache.config.transitionEasing}`
            })
        }
        open(){
            if(!this.cache.config.isOpen){
                this.cache.config.isOpen = true;
                this.cover.style({
                    height : this.content.element.scrollHeight + "px",
                    visibility : "visible",
                    opacity : 1,
                })
                if(this.cache.config.useTransfo)this.content.style({
                    transform : this.cache.config.contentTransformOpened,
                    userSelect : "default"
                })
                this.controller.style({
                    transform : this.cache.config.menuTransformOpened,
                    useSelect : "none"
                });
                this.emit("opened");
            }
        }
        close() {
            if( this.cache.config.isOpen ) {
                this.cache.config.isOpen = false;
                this.cover.style({
                    // height : this.content.element.scrollHeight + "px",
                    visibility : "hidden",
                    opacity : 0,
                })
                this.content.style({
                    transform : this.cache.config.contentTransformClosed,
                    useSelect : "default"
                })
                this.controller.style({
                    transform : this.cache.config.menuTransformClosed,
                    userSelect : "none"
                })
            }
            this.emit("closed");
        }
        onOpen(callback){
            this.on("opened", callback.bind(this));
            return this;
        }
        onClose(callback){
            this.on("closed", callback.bind(this));
            return this;
        }
        #usePosition(position){
            if(this.cache.config.position!==position){
                this.cache.config.position=position;
                const isOpen = this.isOpen;
                this.close();
                this.update();
                if(isOpen)this.open();
            }
        }
        useRight(){
            this.#usePosition("left");
            return this;
        }
        useRight(){
            this.#usePosition("right");
            return this;
        }
        useTop(){
            this.#usePosition("top");
            return this;
        }
        useBottom(){
            this.#usePosition("bottom");
            return this;
        }
}
const menu3d = (controller, content) => new ZikoUIMenu3d(controller, content);
globalThis.menu3d = menu3d;
export{
    menu3d,
    ZikoUIMenu3d
}


/*

a = menu3d(Flex(text("Menu")), Flex(text("Content")))
  .size("80vw", "50vh")
  .style({ userSelect: "none" });
a.onOpen((e) => console.log(e));
a.open();
a.controller.onSwipe(0.05, 1, (e) => {
  if (e.event.detail.direction.x === "left") a.close();
});
a.content.onSwipe(0.1, 1, (e) => {
  if (e.event.detail.direction.x === "left") a.close();
  if (e.event.detail.direction.x === "right") a.open();
});


*/