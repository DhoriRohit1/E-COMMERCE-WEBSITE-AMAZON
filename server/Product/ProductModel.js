const { default: mongoose } = require("mongoose");

class ProuductModel {
    constructor(){
        this.schema = mongoose.Schema({
            title:{type:String, required:true},
            brand:{type:String, required:true},
            image:{type:String, required:true},
            category:{type:String, required:true},
            price:{type:Number, required:true},
            rating:{type:Number, required:true},
            countInStock:{type:Number, required:true},
            numReviews:{type:Number, required:true}

        },{timestamps:true})

        this.tbl_product = mongoose.model("tb_product", this.schema)
    }

    insertProducts(products){
        return this.tbl_product.insertMany(products)
    }

    fetchProduct(){
        return this.tbl_product.find()
    }

    getProductById(id){
        return this.tbl_product.findById(id)
    }

    getCart(priod){
        return this.tbl_product.find({_id: priod}, {_id: true, image: true, price: true, title: true, countInStock: true, brand: true})
    }
}

const prouductModel = new ProuductModel()
module.exports = prouductModel