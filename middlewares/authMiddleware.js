// Este arquivo foi corrigido pelo Prof Guilherme no dia 29/10/2019 com base no https://github.com/catolicasc-programacao/projeto_web/blob/master/middlewares/authMiddleware.js

var authService = require('../services/authService');

function redirectToLogin(req, res) {
  res.locals.loggedUser = null;
  res.redirect('/auth/login?redirect=' + req.baseUrl);
}

var verifyAuth = function(req, res, next) {
  var loginToken = req.cookies['loginToken'];

  if(loginToken) {
    if(req.session.authenticatedUsers) {
      var user = req.session.authenticatedUsers.find(u => u.loginToken === loginToken);

      if (user) {
        res.locals.loggedUser = authService.getUserByEmail(user.email);
        next();
      }else{
        redirectToLogin(req, res);
      }
    }else{
      redirectToLogin(req, res);
    }
  }else{
    redirectToLogin(req, res);
  }
}

module.exports = verifyAuth;