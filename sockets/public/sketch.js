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

function countDown(id){
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
    subtitleRun(id);
    window.scrollTo(0,document.body.scrollHeight);
    teleScroll();
  }, 4500)
}

function subtitleRun(id){
  $(".countdown").remove();
  if(id == 0){
    $(".wrap").append("<div class='tele-subtitle'>The Metropolitan Transit Authority unveiled a new designated seating system Friday designed to accommodate commuters who seem to be just about to snap. “For too many years, the New York City MTA has failed to meet the needs of scowling riders repeatedly muttering ‘Fuck this shit’ under their breath, but today, we’re excited to announce that individuals about to blow a fuse will now be offered seats where they can have a second of goddamn peace,” said spokesman Aaron Donovan, adding that the initiative would cater to the roughly 1.7 million city residents who find themselves on the brink of daily violent meltdowns by adding a minimum of four seating options by the entrance of each subway car, rail car, and bus. “Those seats reserved for customers one bad moment away from flipping their wig at any second will have signage indicating them as such. Those who are clearly going through some serious shit and wearing an expression conveying ‘Not today’ have long been overlooked, so, as always, offer your seat to the critically cranked-up when at all possible.” Shortly after their introduction, thousands of transit passengers across New York City were seen going totally fucking apeshit upon discovering the priority seats already occupied.</div>")
  }
  else {
    $(".wrap").append("<div class='tele-subtitle'>In response to numerous complaints regarding recent delays and route changes to the city’s public transportation system, Metropolitan Transportation Authority officials at a press conference Monday reminded residents that they can fucking walk. “While we always do our best to avoid inconveniencing our customers, city residents should be aware that at any time, they are more than welcome to get off their asses and use their two fucking feet to reach destinations,” said MTA spokesperson Reggie Dawes, adding that the city’s comprehensive street grid system is easily accessible on foot “for any lazy bastard” and should be used as an alternative method of transportation if customers are unable to wait “10 extra goddamn minutes” for their train or bus. “We apologize to anyone frustrated by interruptions in service of our incredibly intricate 24-hour transportation system that provides fast commutes in relative ease and comfort, but remember, you can always just shut the hell up and take a fucking hike. You know what else connects to major locations all over the city? The sidewalk, you ungrateful pieces of shit.” At press time, the MTA announced that multiple train and bus lines were running behind schedule and stressed that if commuters didn’t leave early enough or plan accordingly, it was not their fucking problem.</div>");
  }
}

function teleScroll(){
  window.scrollBy(0,-1);
  scrolldelay = setTimeout(teleScroll, 30);
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
      console.log("socketStatus: " + data.status);
      if(data.status == 1) {
        $(".startBtn").hide();
        $(".project-title").hide();
        $(".wrap").removeClass("first-page")
      }
      else if(data.status == 3){
        countDown(data.id);
      }
      else if(data.status == 4){
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
    socket4.emit("socketStatus", { status: ipad_status, id: 0 });
  })

  $("body").on("click", "#step1", function(){
    ipad_status = ipad_status +1;
    socket4.emit('socketStatus', { status: ipad_status, id: 0 });
    if(ipad_status == 2){
      $(".instruction").hide();

      $(".news-section").append('<div class="news-block" id="block1" data-card="0">\
        <div class="news-black-cover"></div>\
        <div class="news-title">MTA Unveils New Designated Seating For Commuters Who Look Like They’re About To Snap</div>\
        <div class="news-description">News from Onion</div>\
      </div>');
      $(".news-section").append('<div class="news-block" id="block2" data-card="1">\
        <div class="news-black-cover"></div>\
        <div class="news-title">MTA Reminds New Yorkers They Can Fucking Walk</div>\
        <div class="news-description">News from Onion</div>\
      </div>');
    }
  })

  $(".news-section").on("click",".news-block", function(){
    ipad_status = ipad_status + 1;
    if($(this).data("card") == 0)
      socket4.emit('socketStatus', { status: ipad_status, id: 0 });
    else
      socket4.emit('socketStatus', { status: ipad_status, id: 1 });
    cardId = $(this).data("card")

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
        var r = 92/ 255;
        var g = 143 / 255;
        var b = 140 / 255;
        chroma.screen = [r,g,b,2];
        seriously.go();
        $(".wrap").append("<img src ='images/template.png' class='template' ></img>")

        console.log("test card:", $(this).data("card"))
        if(cardId == 0)
          $(".wrap").append("<div class='subtitle'>MTA Unveils New Designated Seating For Commuters<br> Who Look Like They’re About To Snap</div>")
        else
          $(".wrap").append("<div class='subtitle'>MTA Reminds New Yorkers They Can Fucking Walk<br></div>")
        $(".wrap").append("<button class='stop-btn'>STOP</button>");

      }, 4500);
      
    }
    //mouse_click = 1;
    //console.log("why");
    //socket.emit('mouse',mouse_click);
  })
  $(".wrap").on("click", ".stop-btn", function(){
    ipad_status = ipad_status + 1;
    socket4.emit('socketStatus', { status: ipad_status, id: 0 });
    $("#p5canvas").remove();
    $(".wrap").css("background", "black");
    $(".wrap").html('<h2 style="width: 100%; color:white; font-size: 45px; text-align:center;margin-bottom: 0px;">Preview</h2>\
      <video controls autoplay width="800" height="600" \
       name="Video Name" src="videos/preview.mov"></video> \
       <div class="repo-section"><a class="repo-btn" href ="repo.html">View others videos</a></div> \
       ')
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
        var r = 100/ 255;
        var g = 125 / 255;
        var b = 101 / 255;
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
