var server = require('ws').Server;
var s = new server({ port: 5001 })

s.on('connection', function(ws) {
    ws.on('message', function(message) {

        message = JSON.parse(message);

        if(message.type === "name") {
            ws.personName = message.data;
            return;
        }


        s.clients.forEach( function e(client) {
            if( client != ws )
                    client.send(JSON.stringify({
                        type: ws.personName,
                        data: message.data
                    }))
        } )

        // send co du lieu thi tra ve cho client
        // ws.send(" From server: " + message)
        
    });
    ws.on("close", function() {
        console.log("I lost a client");
    })

    console.log("one more client connected");
    
}) 