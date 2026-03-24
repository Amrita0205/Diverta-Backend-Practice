import {createBook,getBook,getBookbyId} from "../controllers/bookController.js";
import express from "express";

const router=express.Router();


router.post("/",createBook);
router.get('/',getBook);
router.get("/:id",getBookbyId);

export default router;