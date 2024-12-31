const randToken = require('rand-token');
var AuthUserService = require('../service/auth.service');
const refreshTokens = {};

const loginForm = async function (req, res) {
  let body = req.body;
  let err;
  [err, user] = await to(AuthUserService.authUser(body));
  if (user) {
    delete user.dataValues.password;
    var refreshToken = randToken.uid(256);
    refreshTokens[refreshToken] = {
      user: user
    };
    [err, token] = await to(user.getJWT());
    // [err,role]=await to(user.checkRole(body.role));
    if (err) return ReE(res, {err}, 422);
    // return ReS(res, { token, refreshToken: refreshToken, user: user, userId: user.id });
    return ReS(res, { token, refreshToken: refreshToken, userId: user.id });
  }
  if (err) return ReE(res, {err});
}
module.exports.loginForm = loginForm;


const forgetPassowrd =async function(req,res){
  let body =req.body;
  let err,user;
  [err, user] = await to(AuthUserService.changePassword(body));
  const isSuccess = user > 0 ;
  if (err) ReE(res, {err});
  if(user) return ReS(res,{updatePassword:isSuccess});
}
module.exports.forgetPassowrd =forgetPassowrd
