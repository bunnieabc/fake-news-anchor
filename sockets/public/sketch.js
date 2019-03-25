// ITP Networked Media, Fall 2014
// https://github.com/shiffman/itp-networked-media
// Daniel Shiffman

// Keep track of our socket connection
var socket, socket2, socket3, socket4, socket_init;
var video;
var slider;
var mouse_click = 0;
var ipad_status = 0;
var client_id;

function countDown(){
  setTimeout(function(){
    $(".wrap").append("<div class='countdown'>3</div>")
    console.log("3")
  }, 500);
  setTimeout(function(){
    $(".countdown").remove();
    $(".wrap").append("<div class='countdown'>2</div>")
    console.log("2")
  }, 1500);
  setTimeout(function(){
    $(".countdown").remove();
    $(".wrap").append("<div class='countdown'>1</div>")
    console.log("1")
  }, 2500);
  setTimeout(function(){
    $(".countdown").remove();
    $(".wrap").append("<div class='countdown'>0</div>")
    console.log("0")
  }, 3500);
  setTimeout(function(){
    subtitleRun();
    window.scrollTo(0,document.body.scrollHeight);
    teleScroll();
  }, 4500)
}

function subtitleRun(){
  $(".countdown").remove();
  $(".wrap").append("<div class='tele-subtitle'>The Metropolitan Transit Authority unveiled a new designated seating system Friday designed to accommodate commuters who seem to be just about to snap. “For too many years, the New York City MTA has failed to meet the needs of scowling riders repeatedly muttering ‘Fuck this shit’ under their breath, but today, we’re excited to announce that individuals about to blow a fuse will now be offered seats where they can have a second of goddamn peace,” said spokesman Aaron Donovan, adding that the initiative would cater to the roughly 1.7 million city residents who find themselves on the brink of daily violent meltdowns by adding a minimum of four seating options by the entrance of each subway car, rail car, and bus. “Those seats reserved for customers one bad moment away from flipping their wig at any second will have signage indicating them as such. Those who are clearly going through some serious shit and wearing an expression conveying ‘Not today’ have long been overlooked, so, as always, offer your seat to the critically cranked-up when at all possible.” Shortly after their introduction, thousands of transit passengers across New York City were seen going totally fucking apeshit upon discovering the priority seats already occupied.</div>")
}

function teleScroll(){
  window.scrollBy(0,-1);
  scrolldelay = setTimeout(teleScroll, 20);
}

