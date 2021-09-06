const mongoose = require('mongoose');
const config = require('../config/database');
const { unsubscribe } = require('../routes/users');

//Door Schema
const AccessRulesSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    doors: {
        type: Array,
        required: true
    }
});

const Access = module.exports = mongoose.model('AccessRules', AccessRulesSchema);

//Used when database is populated before runtime
module.exports.addAccess = function(accessRules, callback){
    accessRules.save(callback); 
}

module.exports.getAccessRulesById = function(id, callback){
    Access.findById(id, callback);
}
