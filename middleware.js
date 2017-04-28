const token = process.env.MSERVICE_TOKEN;

module.exports = {
  authMiddleware: function(req) {
    console.log(token);
    let query = require('url').parse(req.url,true).query;
    if (query.token === token) {
      return true;
    } else { return false; }
  },
};
