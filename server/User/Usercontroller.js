const userModel = require("./UserModel")
const Validation = require("./Validation")
const bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken")
class UserController{
    async InsertUser(req, res){
        try {
            const password = bcrypt.hashSync(req.body.password, 8)

            if (!password) {
                return res.status(500).send({message:"Somthing Went Wrong"})
            }
            const result = await userModel.create({...req.body, password: password})
            if (result) {
                return res.status(200).send({message:"Success"})
            }
            return res.status(500).send({message:"Somthing Went Worng"})
        } catch (error) {
            console.log(error);
            if (error && error.code && error.code === 11000) {
                return res.status(400).send({message:"Email is Allready Exist"})
            }
            return res.status(500).send({message:"internal server error"})
        }
    }

    async userLogin(req,res){
        try {
            const {email,password} = req.body

            let validationResult = Validation(req.body, "Login")

            if (validationResult.length > 0) {
                return res.status(400).send({message:"Validation Error", errors: validationResult})
            }




            let result = await userModel.findOne({email:email})
            if (!result) return res.status(400).send({message:"validation error", errors:[{key:"email", message:"Email is not exist"}]})
            
            result = result._doc

            if (!bcrypt.compareSync(password, result.password)) {
                return res.status(400).send({message:"validation error", errors:[{key:"password", message:"password and email are not Matched"}]})
            }

            delete result.password

            const token = Jwt.sign(result,process.env.JWT_SECRATE,{
                expiresIn:"30d"
            })
            result ={
                firstName:result.firstName,
                lastName:result.lastName,
                email:result.email,
            }
            if(!token) return res.status(500).send({message:"Somthing Went Worng"})
            return res.status(200).send({message:"Success", userinfo:result, token:token})
        } catch (error) {
            console.log(error);
        }
    }
    async userRegister(req,res){
        try {
            const {email, password} = req.body
            const ValidationResult = Validation(req.body, "register")
            if (ValidationResult.length > 0) {
                return res.status(400).send({message:"Validation Error", errors:ValidationResult})
            }

            const enPassword = bcrypt.hashSync(password, 8)

            if(!password) return res.status(500).send({message:"Somting Want Wrong"})
            req.body.password = enPassword
            let user = await userModel.create(req.body)
            if(!user) return res.status(500).send({message:"Somthing Went Wrong"})
            user = user._doc
            delete user.password
            const token = Jwt.sign(user, process.env.JWT_SECRATE,{
                expiresIn:"30d"
            })
            if(!token) return res.status(500).send({message:"Somthing Went Wrong"})
            return res.status(200).send({message:"Success", userinfo:user, token:token})
        } catch (error) {
            console.log(error);
            if(error && error.code === 11000){
                return res.status(400).send({message:"Email is Allready Exist"})
            }
            return res.status(500).send({message:"Internal server error"})
        }
    }

}



const userController = new UserController()
module.exports = userController