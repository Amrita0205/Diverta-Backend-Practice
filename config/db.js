import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/diverta")
  .then(() => console.log("Connected to Diverta MonogDB compass database"))
  .catch((err) =>
    console.log("MongoDB compass connection to Diverta unsuccessful", err),
  );