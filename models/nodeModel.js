const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    data: { type: String, required: false },
    authorID: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("notes", noteSchema);

module.exports = NoteModel;
