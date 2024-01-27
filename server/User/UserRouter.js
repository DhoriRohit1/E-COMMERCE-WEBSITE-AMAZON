const express = require("express")
const userController = require("./Usercontroller")



const UserRouter = express.Router()

UserRouter.post("/user", userController.InsertUser)

UserRouter.post("/user/login", userController.userLogin)

UserRouter.post("/user/register", userController.userRegister)

module.exports = UserRouter