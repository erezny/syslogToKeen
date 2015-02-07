var syslogParser = require('glossy').Parse; // or wherever your glossy libs are
var dgram  = require("dgram");
var server = dgram.createSocket("udp4");

var Keen = require('keen-js');
var KeenConfig = require('./config/dev.js');

// Configure instance. Only projectId and writeKey are required to send data.
var keenClient = new Keen(KeenConfig);

//var Event = { "collection.name": [message, message, ...]}

var messageBuffer = [];
var timeLastSent = [];

var sendMessages = function(collection, messages){
  // send multiple events to Keen IO
  var events = { collection: messages};
  keenClient.addEvents(events, function(err, res) {
    if (err) {
      console.log("Oh no, an error!");
    } else {
      console.log("Hooray, it worked!");
    }
  });
};

server.on("message", function(rawMessage) {
    syslogParser.parse(rawMessage.toString('utf8', 0), function(parsedMessage){
        console.log(parsedMessage.host + ' - ' + parsedMessage.message);
        messageBuffer.push(parsedMessage);
        if (messageBuffer.length > 30) {
          sendMessages("syslog", messageBuffer.splice(0, 30));
        }
    });
});

server.on("listening", function() {
    var address = server.address();
    console.log("Server now listening at " + address.address + ":" + address.port);
});

server.bind(1514); // Remember ports < 1024 need suid
