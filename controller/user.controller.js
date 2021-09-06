const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

exports.authenticate = async (req,res) => {
    try {
        const user = await userName(req, res);
        await password(req.body.password, user, res);
    } 
    catch(err) {
        console.log(err);
    }
}

//Helper Functions
function userName(req, res)
{
    return new Promise((resolve, reject) => {
        User.getUserByUsername(req.body.username, (err, user) => {
            if(err){
                throw err;
            }

            if(!user){
                return res.json({
                    success: false,
                    msg: 'User not found'
                });
            }
            else{
                resolve(user);
            }
        });
    });
}

function password(password, user, res){
    return new Promise((resolve, reject) => {
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err){
                throw err;
            }

            if(isMatch){
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: 'Bearer '+token,
                    user: {
                        firstname: user.firstname,
                        surname: user.surname,
                        username: user.username
                    }
                });
            }
            else{
                return res.json({
                    success: false,
                    msg: 'Incorrect password'
                });
            }
        });
        resolve("Password");
    });
}
    

