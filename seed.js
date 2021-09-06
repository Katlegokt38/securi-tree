'use strict';

const mongoose = require('mongoose');
const config = require('./config/database');
const User = require('./models/user');
const Area = require('./models/area');
const Door = require('./models/door');
const AccesRule = require('./models/accessRule');
const fs = require('fs');

dbPopulate();

//Functions
async function dbPopulate(){
    try {
        await connectDB();
        await populate();
        await disconnectDB();
    } 
    catch(err) {
        console.log(err);
    }
}

// Helper Functions
function connectDB(){
    return new Promise((resolve, reject) => {
        try {
            mongoose.connect(config.database);
            console.log("Connected");
            resolve("Connected");
        } catch (err) {
            throw err;
        }
        
    })
}

function disconnectDB(){
    try {
        return new Promise((resolve, reject) => {
            console.log("Database Populated successfully");
            // mongoose.disconnect();
            resolve("Disconnected");
            
        }); 
    } catch (err) {
        throw err;
    }
    
}

function populate(){
    try {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(fs.readFileSync('./seed/registered_users.json'));
            const area = JSON.parse(fs.readFileSync('./seed/system_data.json'));
            let userSize = user.registered_users.length;
            let areaSize = area.system_data.areas.length;
            let doorSize = area.system_data.doors.length;
            let accessRuleSize = area.system_data.access_rules.length;
    
            //Populate users in db
            let users = new Array(userSize);
            for(let i = 0; i < userSize; i++){
                users[i] = new User({
                    firstname : user.registered_users[i].first_name,
                    surname : user.registered_users[i].surname,
                    username : user.registered_users[i].username,
                    password : user.registered_users[i].password
                })
            }
    
            //Populate areas
            let areas = new Array(areaSize);
            for(let i = 0; i < areaSize; i++){
                if(area.system_data.areas[i].parent_area == null )
                {
                    areas[i] = new Area({
                        _id : area.system_data.areas[i].id,
                        name : area.system_data.areas[i].name,
                        parentId: "null",
                        childIds : area.system_data.areas[i].child_area_ids
                    })
                }
                else{
                    areas[i] = new Area({
                        _id : area.system_data.areas[i].id,
                        name : area.system_data.areas[i].name,
                        parentId : area.system_data.areas[i].parent_area,
                        childIds : area.system_data.areas[i].child_area_ids
                    })
                }
            }
    
            //Populate Doors
            let doors = new Array(doorSize);
            for(let i = 0; i < doorSize; i++){
                doors[i] = new Door({
                    _id : area.system_data.doors[i].id,
                    name : area.system_data.doors[i].name,
                    parentId : area.system_data.doors[i].parent_area,
                    status : area.system_data.doors[i].status
                })
            }
    
            //Populate AccessRules
            let access = new Array(accessRuleSize);
            for(let i = 0; i < accessRuleSize; i++){
                access[i] = new AccesRule({
                    _id : area.system_data.access_rules[i].id,
                    name : area.system_data.access_rules[i].name,
                    doors : area.system_data.access_rules[i].doors
                })
            }
    
            add(users, areas, doors, access);
            resolve("Populated");
        });
    } catch (err) {
        throw err;
    }
    
}

async function add(users, areas, doors, access){
    try {
        await areaAdd(areas);
        await doorAdd(doors);
        await accessAdd(access);
        await userAdd(users);
    } 
    catch(err) {
        console.log(err);
    }
    
}

function userAdd(users)
{
    return new Promise((resolve, reject) => {
        for(let i = 0; i< users.length; i++){
            User.addUser(users[i], (err) => {
                if(err){
                    throw err;
                }
            });
        }
        resolve("Users added");
    });
}

function areaAdd(areas)
{
    return new Promise((resolve, reject) => {
        for(let i = 0; i< areas.length; i++){
            Area.addArea(areas[i], (err) => {
                if(err){
                    throw err;
                }
            })
        }
        resolve("Areas added");
    });
}

function doorAdd(doors)
{
    return new Promise((resolve, reject) => {
        for(let i = 0; i< doors.length; i++){
            Door.addDoor(doors[i], (err) => {
                if(err){
                    throw err;
                }
            });
        }
        resolve("Doors added");
    });
}

function accessAdd(accessRule)
{
    return new Promise((resolve, reject) => {
        for(let i = 0; i< accessRule.length; i++){
            AccesRule.addAccess(accessRule[i], (err) => {
                if(err){
                    throw err;
                }
            });
        }
        resolve("Access Rules added");
    });
}