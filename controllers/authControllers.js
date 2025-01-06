const userModel = require('../models/userModel');
const { responseReturn } = require('../utils/response');
const bcrypt = require('bcrypt');

class authControllers {
    user_login = async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await userModel.findOne({email}).select('+password');
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                console.log(match);
                
            } else {
                responseReturn(res, 404, {error: 'User not found!'})
            }
        } catch (error) {
            responseReturn(res, 500, {error: error.message})
        }
    }
}
module.exports = new authControllers();