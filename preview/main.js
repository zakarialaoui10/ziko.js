
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

cnv=Canvas(500,500).view(-10,-10,10,10).size(500,500).adjust()
// a1=canvasCircle(-2,0,2.3).fill().color({fill:"#5555AA"})
// a2=canvasCircle(2,0,2.3).fill().color({fill:"#AA5555"})
// c.append(a1)
// c.append(a2)
// a1.ca

cnv.onPtrDown(e=>{
    cnv.ctx.beginPath()
    cnv.ctx.moveTo(
        map(e.dx,0,cnv.Width,cnv.Xmin,cnv.Xmax),
        map(e.dy,0,cnv.Height,cnv.Ymin,cnv.Ymax)
        )
})
cnv.onPtrMove(e=>{
    if(e.isDown){
        const x=map(e.mx,0,cnv.Width,cnv.axisMatrix[0][0],cnv.axisMatrix[1][0])
        const y=map(e.my,0,cnv.Height,cnv.axisMatrix[1][1],cnv.axisMatrix[0][1])
    // cnv.ctx.lineTo(
    //     map(e.mx,0,cnv.element.offsetWidth,cnv.axisMatrix[0][0],cnv.axisMatrix[1][0]),
    //     map(e.my,0,cnv.element.offsetHeight,cnv.axisMatrix[1][1],cnv.axisMatrix[0][1])
    //     )
    cnv.ctx.stroke()
    cnv.append(canvasCircle(x,y,1).color({fill:"#5555AA"}).fill())
    }
})
cnv.onPtrUp(()=>{})



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
//  cnv.WatchIntersection(e=>console.log(e.ratio))
// a=Flex(text(1),text(2),text(3)).size(400,"auto")
//b=DragEvent(a).onDrag(e=>console.log(e))
  

// SIGNAL
// t=linspace(-2*PI,2*PI,400)
// s1=sin(t.mul(2*PI*50)).mul(5)
// s2=sin(t).mul(4)
// s=s1.add(s2)
// f=Signal.filter(s)

// Car=Carousel(
//     Flex().size("100px","80px"),
//     Flex().size("100px","80px")
//     )

//screen.width,screen.heigh
Scene=new SceneGl("50vw","50vh").style({
    margin:0,
    overfflow:"hidden"
})
b=cube3(2)
Scene.addGl(b)
c=Ziko.Events.Channel("test")
btn("Update Scene Color").onClick(()=>{
    const Color=Random.color()
    Scene.background(Color)
    c.emit("update_scene_color",Color)
})
c.on("update_scene_color",e=>Scene[0].color(e))
btn("Update Mesh Color").onClick(()=>{
    const Color=Random.color()
    Scene[0].color(Color)
    c.emit("update_mesh_color",Color)
})
c.on("update_mesh_color",e=>Scene.background(e))
Scene.useOrbitControls()
c.on("orbit_change",e=>Scene.camera.rot(e.rx,e.ry,e.rz).pos(e.px,e.py,e.pz))
Scene.cache.controls.orbit.onChange(()=>{
    c.broadcast.emit("orbit_change",{
    rx:Scene.camera.rx,
    ry:Scene.camera.ry,
    rz:Scene.camera.rz,
    px:Scene.camera.px,
    py:Scene.camera.py,
    pz:Scene.camera.pz
})})
// Scene.useTransformControls()
// //Scene.cache.controls.transform.attach(Scene[0])
// Scene.cache.controls.transform.onChange(()=>c.broadcast.emit("transfrom_change",{
//     x:Scene[0].x,
//     y:Scene[0].y,
//     z:Scene[0].z
// }))
// c.on("transfrom_change",e=>Scene[0].pos(e.x.pos,e.y.pos,e.z.pos))

// Scene.onPtrMove((e)=>{
//     Scene.cache.pointer.x = ( e.mx / Scene.Width ) * 2 - 1;
// 	Scene.cache.pointer.y = - ( e.my / Scene.Height ) * 2 + 1;
//     Scene.renderGl()
// })

img=image("zikojs.png").hide()
texture=ZikoThree.image2texture(img)
cnv.remove()
//Scene.camera.posX((screenLeft/screen.width)*4.663076581549986)

sv=Svg()
sv.add(svgCircle(0,0,5))
//Scene.camera.useOrthographic()
//Scene[0].posX(map(Scene.Width,0,Scene.Width,Scene.camera.left,Scene.camera.right)/2)
