const express  = require("express"); 
const Book = require("../models/books"); 
const router=  express.Router();
 router.get("/", async(req,res)=>{
    let books ;   

    try{
       books  = await Book.find().sort({createdAt:'desc'}).limit(10).exec(); 
  
   }
   catch{
      console.log("error in front page"); 
   } 
   res.render("index.ejs" , {
      bookinfo:books
   }); 
 })
module.exports  = router; 