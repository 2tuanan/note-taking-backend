const adminModel = require('../models/adminModel');
const userModel = require('../models/userModel');
const { responseReturn } = require('../utils/response');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/tokenCreate');
const delay = require('../utils/delay');

class authControllers {
    admin_login = async (req, res) => {
        await delay(200);
        const {email, password} = req.body;
        try {
            const admin = await adminModel.findOne({email}).select('+password');
            if (admin) {
                const match = await bcrypt.compare(password, admin.password);
                if (match) {
                    const token = await createToken({
                        id: admin._id,
                        role: admin.role
                    });
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    })
                    responseReturn(res, 200, {token, message: 'Login success!'})
                } else {
                    responseReturn(res, 404, {error: 'Password is incorrect!'})
                }
            } else {
                responseReturn(res, 404, {error: 'User not found!'})
            }
        } catch (error) {
            responseReturn(res, 500, {error: error.message})
            
        }
    }
    user_login = async (req, res) => {
        await delay(200);
        const {email, password} = req.body;
        try {
            const user = await userModel.findOne({email}).select('+password');
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                // console.log(match);
                if (match) {
                    const token = await createToken({
                        id: user._id,
                        role: user.role
                    });
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)})
                    responseReturn(res, 200, {token,message: 'Login success!'})
                } else {
                    responseReturn(res, 404, {error: 'Password is incorrect!'})
                }
            } else {
                responseReturn(res, 404, {error: 'User not found!'})
            }
        } catch (error) {
            responseReturn(res, 500, {error: error.message})
        }
    }
    // End method
    user_register = async (req, res) => {
        const {email, name, password} = req.body;
        try {
            const getUser = await userModel.findOne({email});
            if (getUser) {
                responseReturn(res, 404, {error: 'User already exists!'})
            } else {
                const user = await userModel.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                    noteList: []
                })
                const token = await createToken({
                    id: user._id,
                    role: user.role
                })
                res.cookie('accessToken', token, {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                })
                responseReturn(res, 200, {message: 'Register success!'})
            }
        } catch (error) {
            responseReturn(res, 500, {error: 'Internal server error!'})
        }
    }
    // End method
    get_user = async (req, res) => {
        const {id, role} = req;
        try {
            if (role === 'admin') {
                const admin = await adminModel.findById(id);
                responseReturn(res, 200, {userInfo: admin})
            } else {
                const user = await userModel.findById(id);
                responseReturn(res, 200, {userInfo: user})
            }
        } catch (error) {
            responseReturn(res, 500, {error: 'Internal server error!'})
        }
    }
    // End method

    logout = async (req, res) => {
        try {
            res.cookie('accessToken', null, {
                expires: new Date(Date.now()),
                httpOnly: true
            });
            responseReturn(res, 200, {message: 'Logout success!'})
        } catch (error) {
            responseReturn(res, 500, {error: 'Internal server error!'})
            
        }
    }
}
module.exports = new authControllers();