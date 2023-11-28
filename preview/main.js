
Ziko.ExtractAll()
ZikoThree.ExtractAll()
a=SceneCss("100vw","100vh")
a.background("#111111")
a.style({
    margin:0
})
//b=btn("Click")
b=Table(Random.matrixBin(5,8)).background(Random.color())
b.onPtrDown(e=>e.Target.background(Random.color()))
a.addCssElement(b)
a.camera.posZ(200)
b.onPtrLeave(()=>console.log("leave"))