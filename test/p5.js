
function setup() {
    // create canvas
    x=createCanvas(200, 100);
    rInput=Ziko.slider(0,0,255,1)
    gInput=Ziko.slider(0,0,255,1)
    bInput=Ziko.slider(0,0,255,1)
    Ziko.Flex(
      new Ziko.ZikoUIElement(x.elt),
      Ziko.text("Red").style({color:"red"}),
      rInput,
      Ziko.text("Green").style({color:"green"}),
      gInput,
      Ziko.text("Blue").style({color:"blue"}),
      bInput
    ).vertical(0,0).style({
      border:"5px orange solid",
      background:"violet"
    })
    rInput.onInput(update_background)
    gInput.onInput(update_background)
    bInput.onInput(update_background)
    update_background()
  }
  function update_background(){
    background(rInput.value,gInput.value,bInput.value)
  }
  
  