const AuthorModel = require("../models/authorModel");
const validator = require("email-validator");

const createAuthor = async function(req, res){
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.sed({data: authorCreated})

};

const getAuthorsData = async function (req, res){

    let authors = await AuthorModel.find()
    

    res.send({data: authors})
};

module.exports.createAuthor = createAuthor;
module.exports.getAuthorsData = getAuthorsData;
