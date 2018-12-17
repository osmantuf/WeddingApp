var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var guest = new Schema({
    firstName:{ type: String, require:true},
    lastName: { type: String, require:true},
    rspv: { type: Boolean, default: false },
    email: { type: String, require:true},
    numberOfPeople: { type: Number, require:true},
});
module.exports = Mongoose.model('Guest', guest);