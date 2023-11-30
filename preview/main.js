Ziko.ExtractAll()
ZikoThree.ExtractAll()
// document.body.addEventListener("contextmenu",e=>e.preventDefault())
// const RANDOM_COLOR=Random.color()
// Paint=Canvas().view(-10,-10,10,10).size(500,500).background("#eeeeee").adjust()
// Sketch=SceneCss("100vw","100vh").background("#111111").style({margin:0})
// Sketch.camera.posZ(700)
// Galerie=new SceneGl(innerWidth,innerHeight)
// logo=image("zikojs.png").size("140px","auto").style({borderRadius:"20%",zIndex:3})
// save=btn("save").onPtrDown(
//     ()=>Galerie.add(cube3(1).texture(Paint).pos(5*cos(Galerie.length*PI/20),5*sin(Galerie.length*PI/20),-(Galerie.length%10)*5))
// )
// Sketch.add(UI3(Paint).posY(70),UI3(logo).posY(-200),UI3(save))
// c=Ziko.Events.Channel("test")
// c.on("orbit_change",e=>Sketch.camera.useState(e.state,false,true))
// Sketch.orbit.onChange(()=>{
//     c.broadcast.emit("orbit_change",{state:Sketch.orbit.currentState})
// })   
//     Paint.onPtrDown(e=>e.event.ctrlKey?Sketch.orbit.enable():Sketch.orbit.disable()).onPtrUp(()=>{})
//     Paint.onPtrMove(e=>{
//         if(e.event.ctrlKey) Sketch.orbit.enable()
//         else{
//             Sketch.orbit.disable()
//             if(e.isDown){
//                 const x=map(e.mx,0,Paint.Width,Paint.Xmin,Paint.Xmax)
//                 const y=map(e.my,0,Paint.Height,Paint.Ymax,Paint.Ymin)
//                 Paint.append(canvasCircle(x,y,1/2).color({fill:RANDOM_COLOR}).fill())
//                 c.broadcast.emit("draw",{x,y,color:RANDOM_COLOR})
//             }
//         }
//     })
//     c.on("draw",e=>Paint.append(canvasRect(e.x,e.y,1,1).color({stroke:e.color,fill:"#5555AA"}).fill()))
const RANDOM_COLOR=Random.color()
Paint=Canvas().view(-10,-10,10,10).size(500,500).style({backgroud:"#eeeeee"})
Paint.onPtrDown(()=>{}).onPtrUp(()=>{})
    Paint.onPtrMove(e=>{
        if(e.event.ctrlKey) Sketch.orbit.enable()
        else{
            if(e.isDown){
                const x=map(e.mx,0,Paint.Width,Paint.Xmin,Paint.Xmax)
                const y=map(e.my,0,Paint.Height,Paint.Ymax,Paint.Ymin)
                Paint.append(canvasCircle(x,y,1/2).color({fill:RANDOM_COLOR}).fill())
            }
        }
    })