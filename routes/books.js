const express = require("express");
const router = express.Router();
const Book = require("../models/books");
const Author = require("../models/db");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

// All Books Route
router.get("/", async (req, res) => {
  let searching = Book.find({});
  let searchoption = {};
  if (req.query.title != null && req.query.title !== "") {
    searching = searching.regex("title", new RegExp(req.query.title, "i"));
    //  console.log(searchoption);
  }
  if (req.query.PublishBefore != null && req.query.PublishBefore !== "") {
    searching = searching.lte("publishDate", req.query.PublishBefore);
  }
  if (req.query.PublishAfter != null && req.query.PublishAfter !== "") {
    searching = searching.gte("publishDate", req.query.PublishAfter);
  }

  try {
    const BOOK = await searching.exec();

    res.render("book/index", {
      bookinfo: BOOK,
      searchoption: req.query,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

// Create Book Route
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pagecount: req.body.pagecount,
    description: req.body.description,
  });
  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save();
    // res.redirect(`books/${newBook.id}`)
    res.redirect(`books`);
  } catch (error) {
    console.log(error);
    renderNewPage(res, book, true);
  }
});

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      author: authors,
      book: book,
    };
    if (hasError) params.errorMessage = "Error Creating Book";
    res.render("book/new", params);
  } catch {
    res.redirect("/books");
  }
}

function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;
  }
}

module.exports = router;
