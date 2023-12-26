Ziko.ExtractAll()
ZikoThree.ExtractAll()
document.body.addEventListener("contextmenu",e=>e.preventDefault());
app=Ziko.App().useTheme(0)
channel=Ziko.Events.Channel("test")
const ARGENTINA=["Emiliano Martinez","Cristian Romero","Nicolas Otamendi","Naheul Molina","Nicolas Tagliafico","Enzo Fernandez","Rodrigo De Paul","Alexis Mac Alliser","Anjel Di Maria","Lionel Messi","Julian Alvarez"]
const FRANCE=["Hugo Loris","Varane","Upamecano","Julieus Kounde","Theo hernandez","Tchouamini","Rabiot","Antoine Griezman","Ousmane Dembele","Kylian Mbappe","Olivier Giroud"]
const [ARGENTINA_LIST,FRANCE_LIST]=[ARGENTINA,FRANCE].map(n=>ul(...n).style({
    color:app.Theme.currentLine,
    backgroundColor:app.Theme.foreground,
    borderTop:`1px solid ${app.Theme.currentLine}`,
    borderLeft:`1px solid ${app.Theme.currentLine}`,
    boxShadow:`3px 3px 2px 0px ${app.Theme.background}`,
    paddingBottom:"5px"
}))
const Lineup=(name,list,icon,color)=>Accordion(
    text(name).style({color}),list,icon).style({
        width:"300px",
        textAlign:"center"
    })
ArgentinaLineUp=Lineup("Argentina",ARGENTINA_LIST,"💙🤍",app.Theme.purple)
FranceLineUp=Lineup("France",FRANCE_LIST,"🐓",app.Theme.red)
v=video("wc.mp4").hide()
v.element.currentTime=6
SCENE=SceneCss("100vw","100vh").background("#ddd")
SCENE.camera.posZ(500)

SCENE.add(p(ArgentinaLineUp),p(FranceLineUp),p(v))
SCENE[0].posX(-100).rotX(-PI/12)
SCENE[1].posX(350).rotX(-PI/12)

SCENE.orbit.onChange(()=>{
    channel.emit("orbit_change",{state:SCENE.orbit.currentState})
}) 
channel.on("orbit_change",e=>SCENE.camera.useState(e.state,false,true))
ArgentinaLineUp.summary[0].onPtrDown(()=>{
    ArgentinaLineUp.toggle()
    channel.emit("toggle_arg",{})
})
FranceLineUp.summary[0].onPtrDown(()=>{
    FranceLineUp.toggle()
    channel.emit("toggle_fr",{})
})
channel.on("toggle_arg",()=>ArgentinaLineUp.toggle())
channel.on("toggle_fr",()=>FranceLineUp.toggle())
app.useTheme("dracula")
channel.on("theme_change",e=>app.useTheme(e.theme))
loop(()=>{
    if(screen.width!==outerWidth){
        SCENE.sceneCss.position.x=map(screenLeft,0,innerWidth,170,-170)
        ArgentinaLineUp.show()
        FranceLineUp.show()
        v.hide().pause()
    }
    else {
        SCENE.sceneCss.position.x=0;
        ArgentinaLineUp.hide()
        FranceLineUp.hide()
        v.show().play()
    }
    SCENE.renderCss()  
},{step:100}).start()

THEME_CONTROLS=slider(0,0,66,1).style({
    display:"block",
    margin:"5% auto",
    width:"90%",
    cursour:"pointer",
}).onInput(e=>channel.emit("theme_change",{theme:e.value})),
image("zikojs.png").size("150px").style({
    position:"fixed",
    bottom:"5px ",
    left:"50%",
    transform:"translate(-50%,0)",
    zIndex:2
})
Ziko.SPA(
    Main(),
    {
        "/":SCENE,
        "/theme":THEME_CONTROLS
    }
)