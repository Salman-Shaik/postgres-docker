const express = require('express');
const lib = require('./util.js')
const handler = require('./requestHandler.js')

const app = express();
app.initialize = () => {
  app.peers = [];
  app.activePeer = "";
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(lib.fetchActivePeer);
app.use(lib.logger);
app.get("/*",handler.getHandler);
app.post("/*", handler.postHandler);
app.delete("/*", handler.deleteHandler);
app.put("/peer", handler.addPeer);
module.exports = app;
