Ziko.ExtractAll()
ZikoThree.ExtractAll()
document.body.addEventListener("contextmenu",e=>e.preventDefault())
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
sc=SceneCss("100vw","100vh").background("#ddd");
sc.add(p(Arg,Fr))
Arg.summary[0].onPtrDown(()=>Arg.toggle())
Fr.summary[0].onPtrDown(()=>Fr.toggle())
app.useTheme("dracula")