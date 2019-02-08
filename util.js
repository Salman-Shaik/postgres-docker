const request = require('request');

const register = () => {
  const proxyOptions = {
    url: `${process.env.PROXY_URL}:8000/peer`,
    form: {
      peer: `${process.env.URL}`
    }
  }
  request.put(proxyOptions, err => console.log(err || "Sucessfully Added To Proxy"));
}

const logger = ({url, method}, res, next) => {
  console.log(`${method} ${url}`);
  next();
}

module.exports = {
  register,
  logger
}
