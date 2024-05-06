var mode = 0; 
let Shaderx;
let shaderBg;
let audioStarted = false; 
var song;
// let font;

function preload(){
  Shaderx = loadShader('whatever.vert','whatever.frag');
  song = loadSound('道 Taoism.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  song.play();
  pixelDensity(1);
  
  splash = new Splash();
 
  noStroke();
  getAudioContext().suspend(); 
  // shaderBg = createGraphics(windowWidth, windowHeight, WEBGL)
}

function draw() {
  
    if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
  }
  if (mode == 1) {
    splash.hide();
    
    myCode();
    
  }
}

function myCode(){
  orbitControl();
  debugMode();
  background(220);
    
  // const mx = map(mouseX, 0, width, 0.0, 1.0);
  // const my = map(mouseY, 0, height, 1.0, 0.0);
    Shaderx.setUniform("u_resolution", [displayHeight, displayHeight]);
  Shaderx.setUniform("u_mouse", [mouseX, height-mouseY]);
  Shaderx.setUniform("u_time", frameCount * 0.01);
     shader(Shaderx);
  // background(0);
  // rect gives us some geometry on the screen
rect(0,0,windowWidth, windowHeight);

}

function mousePressed() { // needed to get it to work in full screen mode
    // Start audio on user gesture
    if (!audioStarted) {
        userStartAudio();
        audioStarted = true;
    }
  //   if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
  //   let fs = fullscreen();
  //   fullscreen(!fs);
  // }

}

// function mousePressed() { // needed to get it to work in full screen mode. Add in mousePressed()
//     // Start audio on user gesture
//     if (!audioStarted) {
//         userStartAudio();
//         audioStarted = true;
//     }
// }

// window.onresize = function() {
//   canvas.size(windowWidth, windowHeight);
// };

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

}