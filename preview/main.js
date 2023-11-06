Ziko.ExtractAll()
Ziko.Math.ExtractAll()
Ziko.Graphics.ExtractAll()
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
a1=canvasCircle(-2,0,5).fill().color({fill:"#5555AA"})
a2=canvasCircle(2,0,5).fill().color({fill:"#AA5555"})
c.append(a1)
c.append(a2)
a1.ca

pp=Pointer(c)
pp.onDown(e=>{
    c.ctx.beginPath()
    c.ctx.moveTo(
        map(e.dx,0,c.element.offsetWidth,c.axisMatrix[0][0],c.axisMatrix[1][0]),
        map(e.dy,0,c.element.offseHeight,c.axisMatrix[0][1],c.axisMatrix[1][1])
        )
})
pp.onMove(e=>{
    if(e.isDown){
        const x=map(e.mx,0,c.element.offsetWidth,c.axisMatrix[0][0],c.axisMatrix[1][0])
        const y=map(e.my,0,c.element.offsetHeight,c.axisMatrix[1][1],c.axisMatrix[0][1])
    // c.ctx.lineTo(
    //     map(e.mx,0,c.element.offsetWidth,c.axisMatrix[0][0],c.axisMatrix[1][0]),
    //     map(e.my,0,c.element.offsetHeight,c.axisMatrix[1][1],c.axisMatrix[0][1])
    //     )
    c.ctx.stroke()
    c.append(canvasCircle(x,y,1).color({fill:"#5555AA"}).fill())
    }
})
pp.handle({
    down:true,
    move:true,
    up:true
})


