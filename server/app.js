const productRouter = require("./Product/ProductRouter")
const ConnectDb = require("./connectdb")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const UserRouter = require("./User/UserRouter")
dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

ConnectDb()
 
app.use("/product", productRouter)
app.use("/user", UserRouter)

app.get("/", (req,res) => {
    return res.status(200).send({message:"Success"})
})


app.listen(5000, () => {
    console.log("Server Started");
})