const blogModel= require("../models/blogModel");


const blogcreate = async function(req,res){
    try{
    let blog = req.body
    let authorid = blog.authorId
    let checkid = await blogModel.findById(authorid)
    if(!checkid){
        res.status(404).send({status:false,msg:"author not found"})
    }
    res.status(201).send({status:true,data:blog})
}
catch(err){
    res.status(500).send({msg:"server error",error:err})
}
}

 module.exports.blogcreate = blogcreate