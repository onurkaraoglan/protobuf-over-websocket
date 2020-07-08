
"use strict"

const user = require('./pb/protos/user_pb')
const WebSocket = require('./node_modules/ws')
const timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb')

/*
Protobuf encodes data to byteArray.
We need to convert it to human readable format.
*/
function byteArrayToString(myUint8Arr){
    return String.fromCharCode.apply(null, myUint8Arr);
}

function connect() {
    // We use promise to make sure connected to websocket before send data.
    return new Promise(function(resolve, reject) {
        // 'ws' can be used instead 'wss' if we don't have 'https' connection.
        const ws = new WebSocket('wss://example.com/') 
        ws.onopen = function() {
            resolve(ws);
        };
        ws.onmessage = function (evt) { 
            var received_msg = evt.data;
            console.log(byteArrayToString(received_msg));
         };
  
        ws.onerror = function(err) {
            reject(err);
        };

    });
}

connect().then(function(ws) {
    const msg = {
        ID: 1,
        Name: "Onur",
        Surname: "Karaoğlan",
        Email: "okaraoglan91@gmail.com",
        Login: {
            IsActive: true,
            FailedAttemps: 0,
            LastLogin: {
                seconds: 1594209068, //Unix Time Stamp
                nanos: 0
             }
        }
    };

    // Define variable types from 'user_pb.js' file
    var usr = new user.User();
    var login = new user.Login();

    // Timestamp cannot be send directly on protobuf. Instead of that we need to set it as a variable
    const timestampFromDate = new timestamp_pb.Timestamp();
    timestampFromDate.setSeconds(msg.Login.LastLogin.seconds);
    timestampFromDate.setNanos(msg.Login.LastLogin.nanos);

    /*
    These functions come from 'user_pb.js' file. 
    Proto compiler automatically create them from proto file.
    */
    usr.setId(msg.ID);
    usr.setName(msg.Name);
    usr.setSurname(msg.Surname);
    usr.setEmail(msg.Email);
    
    login.setUser(usr);
    login.setIsactive(msg.Login.IsActive);
    login.setFailedattemps(msg.Login.FailedAttemps);
    login.setLastlogin(timestampFromDate);

    // Serializes this message to protocol buffers binary wire format.
    var bytes = login.serializeBinary();
    ws.send(bytes);
}).catch(function(err) {
    console.log(err);
});
