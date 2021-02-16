const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  todoTitle: {
    type: String,
    required: true,
  },
  todoBody: {
    type: String,
  },
  todoType: {
    type: String,
    required: true,
  },
  todoDate: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Todo", schema);
