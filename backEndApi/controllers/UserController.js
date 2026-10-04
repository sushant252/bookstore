const User = require('../models/User')
const bcrypt = require('bcrypt')
async function doAdminLogin(req, res) {
    try{
        let email = req.body.email;
        let user = await User.findOne({email:email});
        if(!user) {
            res.status(400).send({message: 'invalid user or password'});
        } else {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if(validPassword){
                user.lastLogin = new Date();
                await user.save();
                res.status(200).send({success: true, data:user});
            } else {
                res.status(400).send({message: 'invalid user or password'});
            }
        }

    } catch(err) {
        res.status(400).send({message: err});
    }
}
async function getUser(req, res) {
    try {
        let users = await User.find({});
        let usersCount = await User.countDocuments({});

        let activeUsers = await User.countDocuments({Status: "active"});

        let inactiveUsers = await User.countDocuments({Status: "inactive"});
        // console.log(users)
        res.status(200).send({data: users,  totalUsers: usersCount, activeUsers: activeUsers,inactiveUsers: inactiveUsers})
    } catch(err) {
        // console.log(err)
        res.status(400).send({message: 'Something Wrong'})
    }
}

module.exports = {
    doAdminLogin,
    getUser
}