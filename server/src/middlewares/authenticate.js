const passport = require('../lib/passport');

module.exports = {
  auth: passport.authenticate('jwt', { session: false }),
  admin: (req, res, next) => {
    if(req.user.id_role === 1){
      next();
    }
    else{
      return res.status(401).send('Bukan Admin!');
    }
  },
  customer: (req, res, next) => {
    if(req.user.id_role === 2){
      next();
    }
    else{
      return res.status(401).send('Bukan Customer!');
    }
  },
};
