const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")
const middleware = require ("../middleware/auth")


// author api
router.post("/authors",authorController.createAuthor);
router.post("/Login", authorController.Login)
// blog api
router.post("/createblog",middleware.authentication,blogController.blogcreate);
router.get("/getBlog",middleware.authentication ,blogController.getBlog) // get blog by filter
// delete api
router.delete("/blog/:blogId",middleware.authentication,middleware.authorisation,blogController.deleteblog);
router.put("/updateBlog/:blogId",middleware.authentication,middleware.authorisation, blogController.updateBlog);
router.delete("/deletebyquery",middleware.authentication,blogController.deleteByQuery)


module.exports = router;
