const { responseReturn } = require("../utils/response");
const noteModel = require("../models/noteModel");

class noteControllers {
    add_note = async (req, res) => {
        const {id} = req;
        const {title, content} = req.body;
        if (!title || !content) {
            return responseReturn(res, 400, {error: 'Please fill all fields!'})
        } else {
            try {
                await noteModel.create({
                    userId: id,
                    title,
                    content
                })
                responseReturn(res, 200, {message: 'Note added!'})
            } catch (error) {
                responseReturn(res, 500, {error: 'Internal Server Error!'})
            }
        }        
    }
    // End method
    get_notes = async (req, res) => {
        const {id} = req;
        try {
            const notes = await noteModel.find({userId: id});
            const totalNotes = await noteModel.find({userId: id}).countDocuments();
            responseReturn(res, 200, {notes, totalNotes})
        } catch (error) {
            console.log(error.message);
        }
    }
    // End method
    delete_note = async (req, res) => {
        try {
            const {id} = req.params;
            await noteModel.findByIdAndDelete(id);
            if (!id) {
                return res.status(400).json({error: 'Note not found!'})
            }
            res.status(200).json({message: 'Note deleted!'})
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error!'})
        }

    }
    // End method
}

module.exports = new noteControllers();