
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