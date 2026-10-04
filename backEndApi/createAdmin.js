const User = require('./models/User')
const bcrypt = require('bcrypt')
async function createAdmin() {
    try{
        let user = await User.findOne({email:'sushant@yopmail.com'})
        if(user) {
            console.log('user update successfully...');
        } else {
            user = new User();
            user.firstName = 'Sushant';
            user.lastName = 'kumar';
            user.mobileNo = '7827307281'
            user.email = 'sushant@yopmail.com';
            let password = bcrypt.hashSync('1234567', 10);
            user.password = password;
            user.userType = 'admin';
            await user.save();
            console.log('user created successfulyy.....')
        }
    } catch(err) {
        console.log(err)
    }
}
module.exports = createAdmin