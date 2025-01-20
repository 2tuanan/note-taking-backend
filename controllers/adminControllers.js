class adminControllers {
  get_users = async (req, res) => {
    console.log(req.role);
  }
}

module.exports = new adminControllers();