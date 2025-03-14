const { responseReturn } = require("../utils/response");
const noteModel = require("../models/noteModel");
const { Types } = require('mongoose');
const userModel = require("../models/userModel");
const delay = require("../utils/delay");

class noteControllers {
    add_note = async (req, res) => {
        await delay(200);
        const {id} = req;
        const {title, content} = req.body;
        if (!title || !content) {
            return responseReturn(res, 400, {error: 'Please fill all fields!'})
        } else {
            try {
                const newNote = await noteModel.create({
                    id: new Types.ObjectId(),
                    userId: id,
                    title,
                    content
                })
                await newNote.save();
                await userModel.findByIdAndUpdate(id, { $inc: {noteTotal: 1} });
                responseReturn(res, 200, {message: 'Note added!', note: newNote})
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
            await userModel.findByIdAndUpdate(req.id, { $inc: {noteTotal: -1} });
            res.status(200).json({message: 'Note deleted!'})
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error!'})
        }

    }
    // End method
}

module.exports = new noteControllers();