const express = require("express");
const NoteModel = require("../models/nodeModel");
const noteRouter = express.Router();
noteRouter.use(express.json());

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ authorID: req.body.authorID });
    res.status(200).send(notes);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

// Add notes
noteRouter.post("/add", async (req, res) => {
  let payload = req.body;
  console.log(payload);
  try {
    const data = new NoteModel(payload);
    await data.save();
    res.status(200).send({ msg: "Data added successfuly!!" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Update User
noteRouter.patch("/update/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await NoteModel.findOne({ _id: noteId });
  try {
    if (req.body.authorID !== note.authorID) {
      res
        .status(200)
        .send({ msg: "Your are note authorized to do this action " });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteId }, req.body);
      res.status(200).send({ msg: `The Note with ${noteId} has beed updated` });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Delete route
noteRouter.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await NoteModel.findOne({ _id: noteId });
  try {
    if (req.body.authorID !== note.authorID) {
      res
        .status(200)
        .send({ msg: "Your are note authorized to do this action " });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteId }, req.body);
      res.status(200).send({ msg: `The Note with ${noteId} has beed Deleted` });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = noteRouter;
