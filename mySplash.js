class Splash {
  constructor() {
    this.splashBorder = 100;
    
    stroke(155,248,12);
    strokeWeight(6)
    line(
      this.splashBorder - windowWidth / 2,
      this.splashBorder - windowHeight / 2,
      windowWidth/2 - this.splashBorder,
      windowHeight/2 - this.splashBorder
    );
    line(windowWidth/2 - this.splashBorder,
        this.splashBorder - windowHeight / 2,
        this.splashBorder - windowWidth / 2,
        windowHeight/2 - this.splashBorder)
    
    fill(255,99,71,81);
    stroke(255, 99, 71);
    strokeWeight(6);
    rect(
      this.splashBorder - windowWidth / 2,
      this.splashBorder - windowHeight / 2,
      windowWidth - this.splashBorder * 2,
      windowHeight - this.splashBorder * 2
    );
    

    // let mycolor = color("deeppink");

    this.title = createDiv("Shader Or More");
    this.title.position(this.splashBorder + 20, this.splashBorder + 20);
    this.title.style('color:chartreuse');
    this.title.style('font-family', 'fantasy');
    this.title.style('font-size', '21px');
    this.title.style('background-color', 'tomato');

    this.name = createDiv("Yiting Wang");
    this.name.position(this.splashBorder + 20, this.splashBorder + 60);
    this.name.style('color:lime');
    this.name.style('font-family', 'fantasy');
    this.name.style('background-color', 'tomato');

    this.info = createP(
      "I try to make fast real-time rendering of graphics this time - Shader. I believe some great visuals react to the sound or movements can use shader. Thanks to the GLSL and parallel computing GPU from both of which I learn more based on my learning of the whole semester. <p> I could go on and on and on.<p> <a href=https://editor.p5js.org/ytnawmel/sketches/SBa5slNoB>view code</a>"
    );

    this.info.position(this.splashBorder + 20, this.splashBorder + 100);
    this.info.size(
      windowWidth - this.splashBorder * 2 - 50,
      windowHeight - this.splashBorder * 2 - 50
    );
    this.info.style('color:mediumspringgreen');

    this.info.style('font-size', '15px');
	this.info.style('font-family', 'fantasy');
	this.info.style('background-color', 'tomato');
	this.info.style( 'padding-top','18px');
    this.info.style( 'padding-bottom','63px');
    this.info.style( 'padding-left','15px');
    this.info.style( 'padding-right','15px');
	this.info.style('width', '57%');
    this.info.style('height', '39%');
  }

  //   display(){

  //   }

   update(){
       if(mouseX > windowWidth-this.splashBorder-40 && 
          mouseX < windowWidth-this.splashBorder-20 
          && mouseY < this.splashBorder+40 
          && mouseY > this.splashBorder+20
     ){
     return true
   }
  }
  
  hide() {
    this.title.remove();
    this.name.remove();
    this.info.remove();
  }
}
