const Area = require('../models/area');
const Door = require('../models/door');
const AccesRule = require('../models/accessRule');
const { updateOne } = require('../models/area');

exports.getTree = async (req,res) => {
    try {
        const area = await findArea(req, res);
        const door = await findDoor(req, res);
        const access = await findAcess(req, res);
        await store(area, door, access, res);
    } 
    catch(err) {
        console.log(err);
    }
}

exports.getDoor = async (req,res) => {
    try {
        await door(res);
    } 
    catch(err) {
        console.log(err);
    }
}

exports.update = async (req,res) => {
    try {
        await updateDoor(req, res);
    } 
    catch(err) {
        console.log(err);
    }
}

function store(data, door, access, res){
    return new Promise((resolve, reject) => {
        let tree = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            tree[i] = {
                id : data[i]._id,
                label : data[i].name,
                parent : data[i].parentId,
                expandedIcon: "pi pi-folder-open",
                collapsedIcon: "pi pi-folder",
                children : []
            } 
        }
        
        let labelDoor;
        let labelAccess;
        let isOpened
        for (let i = 0; i < tree.length; i++) {
            isOpened = "(LOCKED)";
            labelDoor = "[Doors] ";
            labelAccess = "[Access Rules] ";
            for (let j = 0; j < door.length; j++) {
                if(tree[i].id == door[j].parentId){
                    if(door[j].status == "open")
                    {
                        isOpened = "(UNLOCKED)";
                    } 
                    else{
                        isOpened = "(LOCKED)"; 
                    }
                    labelDoor = labelDoor + isOpened + " " + door[j].name + " ";

                    for (let k = 0; k < access.length; k++) {
                        const doorArr = access[k].doors;
                        if(doorArr.includes(door[j].id)){
                            if(!labelAccess.includes(access[k].name)){
                                labelAccess = labelAccess + access[k].name + ", ";
                                
                            }
                            
                        }
                    }
                }
            }
            let label = labelAccess.replace(/,\s*$/, "");
            tree[i].children.push({label : labelDoor, collapsedIcon: "pi pi-mobile"});    
            tree[i].children.push({label : label, collapsedIcon: "pi pi-key"});                              

            for (let j = 0; j < data.length; j++) {
                if (tree[i].id == data[j].parentId) {
                    let tempId = data[j]._id;
                    for (let k = 0; k < tree.length; k++) {
                        if (tempId == tree[k].id) {
                            tree[i].children.push(tree[k]);
                        }
                        
                    }
                    
                }
                
            } 
              
        }

        let root = new Array();
        for (let i = 0; i < tree.length; i++) {
            if (tree[i].parent == "null") {
                root[0] = tree[i];
            }
            
        }
        res.json({
            root
        });

        resolve("Object Created"); 
        
    });
}

function findDoor(req, res){
    return new Promise((resolve, reject) => {
        Door.find({}, (err, data) => {
            if(err)
            {
                console.log(err);
            }
            else{
                resolve(data); 
            } 
        });
        
    });

}

function findArea(req, res){
    return new Promise((resolve, reject) => {
        Area.find({}, (err, data) => {
            if(err)
            {
                console.log(err);
            }
            else{
                resolve(data); 
            } 
        });
        
    });

}

function findAcess(req, res){
    return new Promise((resolve, reject) => {
        AccesRule.find({}, (err, data) => {
            if(err)
            {
                console.log(err);
            }
            else{
                resolve(data); 
            } 
        });
        
    });

}


function door(res){
    return new Promise((resolve, reject) => {
        Door.find({}, (err, data) => {
            if(err)
            {
                console.log(err);
            }
            else{
                return res.json({
                    data
                });
            } 
        });
        resolve("Door");
    });
}

function updateDoor(req, res){
    return new Promise((resolve, reject) => {
        const id = req.body.id;
        const status = req.body.state;
        Door.findOneAndUpdate({_id:id}, {status:status}, (err, data) => {
            if(err){
                throw(err);
            }
            else{
                if(!data){
                    return res.json({
                        success: false,
                        msg: 'Door not found'
                    });
                }
                else{
                    return res.json({
                        success: true,
                        msg: 'Door State Updated'
                    });
                }
            }
        });
        resolve("Door");
    });
}