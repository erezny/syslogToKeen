// Configure instance. Only projectId and writeKey are required to send data.
var keenConfig = {
    projectId: "",
    writeKey: "",
    readKey: "",
    masterKey: "",
    protocol: "https",              // String (optional: https | http | auto)
    host: "api.keen.io/3.0",        // String (optional)
    requestType: "jsonp"            // String (optional: jsonp, xhr, beacon)
};

module.exports= keenConfig;
