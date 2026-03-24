import mongoose from "mongoose";



//Defining the Schema and the model of the book that is to be added
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

export default mongoose.model("Book", bookSchema);