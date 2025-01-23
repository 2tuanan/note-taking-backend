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
        responseReturn(res, 200, {users})
    } catch (error) {
        responseReturn(res, 500, {error: 'Internal Server Error!'})
    }
  }
}

module.exports = new adminControllers();