const request = require('request');
const _ = require('lodash');

const fetchActivePeer = (req, res, next) => {
  if (_.isEmpty(req.app.peers)) {
    next();
    return;
  }
  req.app.peers.forEach(peer => {
    request.get(`${peer}/health`,(error,response) => {
      if((!error) && response) req.app.activePeer = peer;
      next();
    })
  })
}

const logger = ({url, method}, res, next) => {
  console.log(`${method} ${url}`);
  next();
}

module.exports = {
  fetchActivePeer,
  logger
}
