const { responseReturn } = require("../utils/response");
const userModel = require("../models/userModel");
const noteModel = require("../models/noteModel");

class adminControllers {
  get_users = async (req, res) => {
    if (req.role !== 'admin') {
        return responseReturn(res, 403, {error: 'Access Denied!'})
    }
    try {
        const users = await userModel.find();
        const usersWithCount = await Promise.all(
            users.map(async user => {
                const count = await noteModel.find({ userId: user._id }).countDocuments();
                return {
                    ...user._doc,
                    noteTotal: count,
                }
            })
        )
        responseReturn(res, 200, {users: usersWithCount})
    } catch (error) {
        responseReturn(res, 500, {error: 'Internal Server Error!'})
    }
  }
}

module.exports = new adminControllers();