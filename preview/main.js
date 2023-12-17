Ziko.ExtractAll()
ZikoThree.ExtractAll()
document.body.addEventListener("contextmenu",e=>e.preventDefault())
const RANDOM_COLOR=Random.color()
Paint=Canvas().view(-10,-10,10,10).size(500,500).adjust()
Paint.st.background("#eeeeee")
Sketch=SceneCss("100vw","100vh").background("#111111").style({margin:0})
Sketch.camera.posZ(700)
Galerie=new SceneGl(innerWidth,innerHeight)
logo=image("zikojs.png").size("140px","auto").style({borderRadius:"20%",zIndex:3})
save=btn("save").onPtrDown(
    ()=>Galerie.add(cube3(1).texture(Paint).pos(5*cos(Galerie.length*PI/20),5*sin(Galerie.length*PI/20),-(Galerie.length%10)*5))
)
Sketch.add(UI3(Paint).posY(70),UI3(logo).posY(-200),UI3(save))
c=Ziko.Events.Channel("test")
c.on("orbit_change",e=>Sketch.camera.useState(e.state,false,true))
Sketch.orbit.onChange(()=>{
    c.broadcast.emit("orbit_change",{state:Sketch.orbit.currentState})
})   
    Paint.onPtrDown(e=>e.event.ctrlKey?Sketch.orbit.enable():Sketch.orbit.disable()).onPtrUp(()=>{})
    Paint.onPtrMove(e=>{
        if(e.event.ctrlKey) Sketch.orbit.enable()
        else{
            Sketch.orbit.disable()
            if(e.isDown){
                let x=map(e.mx,0,Paint.Width,Paint.Xmin,Paint.Xmax)
                let y=map(e.my,0,Paint.Height,Paint.Ymax,Paint.Ymin)
                Paint.append(canvasCircle(x,y,1/2).color({fill:RANDOM_COLOR}).fill())
                c.broadcast.emit("draw",{x,y,color:RANDOM_COLOR})
            }
        }
    })
    c.on("draw",e=>Paint.append(canvasRect(e.x,e.y,1,1).color({stroke:e.color,fill:"#5555AA"}).fill()))

Galerie.remove()
Sketch.remove()
/////////////////////////////////////
// a=Canvas(400,400).style({
//     margin:"20px"
// }).view(-10,-10,10,10).append(canvasCircle(0,0,2))

// a.on("ev",(e)=>console.log(e.detail))
////////////////////////:
app=Ziko.App().useTheme(0)
Arg=Accordion(
    text("Argentina").style({
        color:app.Theme.purple
    }),
    ul(
        "Emiliano Martinez",
        "Cristian Romero",
        "Nicolas Otamendi",
        "Naheul Molina",
        "Nicolas Tagliafico",
        "Enzo Fernandez",
        "Rodrigo De Paul",
        "Alexis Mac Alliser",
        "Anjel Di Maria",
        "Lionel Messi",
        "Julian Alvarez"
        ).style({
            color:app.Theme.currentLine,
            backgroundColor:app.Theme.foreground,
            borderTop:`1px solid ${app.Theme.currentLine}`,
            borderLeft:`1px solid ${app.Theme.currentLine}`,
            boxShadow:`3px 3px 2px 0px ${app.Theme.background}`,
            paddingBottom:"5px"
        }),
    "💙🤍")
    .size("300px")
    Fr=Accordion(
        text("France").style({
            color:app.Theme.red
        }),
        ul(
            "Hugo Loris",
            "Varane",
            "Upamecano",
            "Julieus Kounde",
            "Theo hernandez",
            "Tchouamini",
            "Rabiot",
            "Antoine Griezman",
            "Ousmane Dembele",
            "Kylian Mbappe",
            "Olivier Giroud"
            ).style({
                color:app.Theme.currentLine,
                backgroundColor:app.Theme.foreground,
                borderTop:`1px solid ${app.Theme.currentLine}`,
                borderLeft:`1px solid ${app.Theme.currentLine}`,
                boxShadow:`3px 3px 2px 0px ${app.Theme.background}`,
                paddingBottom:"5px"
            }),
        "💙🤍")
        .size("300px")
    // Ct=Flex(Arg,Fr).horizontal(0,1).size("700px","auto").style({
    //     margin:"10px auto",
    //     background:app.Theme.background,
    //     boxShadow:`10px 10px 5px 0px ${app.Theme.foreground}`
    // })
    // Ct.forEach(n=>{
    //     n.style({
    //         fontSize:"1em",
    //         fontFamily:"verdana",
    //         backgroundColor:app.Theme.foreground,
    //         margin:"20px 10px"
    //     })
    // })
    
    sc=SceneCss("100vw","100vh").background("#333333");
    sc.add(Arg,Fr)
    sc[0].posX(-150)
    sc[1].posX(150)
    Arg.summary[0].onPtrDown(()=>Arg.toggle())
    Fr.summary[0].onPtrDown(()=>Fr.toggle())
    app.useTheme("dracula")
    // Arg.open()
    // Fr.open()