const prouductModel = require("./ProductModel")


// const data = [
//     {
//         title:'Noice',
//         category:'Smart Watch',
//         image:'/images/im1.jpg',
//         price: 5000,
//         brand:'Noice',
//         rating: 4.5,
//         numReviews: 5,
//         countInStock: 5
//     },
//     {
//         title:'Noice23',
//         category:'Smart Watch',
//         image:'/images/im2.jpg',
//         price: 50000,
//         brand:'Noice23',
//         rating: 2.5,
//         numReviews: 12,
//         countInStock: 6
//     },
//     {
//         title:'hybrid',
//         category:'Smart Watch',
//         image:'/images/im3.jpg',
//         price: 15000,
//         brand:'Noice3',
//         rating: 3.5,
//         numReviews: 9,
//         countInStock: 10
//     },
//     {
//         title:'beatXP',
//         category:'Smart Watch',
//         image:'/images/im4.jpg',
//         price: 35000,
//         brand:'Marv Neo',
//         rating: 4,
//         numReviews: 2,
//         countInStock: 5
//     },
//     {
//         title:'TicWatch E3',
//         category:'Smart Watch',
//         image:'/images/im5.jpg',
//         price: 350000,
//         brand:'Tic',
//         rating: 5,
//         numReviews: 25,
//         countInStock: 2
//     },
//     {
//         title:'Bashaam m471',
//         category:'Smart Watch',
//         image:'/images/im6.jpg',
//         price: 3500,
//         brand:'Bashaam',
//         rating: 3.5,
//         numReviews: 4,
//         countInStock: 9
//     },



// ]







class ProductController{
    // async insertProducts(req,res){
    //     try {
    //         const result = await prouductModel.insertProducts(data)
    //         if (result) {
    //             return res.status(200).send({message:"Success", product:result})
    //         }
    //         return res.status(500).send({message:"Somthing Went Wrong"})
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send({message:"Internal server error"})
    //     }
    // }

    async GetProducts(req,res){
        try {
            const result = await prouductModel.fetchProduct()
            if (result) return res.status(200).send({message:"Success", products:result})
            return res.status(500).send({message:"Somthing Went Wrong"})
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Server Error"})
        }
    }

    async FetchProductById(req,res){
        try {
            const {id} = req.params
           
            const result = await prouductModel.getProductById(id)
        if (!id) return res.status(400).send({message:"Missing dependecy Id"})
            if (result) return res.status(200).send({message:"Success", product:result})
            return res.status(500).send({message:"Somthing Went Wrong"})
        } catch (error) {
            return res.status(500).send({message:"Internal Server error"})            
        }
    }

    async FetchCart(req, res){
        try {
            const { proid } = req.body
            if (!proid) return res.status(400).send({message:"Missing Dependency Proids"})
            const result = await prouductModel.getCart(proid)
            if (result) return res.status(200).send({message:"Success", product: result})
            return res.status(500).send({message:"Somthing Went Wrong"})

        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Server error"})            
        }
    }
}


const productController = new ProductController()
module.exports = productController