Ziko.ExtractAll()
ZikoThree.ExtractAll()
document.body.addEventListener("contextmenu",e=>e.preventDefault());
app=Ziko.App().useTheme(0)
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
Arg=Accordion(
    text("Argentina").style({
        color:app.Theme.purple,
    }),
    ARGENTINA_LIST,
    "💙🤍")
    .size("300px")
    .style({
        textAlign:"center"
    })
    Fr=Accordion(
        text("France").style({
            color:app.Theme.red
        }),
        FRANCE_LIST,
        "💙🤍")
        .size("300px")  
        .style({
            textAlign:"center"
        })  

SCENE=SceneCss("100vw","100vh").background("#ddd")
SCENE.camera.posZ(500)
links=["zikojs.png","zikojs.png","zikojs.png","zikojs.png","zikojs.png","zikojs.png","zikojs.png","zikojs.png","zikojs.png","zikojs.png"]
 arr=new Array(10).fill(null).map((n,i)=>p(image(links[i]).size("100px","100px").style({
    borderRadius:"50%"
 })))
//  ui=arr.map((n,i)=>UI3(n).posZ(-500-i*400).rotX(-PI/4))
 ui=arr.map((n,i)=>UI3(n).pos(200*cos(i*2*PI/10),200*sin(i*2*PI/10)))
SCENE.add(p(Arg),p(Fr),...ui)
SCENE[0].posX(-100).rotX(-PI/12)
SCENE[1].posX(350).rotX(-PI/12)
Arg.summary[0].onPtrDown(()=>Arg.toggle())
Fr.summary[0].onPtrDown(()=>Fr.toggle())
app.useTheme("dracula")
loop((e)=>{
    if(screen.width!==outerWidth){
        SCENE.sceneCss.position.x=map(screenLeft,0,innerWidth,170,-170);
        arr.map(n=>n[0].hide())
        Arg.show()
        Fr.show()
    }
    else {
        SCENE.sceneCss.position.x=0;
        arr.map(n=>n[0].show())
        Arg.hide()
        Fr.hide()
    }
    SCENE.renderCss()  
},{step:100}).start()
direction = 1;
function next(){
    loop(e=>{
        ui.map((n,i)=>n.translateZ(10))
        SCENE.renderCss()  
    },{step:50,t:[0,2000]}).start()
}
function previous(){
    loop(()=>{
        ui.map((n,i)=>n.translateZ(-10))
        SCENE.renderCss()  
    },{step:50,t:[0,2000]}).start()
}
