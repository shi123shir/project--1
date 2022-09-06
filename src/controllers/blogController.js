const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel")

const blogcreate = async function (req, res) {
    try {
        let blog = req.body
        let authorid = blog.authorId
        // --------------------------------------body must be present validation---------------------------------------------------------------------
        if (Object.keys(blog).length == 0) {
            res.status(400).send({ msg: "Error", error: "Provide Proper Data" })
        }
        // --------------------------------------------authorid validation-----------------------------------------------------------------------------
        if (!authorid) {
            res.status(400).send({ msg: "Error", error: "Please Provide authroid" })
        }
        if(!blog.title){
            return res.status(400).send({status:false,msg:"title must be pragent"})
        }
        if(!blog.tags){
            return res.status(400).send({status:false,msg:"tags must be pragent"})
        }
        if(!blog.category) {
            return res.status(400).send({status : false, msg:"category is required"})
        }
        
        let checkid = await authorModel.findById(authorid)
        if (!checkid) {
            res.status(404).send({ status: false, msg: "Author not found" })
        }

        let createblog = await blogModel.create(blog)
        res.status(201).send({ data: createblog })
    }

    catch (err) {
        res.status(500).send({ msg: "Server Error", error: err.message })
    }
};

//-------------------------------------------------PUT Api-------------------------------------//


const updateBlog = async function (req, res) {
    try{
        const blogid = req.params.blogId
        const blogupdate = req.body
        if(Object.keys(blogupdate).length == 0){
            return res.status(404).send({status:false,msg:"data must be given"})
        }
        const updateBlog = await blogModel.findOneAndUpdate({ _id: blogid, isDeleted : false},
         { 
            $set : {isPublisher :true, body: blogupdate.body , title : blogupdate.title, publishedAt:new Date()},
            $push :{tags: blogupdate.tags, subcategory: blogupdate.subcategory}
         },
         {new: true});
    return res.status(201).send({updateBlog})
    
}catch(err){

    res.status(404).send({ msg:"blog doesn't exist" , error:err.message})
}}



//__________________________________Get Blog____________________________________


const getBlog = async function (req, res) {
    try {
        let data = req.query
        if (Object.keys(data) == 0) {
           return res.status(400).send({ error: "Please Provide data to get Blog" })
        }

        let findBlog = await blogModel.find({ $and: [{ isDeleted: false, isPublished: true }, data] })
        if (!findBlog) {
           return res.status(404).send({ msg: "Page not found" })
        }
        res.status(200).send({ msg: "Data Found", data: findBlog })
    }

    catch (err) {
        res.status(500).send({ msg: "Server Error", error: err.message })
    }
}


/*                               Delete Blog                           */


const deleteblog = async function (req,res){
  try {
    const blogid = req.params.blogId;
    const blog = await blogModel.findById(blogid)
    if(blog.isDeleted === true){
        return res.status(404).send ({status: false ,msg : "blog not exist"})
    }
    let deletedb = await blogModel.findOneAndUpdate({_id:blogid}, {isDeleted:true,deletedAt:new Date()})
   res.status(200).send({status : true , msg :'Data is deleted successfully'})
  } catch (err) {
      res.status(500).send({status :false, error:err})
  }
  
}
//__________________________________Get Blog____________________________________


module.exports.blogcreate = blogcreate;
module.exports.getBlog = getBlog;
module.exports.deleteblog = deleteblog;
module.exports.updateBlog = updateBlog;

