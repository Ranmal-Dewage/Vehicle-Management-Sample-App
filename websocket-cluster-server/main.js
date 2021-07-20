const http = require('http');
const socketClusterServer = require('socketcluster-server');

let httpServer = http.createServer();
let agServer = socketClusterServer.attach(httpServer);

(async () => {
  // Handle new inbound sockets.
  for await (let { socket, id } of agServer.listener('connection')) {

    console.log("New Client Connected to the Socket ID of : " + id);

    (async () => {
      // Set up a loop to handle remote transmitted events.
      for await (let client of socket.listener('disconnect')) {
        console.log("Client Disconnected from the Socket ID of : " + id);
      }
    })();

    (async () => {
      // Set up a loop to handle and respond to RPCs for a procedure.
      for await (let req of socket.procedure('fileDownloadStatus')) {
        if (req.data && req.data.bad) {
          let error = new Error('File Download Process Failed');
          error.name = 'FileDownloadError';
          req.error(error);
        } else {
          await agServer.exchange.transmitPublish(req.data.channel, req.data);
          req.end({ status: "success" });
        }
      }
    })();

    (async () => {
      // Set up a loop to handle remote transmitted events.
      for await (let data of socket.receiver('errorEvent')) {
        agServer.exchange.transmitPublish(data.channel, data);
      }
    })();

  }
})();

httpServer.listen(8000);
