var express = require('express');
var sha1 = require('sha1');
var router = express.Router();
var User = require('../utils/db.js');

// lista wszystkich użytkowników w bazie
router.get('/', function(req, res) {
  User.find(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    res.json(data);
  })
});

// resetowanie zawartości kolekcji użytkowników
// są tworzeni dwaj użytkownicy: admin i asdf
// z hasłami odpowiednio stud234 i asdf, jak poniżej
router.get('/reset', function(req, res, next) {
  User.remove({}, function (err) {
    if (err) return handleError(err);
    var admin = new User({"username":"admin", "password":sha1("stud234"), "admin": true});
    var asdf = new User({"username":"asdf", "password":sha1("asdf") });
    // create two users: 'admin' and 'asdf'
    admin.save((err,data)=>{
      if (err) return console.error(err);
      asdf.save(function(err,data2) {
        if (err) return console.error(err);
        res.render('reset', { data: data, data2: data2} );
      })
    });
  });
});

module.exports = router;
