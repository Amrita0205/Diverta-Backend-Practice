const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Connecting to the Database in local MongoDB compass in a database called Diverta
mongoose
  .connect("mongodb://localhost:27017/diverta")
  .then(() => console.log("Connected to Diverta MonogDB compass database"))
  .catch((err) =>
    console.log("MongoDB compass connection to Diverta unsuccessful", err),
  );

//Defining the Schema and the model of the book that is to be added
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

const Book = mongoose.model("Book", bookSchema);

// health endpoint API to check if the postman is able to connect to the backend or not
// app.get("/api/health", (req, res) => {
//   try {
//     const dbState = mongoose.connection.readyState;

//     return res.status(200).json({
//       status: "OK",
//       message: "Service is healthy",
//       uptime: process.uptime(),
//       timestamp: new Date(),
//       database: dbState === 1 ? "Connected" : "Disconnected",
//     });
//   } catch (error) {
//     console.error("Health check failed:", error);

//     return res.status(500).json({
//       status: "ERROR",
//       message: "Service is unhealthy",
//       error: error.message,
//     });
//   }
// });  //This is checking the Complete health that is server dependenices database connection

// Checking out the simple health connection:
app.get("/api/health", (req, res) => {
  res.status(200).json("Health is ok!");
});
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     uptime: process.uptime(),
//     timestamp: new Date()
//   });
// });

// Creating the HTTP post API routes to create and store the books with the required fields
app.post("/api/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res
        .status(400)
        .json({ error: "Missing required fields: title,authon, year" });
    }
    const newBook = new Book({ title, author, year });
    await newBook.save();
    return res
      .status(201)
      .json({
        status: "OK",
        message: "Book created successfully",
        Book: newBook,
      });
  } catch (error) {
    return res.status(500).json("Internal server error", error);
  }
});

// Creating the HTTP get API that fetches all the books from the database if present
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res.status(400).json({ error: "No books found empty!" });
    }
    return res
      .status(200)
      .json({
        status: "OK",
        message: "Books fetched successfully",
        Book: books,
      });
  } catch (error) {
    return res.status(500).json("Internal server error", error);
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// NOTE: .json("Hey this is uts one line json response")
// NOTE: .json({message: "But this is for multiple fields json format", status:"OK"})
// curly braces only if there are multiple fields.
