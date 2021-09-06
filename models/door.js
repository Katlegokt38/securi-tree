const mongoose = require('mongoose');
const config = require('../config/database');
const { unsubscribe } = require('../routes/users');

//Door Schema
const DoorSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    parentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Door = module.exports = mongoose.model('Door', DoorSchema);

//Used when database is populated before runtime
module.exports.addDoor = function(door, callback){
    door.save(callback); 
}

module.exports.getDoorById = function(id, callback){
    Door.findById(id, callback);
}
