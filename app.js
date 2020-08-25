/*
Rough Summary of Library Functions (Express and Socket.io library):

File communication (handled by Express)
  -Client asks server for a file (Ex: customImage.png)

Package communication (handeled by Socket.io)
  -Client sends data to server (Ex: Input)
  -Server sends data to client (Ex: Object position)

URL Format:
      mywebsite.come      :2000          /client/customImage.png
URL = DOMAIN              PORT           PATH
      laptop              usbport        query
*/

/*
-Code to do file communication with express (Sufficient enough for 1 web page)
-Creates the server and listens to the port 2000
-Domain will fall under localhost
NOTE: -This code will display the MainPage.html contents only when the server is started
       under the cmd command 'C:\Users....\PokerWebApp> node app.js' under localhost:2000
      -Start the server then type 'localhost:2000' in the web browser url
*/
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/MainPage.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started");

/*
-Code to do package communication with socket.io library
-Whenever there is a connection the anonymous function 'function(socket)' will be called to display 'socket connection' in CMD
*/
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
  console.log('socket connection');

  /* EXAMPLE CODE:
  -Listens for a message under the string 'happy' and any other data passed as a second
   parameter form the html page will be called under the anonymous function 'function(data)'
  -This works both ways, as the client can use socket.on to receive a message from the server
   and the server can use socket.emit to send a message to the client and vice versa
   */

  socket.on('happy', function(data){
    console.log('Happy because ' + data.reason);
  });
  

})
