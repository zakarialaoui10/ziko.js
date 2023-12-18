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
sc=SceneCss("100vw","100vh").background("#ddd");
sc.camera.posZ(500)
 arr=new Array(10).fill(null).map((n,i)=>p(`image ${i}`).size("400px","400px").style({background:"green"}))
 ui=arr.map((n,i)=>UI3(n).posZ(-500-i*400).rotX(-PI/4))
sc.add(Arg,Fr,...ui)
sc[0].posX(-230).rotX(-PI/12)
sc[1].posX(230).rotX(-PI/12)
Arg.summary[0].onPtrDown(()=>Arg.toggle())
Fr.summary[0].onPtrDown(()=>Fr.toggle())
app.useTheme("dracula")
loop((e)=>{
    sc.sceneCss.position.x=map(screenLeft,0,innerWidth,170,-170)
    //ui.map((n,i)=>n.posZ(clamp(-500-i*400+e.i*10,-500,-500+1000)))
    sc.renderCss()  
},{step:100}).start()
direction = 1;
function next(){
    loop(e=>{
        ui.map((n,i)=>n.translateZ(10))
        sc.renderCss()  
    },{step:50,t:[0,2000]}).start()
}
function previous(){
    loop(()=>{
        ui.map((n,i)=>n.translateZ(-10))
        sc.renderCss()  
    },{step:50,t:[0,2000]}).start()
}
// loop(e=>{
//     ui.map((n,i)=>n.translateZ(direction*10))
//     sc.renderCss()  
// },{step:100}).start()