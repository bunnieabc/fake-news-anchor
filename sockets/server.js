// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

////test number of socket
var socketNum = 0;
///

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  

    function (socket) {
      socketNum = socketNum + 1;
    // When this user emits, client side: socket.emit('otherevent',some data);
      io.to(socket.id).emit('ct', socketNum);
      io.to(socket.id).emit('socketName', socket.id);

      socket.on("socketStatus", function(socket_status){
        console.log("Socket Status: " + socket_status.status);
        if(socket_status.status == 1){
          socket.broadcast.emit('socketStatus', socket_status); // to another socket
        }
        else if(socket_status.status == 3){
          socket.broadcast.emit('socketStatus', socket_status); // to another socket
        }
        else if(socket_status.status == 4){
          socket.broadcast.emit('socketStatus', socket_status); // to another socket
        }
        //socket.broadcast.emit('socketStatus', socket_status);
      })

      socket.on('mouse',
        function(mouse_click) {
          // Data comes in as whatever was sent, including objects
          console.log("Received: 'mouse: true?' " + mouse_click);

          // Send it to all other clients
          socket.broadcast.emit('mouse', mouse_click);
          // This is a way to send to everyone including sender
          // io.sockets.emit('message', "this goes to everyone");

        }
      );
      
      socket.on('disconnect', function() {
        socketNum = socketNum - 1;
        console.log("Client has disconnected");
      });
    }

    /*,

    function (socket2) {
      socketNum = socketNum + 1;
      console.log("We have a new client: " + socket.id);
      console.log("SocketNum: " + socketNum);


      socket2.on('ct',
        function(ctt) {
          // Data comes in as whatever was sent, including objects
          console.log("ctt: " + socketNum);
          // Send it to all other clients
          socket2.broadcast.emit('ct', socketNum);
          
          // This is a way to send to everyone including sender
          // io.sockets.emit('message', "this goes to everyone");
        });

      // When this user emits, client side: socket.emit('otherevent',some data);
      
      socket2.on('disconnect', function() {
        console.log("Client has disconnected");
    });}
    */


);