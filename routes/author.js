const express = require("express");

const Book = require("../models/books");
const Author = require("../models/db");
const router = express.Router();

router.get("/", async (req, res) => {
  let searchoption = {};
  if (req.query.name != null && req.query.name !== "") {
    searchoption.name = new RegExp(req.query.name, "i");
    console.log(searchoption);
  }
  try {
    const author = await Author.find(searchoption);
    res.render("author/index", {
      author: author,
      searchoption: req.query,
    });
  } catch {
    res.redirect("/");
  }
});
router.get("/new", (req, res) => {
  res.render("author/new", { author: new Author() });
});
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newauthor = await author.save();
    res.redirect(`author`);
  } catch {
    res.render("author/new", {
      author: author,
      errorMessage: "error connecting to server",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    console.log(author);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    console.log(books);

    res.render("author/show", {
      author: author,
      bookinfo: books,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
router.get("/:id/edit", async (req, res) => {
  try {
    const Editauthor = await Author.findById(req.params.id);
    res.render("author/edit", {
      author: Editauthor,
    });
  } catch (error) {
    res.redirect("/authors");
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    console.log(req.body.name);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/author/${req.params.id}`);
  } catch (error) {
    console.log(error);
    if (author == null) {
      res.redirect("/");
    } else {
        res.render("author/edit", {
          author: author,
          errorMessage: "error connecting to server",
        });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);

    await author.remove();
    res.redirect(`/author`);
  } catch (error) {
    console.log(error);
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`author${author.id}`);
    }
  }
});

module.exports = router;

        