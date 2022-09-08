
const AuthorModel = require("../models/authorModel");
const jwt = require('jsonwebtoken')


const createAuthor = async function (req, res) {
    try {
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const nameRegex = /^[a-z/s]+$/i
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

        //    --------------------------------------------bodyvalidation----------------------------------------------------------------------------
        let author = req.body
        if (Object.keys(author).length == 0) return res.status(400).send({ msg: "Please Provide Data", error: "Body can't be Empty" })

        // -------------------------------------------------fname validation----------------------------------------------------------------------
        if (!author.fname) return res.status(400).send({ status: false, msg: "fname is required" })

        if (!author.fname.match(nameRegex)) return res.status(400).send({ status: false, msg: "Invalid format of fname" })

        // --------------------------------------------------lname validation --------------------------------------------------------------------
        if (!author.lname) return res.status(400).send({ status: false, msg: "lname is required" })

        if (!author.lname.match(nameRegex)) return res.status(400).send({ status: false, msg: "Invalid format of lname" })

        // --------------------------------------------------title validation----------------------------------------------------------------------
        if (!author.title) return res.status(400).send({ status: false, msg: "title must be present" })

        // -----------------------------------------------------email validation ------------------------------------------------------------
        if (!author.email) return res.status(400).send({ Status: false, msg: "email is required" })

        //   emailregex validation

        if (!author.email.match(emailRegex)) return res.status(400).send({ status: false, msg: "email must valid format " })

        let alreadyexistemail = await AuthorModel.findOne({ email: author.email })

        if (alreadyexistemail) return res.status(400).send({ status: false, msg: "email already exist" })

        // password regex validation

        if (!author.password.match(passRegex)) return res.status(400).send({ status: false, msg: "password must follow valid format or less than less than 8 caraters" })

        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ data: authorCreated })

    }

    catch (err) {
        res.status(500).send({ msg: "Server Error", error: err.message })

    }
};


//_____________________________________________Login User_____________________________________________-

let Login = async function (req, res) {
    try {
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

        let username = req.body.email
        let password = req.body.password

        if (!username || !password) {
            res.status(400).send({ msg: "Username and Password is mandatory" })
        }
        if (!username.match(emailRegex)) return res.status(400).send({ status: false, msg: "username is not in correct formate" })

        if (!password.match(passRegex)) return res.status(400).send({ status: false, msg: "password is not in correct formate" })
        else {
            try {
                // Proper Login Details and User Found
                let validauthor = await AuthorModel.findOne({ email: username, password: password });

                let token = jwt.sign(
                    {
                        userId: validauthor._id.toString(),
                        organisation: "FunctionUp",
                    },
                    "PROJECT-1"   //Secrete key
                );

                res.setHeader("x-api-key", token);
                res.status(200).send({ status: true, msg: token })
            }

            // In this case no User found with given login details
            catch (err) {
                res.status(401).send({ msg: "Error! UnAuthorized User", error: err.message })
            }
        }
    }

    catch (err) {
        res.status(500).send({ msg: "Server Error", error: err.message })
    }
}



module.exports.createAuthor = createAuthor;
module.exports.Login = Login