//$(".news-section").hide();
function setup() {
  socket_init = io.connect('http://localhost:3000'); 
  socket = io.connect('http://localhost:3000'); // start recording
  socket2 = io.connect('http://localhost:3000'); // news pieces
  socket3 = io.connect('http://localhost:3000'); // socketName recording
  socket4 = io.connect('http://localhost:3000'); //for ipad: which step


  socket3.on('socketName',
    // record client name
    function(data) {
      client_id = new String(data);

    }
  );

  socket4.on('socketStatus', // for telepromopter
    // record client name
    function(data) {
      console.log("socketStatus: " + data);
      if(data == 1) {
        $(".startBtn").hide();
        $(".project-title").hide();
        $(".wrap").removeClass("first-page")
      }
      else if(data == 3){
        countDown(); 
      }
      else if(data == 4){
        $(".tele-subtitle").remove();
      }
    }
  );

  /*socket_init.on("start", function(start_val){
    if(start_val){ // for teleprompter -> btn disappear
      $(".startBtn").hide();
    }
  })*/

  $("body").on("click", ".startBtn", function(){
    $(".wrap").removeClass("first-page")
    ipad_status = ipad_status +1;
    console.log("start btn click")
    $(".startBtn").hide();
    $(".project-title").hide();
    $(".wrap").append("<div class='instruction'><img src='images/instructions.png' class='instr-img'></img><button class='instr-btn' id='step1'>Next</button></div>");
    socket4.emit("socketStatus", ipad_status);
  })

  $("body").on("click", "#step1", function(){
    ipad_status = ipad_status +1;
    socket4.emit('socketStatus', ipad_status);
    if(ipad_status == 2){
      $(".instruction").hide();

      $(".news-section").append('<div class="news-block" id="block1">\
        <div class="news-black-cover"></div>\
        <div class="news-title">MTA Unveils New Designated Seating For Commuters Who Look Like They’re About To Snap</div>\
        <div class="news-description">News from Onion</div>\
      </div>');
      $(".news-section").append('<div class="news-block" id="block2">\
        <div class="news-black-cover"></div>\
        <div class="news-title">MTA Reveals They Have No Idea Where Voices Speaking To Everyone On Subway Coming From</div>\
        <div class="news-description">News from Onion</div>\
      </div>');
    }
  })

  $(".news-section").on("click",".news-block", function(){
    ipad_status = ipad_status + 1;
    socket4.emit('socketStatus', ipad_status);
    if(ipad_status == 3){
      setTimeout(function(){
        $(".news-block").hide();
        $(".wrap").append("<div class='countdown'>3</div>")
        console.log("3")
      }, 500);
      setTimeout(function(){
        $(".countdown").remove();
        $(".wrap").append("<div class='countdown'>2</div>")
        console.log("2")
      }, 1500);
      setTimeout(function(){
        $(".countdown").remove();
        $(".wrap").append("<div class='countdown'>1</div>")
        console.log("1")
      }, 2500);
      setTimeout(function(){
        $(".countdown").remove();
        $(".wrap").append("<div class='countdown'>0</div>")
        console.log("0")
      }, 3500);
      setTimeout(function(){
        $(".countdown").remove();
        
        $(".wrap").css("background-image", "url('images/bg2.png')");

        
        $(".wrap").append("<img src ='images/news/1.jpg' style ='height: 300px; width: 540px; top: 80px; left: 200px;' class='tv'></img>")
        $(".wrap").append("<img src ='images/TV2.png' style ='height: 420px; width: 630px; top: 50px; left: 170px;' class='tv'></img>")
        canvas = createCanvas(640, 480, WEBGL);
        canvas.id('p5canvas');
        video = createCapture(VIDEO);
        video.size(640, 480);
        video.id('p5video');

          video.hide();
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
        var r = 67/ 255;
        var g = 113 / 255;
        var b = 112 / 255;
        chroma.screen = [r,g,b,2];
        seriously.go();
        $(".wrap").append("<img src ='images/template.png' class='template' ></img>")
        $(".wrap").append("<div class='subtitle'>MTA Unveils New Designated Seating For Commuters<br> Who Look Like They’re About To Snap</div>")
        $(".wrap").append("<button class='stop-btn'>STOP</button>");

      }, 4500);
      
    }
    //mouse_click = 1;
    //console.log("why");
    //socket.emit('mouse',mouse_click);
  })
  $(".wrap").on("click", ".stop-btn", function(){
    ipad_status = ipad_status + 1;
    socket4.emit('socketStatus', ipad_status);
  })



  socket2.on('ct',
    // When we receive data
    function(ctt) {
      console.log("Client num: " + ctt);
      // Draw a blue circle
      //socket2.emit('ct',ctt);
      if(ctt <= 2){
        
      }
      else {
        $("body").css("background", "#000");
      }
    }
  );

  /*$(".news-section").on("click",".news-block", function(){
      mouse_click = 1;
      console.log("why");
      socket.emit('mouse',mouse_click);*/
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    //  
    /*
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
  //})
  

  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got this:", data);
      // Draw a blue circle
      if(data){
        $(".wrap").css("background-image", "url('images/bg2.png')");
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
        var r = 67/ 255;
        var g = 113 / 255;
        var b = 112 / 255;
        chroma.screen = [r,g,b,2];
        seriously.go();
      }
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
