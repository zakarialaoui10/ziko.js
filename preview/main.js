Ziko.ExtractAll()
ZikoThree.ExtractAll()
cnv=Canvas(500,500).view(-10,-10,10,10).size(500,500).background("#eeeeee").adjust()
Sketch=SceneCss("100vw","100vh")
Sketch.background("#111111")
Sketch.style({
    margin:0
})
b=cnv
im=image("zikojs.png").size("200px","100px")
Sketch.addCssElement(b)
Sketch.addCssElement(im)
Sketch.sceneCss.children[1].position.y=-200


Sketch.camera.posZ(700)
const offsetX=Random.choice([-100,100])
const offsetY=Random.int(-100,100)
an=animation(e=>{ 
    Sketch.sceneCss.children[0].position.x=map(e.ty,0,1,offsetX,0);
    Sketch.sceneCss.children[0].position.y=map(e.ty,0,1,offsetY,0);
    Sketch.sceneCss.children[0].position.z=map(e.ty,0,1,-100,0);
    Sketch.renderCss()},
    Ease.OutQuint
    ).start()
    c=Ziko.Events.Channel("test")
    c.on("orbit_change",e=>{
        Sketch.camera.rot(e.rx,e.ry,e.rz).pos(e.px,e.py,e.pz)
        Sketch.renderCss()
    })
    Sketch.cache.controls.orbit.onChange(()=>{
        c.broadcast.emit("orbit_change",{
        rx:Sketch.camera.rx,
        ry:Sketch.camera.ry,
        rz:Sketch.camera.rz,
        px:Sketch.camera.px,
        py:Sketch.camera.py,
        pz:Sketch.camera.pz
    })})
    


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
            let obj=canvasCircle(x,y,1/2).color({fill:"#5555AA"}).fill()
            cnv.append(obj)
        c.broadcast.emit("draw",{
            x,
            y
        })
        }
        
    })
    const RANDOM_COLOR=Random.color()
    cnv.onPtrUp((e)=>e.isDown=false)

    c.on("draw",e=>{
        cnv.append(canvasRect(e.x,e.y,1,1).color({fill:RANDOM_COLOR}).fill())
    })