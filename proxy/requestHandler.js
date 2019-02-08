const request = require('request');

const getHandler = (req,res)=>{
  request.get(`${req.app.activePeer}${req.url}`,
    (err, r, body) => res.send(err || body));
};

const postHandler = (req, res) => {
  const reqOptions= {
    url: `${req.app.activePeer}${req.url}`,
    form: req.body
  };
  request.post(reqOptions,(err, r, body) => res.send(err || body));
};

const deleteHandler = (req, res) => {
  const reqOptions = {
    url: `${req.app.activePeer}${req.url}`,
    form: req.body
  };
  request.delete(reqOptions,(err, r, body) => res.send(err || body));
};

const addPeer = ({body,app}, res) => {
  app.peers.push(body.peer);
  res.send();
}
module.exports = {
  getHandler,
  postHandler,
  deleteHandler,
  addPeer,
}
