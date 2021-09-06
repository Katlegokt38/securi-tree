const mongoose = require('mongoose');
const config = require('../config/database');
const { unsubscribe } = require('../routes/users');

//Area Schema
const AreaSchema = mongoose.Schema({
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
    childIds: {
        type: Array,
        required: true
    }
});

const Area = module.exports = mongoose.model('Area', AreaSchema);

//Used when database is populated before runtime
module.exports.addArea = function(area, callback){
    area.save(callback); 
}

module.exports.getAreaById = function(id, callback){
    Area.findById(id, callback);
}
