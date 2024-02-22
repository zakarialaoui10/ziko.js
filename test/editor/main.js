
Ziko.ExtractAll()
ZikoThree.ExtractAll()
//a=useFavIcon("https://img.a.transfermarkt.technology/portrait/big/28003-1694590254.jpg?lm=1")
//a.onChange(e=>console.log(e))

// a=CodeCell("text(1)")
a=CodeNote().style({
    width:"100vw"
})
data=[
    {
        "input": "sc=new SceneGl(\"80vw\",\"70vh\")\nsc.add(cube3(3))\nsc.useOrbitControls()",
        "output": "<figure style=\"position: relative; box-sizing: border-box; font-family: verdana; margin: 0px; padding: 0px; width: 80vw; height: 70vh;\"><canvas data-engine=\"three.js r158\" width=\"572\" height=\"516\" style=\"position: relative; box-sizing: border-box; font-family: verdana; margin: 0px; padding: 0px; width: 572px; height: 516px; touch-action: none;\"></canvas></figure>",
        "order": 1,
        "type": "js"
    }
]
data=[
    {
        "input": "BtnStyle={\n width:\"70%\",\n background:\"darkblue\",\n color:\"white\",\n}\nContainerStyle={\n width:\"200px\",\n height:\"200px\",\n border:\"4px darkblue solid\"\n}\nf=Flex(\n btn(\"Home\"),\n btn(\"About\"),\n btn(\"Education\"),\n btn(\"Portfolio\")\n).vertical(0,\"space-around\").style(ContainerStyle).forEach(n=>n.style(BtnStyle))",
        "output": "",
        "order": 10,
        "type": "js"
    },
    {
        "input": "sc=SceneCss(\"60vw\",\"50vh\")\nsc.add(Main(f))\nsc.background(\"#aaf\")",
        "output": "<figure style=\"position: relative; box-sizing: border-box; font-family: verdana; margin: 0px; padding: 0px; width: 60vw; height: 50vh;\"><canvas data-engine=\"three.js r158\" width=\"572\" height=\"374\" style=\"position: absolute; box-sizing: border-box; font-family: verdana; margin: 0px; padding: 0px; width: 572px; height: 374px;\"></canvas><div style=\"overflow: hidden; touch-action: none; width: 572px; height: 374px;\"><div style=\"transform-origin: 0px 0px; pointer-events: none; width: 572px; height: 374px;\"><div style=\"transform-style: preserve-3d; width: 572px; height: 374px; transform: perspective(401.023px) scale(1) translateZ(401.023px) matrix3d(0.992693, 0.0336058, -0.11589, 0, 0, -0.960434, -0.278507, 0, 0.120664, -0.276472, 0.953417, 0, 0, 0, -344.406, 1) translate(286px, 187px);\"><main draggable=\"false\" style=\"position: absolute; box-sizing: border-box; font-family: verdana; margin: 0px; padding: 0px; width: auto; height: auto; pointer-events: auto; user-select: none; transform: translate(-50%, -50%) matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);\"><div style=\"position: relative; box-sizing: border-box; font-family: verdana; margin: 0px; padding: 0px; width: 200px; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: space-around; border: 4px solid darkblue;\"><button style=\"cursor: pointer; width: 70%; background: darkblue; color: white;\">Home</button><button style=\"cursor: pointer; width: 70%; background: darkblue; color: white;\">About</button><button style=\"cursor: pointer; width: 70%; background: darkblue; color: white;\">Education</button><button style=\"cursor: pointer; width: 70%; background: darkblue; color: white;\">Portfolio</button></div></main></div></div></div></figure>",
        "order": 21,
        "type": "js"
    }
]
a.import(data)
b=csv2arr(`
Assa,Coconut,62.6
Ksar_es_Seghir,Cherry,76.95
Sefrou,Pomegranate,68.67
Khenifra,Lime,36.6
Assa,Green_Beans,96.03
Chefchaouen,Pineapple,89.22
Jorf_El_Melha,Salsify,8.67
Fes,Fig,4.95
Layoune,Kale,84.21
Casablanca,Eggplant,48.14
Ben_guerir,Plum,30.89
Skhirate,Okra,63.18
Midelt,Ginger,80.67
Sefrou,Pomegranate,96.16
Imzouren,Oregano,85.09
Temara,Jackfruit,95.57
Imzouren,Plantain,97.97
Béni_Mellal,Spinach,93.95
Sidi_Bouzid,Cherry,53.62
Guelta_Zemmur,Peach,57.64
`)