
Ziko.ExtractAll()
ZikoThree.ExtractAll()

c=Ziko.Events.Channel("test")
btn1=btn("Update Scene Color").onClick(()=>{
    const Color=Random.color()
    c.emit("update_mesh_color",Color)
}).size("200px","100px")
btn2=btn("Update Mesh Color").onClick(()=>{
    const Color=Random.color()
    c.emit("update_scene_color",Color)
    
}).size("200px","100px")

Flex(
    btn1,
    btn2
).size("90vw","90vh").vertical(0,"space-around").style({
    margin:"auto auto",
    border:"none"
})