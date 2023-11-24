
Ziko.ExtractAll()
ZikoThree.ExtractAll()
const B=p(
    text("f"),
    p(),
    h1("l"),
    h2(),
    h3(),
    h4(),
    h5(),
    h6(),
    btn(),
    br(),
    hr(),
    ...hrs(3),
    ...brs(3),
    link(),
    input(),
    search(),
    slider(),
    checkbox(),
    radio(),
    datalist(),
    inputNumber(),
    inputColor(),
    inputDate(),
    inputDateTime(),
    inputEmail(),
    inputPassword(),
    inputTime(),
    select(),
    textarea(),
    Flex(),
    Header(),
    FlexHeader(),
    Main(),
    FlexMain(),
    Section(),
    FlexSection(),
    Article(),
    FlexArticle(),
    Aside(),
    FlexAside(),
    Nav(),
    FlexNav(),
    Footer(),
    FlexFooter(),
    Table(),
    Svg(),
    svgCircle(0,0,0),
    svgEllipse(0,0,0,0),
    svgImage(),
    svgLine(0,0,0,0),
    svgPolygon(),
    svgRect(0,0,0,0),
    svgText("",0,0),
    svgGroupe(),
    Notebook(),
    image(""),
    video(""),
    audio(""),
    
)
 B.remove()
// C=inputImage()
// C.remove()

c=Canvas(500,500).view(-10,-10,10,10).size(500,500).adjust()
// a1=canvasCircle(-2,0,2.3).fill().color({fill:"#5555AA"})
// a2=canvasCircle(2,0,2.3).fill().color({fill:"#AA5555"})
// c.append(a1)
// c.append(a2)
// a1.ca

c.onPtrDown(e=>{
    c.ctx.beginPath()
    c.ctx.moveTo(
        map(e.dx,0,c.Width,c.Xmin,c.Xmax),
        map(e.dy,0,c.Height,c.Ymin,c.Ymax)
        )
})
c.onPtrMove(e=>{
    if(e.isDown){
        const x=map(e.mx,0,c.Width,c.axisMatrix[0][0],c.axisMatrix[1][0])
        const y=map(e.my,0,c.Height,c.axisMatrix[1][1],c.axisMatrix[0][1])
    // c.ctx.lineTo(
    //     map(e.mx,0,c.element.offsetWidth,c.axisMatrix[0][0],c.axisMatrix[1][0]),
    //     map(e.my,0,c.element.offsetHeight,c.axisMatrix[1][1],c.axisMatrix[0][1])
    //     )
    c.ctx.stroke()
    c.append(canvasCircle(x,y,1).color({fill:"#5555AA"}).fill())
    }
})
c.onPtrUp(()=>{})



class ZikoIntersectionObserver{
    constructor(UIElement,callback,{threshold=1}={}){
        this.target=UIElement;
        this.config={
            threshold
        }
        this.observer=new IntersectionObserver((entries)=>{
            this.entrie=entries[0];
            callback(this)
        },{
            threshold:this.threshold
        })
    }
    get ratio(){
        return this.entrie.intersectionRatio;
    }
    get isIntersecting(){
        return this.entrie.isIntersecting;
    }
    start(){
        this.observer.observe(this.target.element);
        return this;
    }
    stop(){
        return this;
    }
}

 //WatchIntersection=(UI,callback)=>new ZikoIntersectionObserver(UI,callback)
 //a=WatchIntersection(c,e=>console.log(e.ratio)).start()
//  c.WatchIntersection(e=>console.log(e.ratio))
// a=Flex(text(1),text(2),text(3)).size(400,"auto")
//b=DragEvent(a).onDrag(e=>console.log(e))
  

// SIGNAL
// t=linspace(-2*PI,2*PI,400)
// s1=sin(t.mul(2*PI*50)).mul(5)
// s2=sin(t).mul(4)
// s=s1.add(s2)
// f=Signal.filter(s)

c.remove()
// Car=Carousel(
//     Flex().size("100px","80px"),
//     Flex().size("100px","80px")
//     )
a=new SceneGl(400,400)
b=cube3(2)
a.addGl(b)

// bc = new BroadcastChannel("test_channel");

// bc.postMessage("This is a test message.");

// bc.onmessage = (event) => {
//     console.log(event);
//   };
c=Ziko.Events.Channel("test")

c.on("change_background",e=>a.background(e))

btn("Set Random Background").onClick(()=>c.emit("change_background",Random.color()))