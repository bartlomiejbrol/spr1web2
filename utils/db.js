var mongoose = require('mongoose');
var sha1 = require('sha1');

mongoose.connect('mongodb://localhost/lab05app', function(err) {
    if(err) {
        console.log('błąd połączenia', err);
    } else {
        console.log('połączenie udane');
    }
});

// schemat dokumentu opisującego użytkowników w kolekcji users
var userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true},
	password: { type: String, required: true},
  admin: {type: Boolean, default: false}
});

// walidacja poprawności hasła
userSchema.methods.validPassword = function(pass) {
  return sha1(pass)==this.password;
};

// eksportowanie utworzonego modelu kolekcji users
module.exports = mongoose.model('user', userSchema);
