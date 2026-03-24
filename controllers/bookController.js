import Book from "../models/Book.js";

// Creating the HTTP post API routes to create and store the books with the required fields
export const createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res
        .status(400)
        .json({ error: "Missing required fields: title,authon, year" });
    }
    const newBook = new Book({ title, author, year });
    await newBook.save();
    return res.status(201).json({
      status: "OK",
      message: "Book created successfully",
      Book: newBook,
    });
  } catch (error) {
    return res.status(500).json("Internal server error", error);
  }
};

// Creating the HTTP get API that fetches all the books from the database if present
export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res.status(400).json({ error: "No books found empty!" });
    }
    return res.status(200).json({
      status: "OK",
      message: "Books fetched successfully",
      Book: books,
    });
  } catch (error) {
    return res.status(500).json("Internal server error", error);
  }
};

// Creating the get function using id as a parameter in the URL
export const getBookbyId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ status: "Missing field", message: "The field is missing" });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ status: "Not found", message: "No book found!" });
    }
    return res
      .status(200)
      .json({ status: "OK", message: "The book has been found", data: book });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Internal error", message: error.message });
  }
};

// PUT fuinction for partial update of the book details
// export const updatebook = async (req, res) => {
//   try {
// const {id}=req.params;
//     const {title,author,year}=req.body;
// if(!title&&!author&&!year){
// return res.status(400).json({status:"Error",message:"NO fields provided to update"})};
//   
// const newBook= await Book.findByIdAndUpdate(id,req.body)
// } catch (error) {
//     return res
//       .status(500)
//       .json({ status: "Internal error", message: error.message });
//   }
// };
// This is the PUT function complete it tomorrow.
