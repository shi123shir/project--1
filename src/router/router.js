const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/authors",authorController.createAuthor);
router.post("/createblog",blogController.blogcreate);
router.get("/getBlog", blogController.getBlog) // get blog by filter
router.delete("/blog/:blogId",blogController.deleteblog);
router.put("/updateBlog/:blogId", blogController.updateBlog);

router.delete("/deletebyquery", blogController.deleteByQuery)
router.post("/Login", authorController.Login)

module.exports = router;
