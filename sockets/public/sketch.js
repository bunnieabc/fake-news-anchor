// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket, socket2;
var video;
var slider;



function setup() {
  canvas = createCanvas(640, 480, WEBGL);
  canvas.id('p5canvas');
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.id('p5video');
  //video.hide();
  //slider = createSlider(0, 1, 0.5, 0.01);
  //slider.id('blur-slider');

  var seriously = new Seriously();

  var src = seriously.source('#p5video');
  var target = seriously.target('#p5canvas');

  // var blur = seriously.effect('blur');
  // blur.amount = '#blur-slider';
  // blur.source = src;
  // target.source = blur;

  var chroma = seriously.effect('chroma');
  chroma.source = src;
  target.source = chroma;
  var r = 98 / 255;
  var g = 175 / 255;
  var b = 135 / 255;
  chroma.screen = [r,g,b,1];


  seriously.go();









  socket2 = io.connect('http://localhost:3000');
  socket2.on('ct',
    // When we receive data
    function(ctt) {
      console.log("Client num: " + ctt);
      // Draw a blue circle
      
      //socket2.emit('ct',ctt);

    }
  );
  



  
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  /*socket = io.connect('http://localhost:3000');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );*/
}



function draw() {
  // Nothing
}

function mouseDragged() {
  // Draw some white circles
  /*fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);*/
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  /*console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);*/
}
