import axios from "axios"

class ApiHelper{
    constructor(){
        this.baseUrl = "http://localhost:5000"
    }

    fetchProduct(){
        return axios.get(`${this.baseUrl}/product`)
    }

    fetchProductById(id){
        return axios.get(`${this.baseUrl}/product/${id}`)
    }
   
    fetchCart(proid){
        return axios.post(`${this.baseUrl}/product/cart/`,{proid})
    }

    userLogin(loginDetails){
        return axios.post(`${this.baseUrl}/user/Login/`, loginDetails)
    }

    userRegister(registreDetails){
        return axios.post(`${this.baseUrl}/user/Registerform/`, registreDetails)
    }
}

const apiHelper = new ApiHelper()

export default apiHelper