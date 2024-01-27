import { useEffect, useState } from "react"
import apiHelper from "../Commen/ApiHelper"
import ProductCard from "../Componets/ProductCard"
import Loader from "../Componets/Loader"
import Message from "../Componets/Messagebox"
import Slider from "../Componets/Slider"


export default function HomeScreen() {

    const [Products, setproducts] = useState([])
    const [loading, setloading] = useState(false)
    const [Error, setError] = useState("")


    const GetProducts = async () => {
        try {
            setloading(true)
            const result = await apiHelper.fetchProduct()
            setproducts(result.data.products)

            setTimeout(() => {

                setloading(false)
            }, 980);


        } catch (error) {
            if (error && error.response && error.response.data && error.response.data.Message) {
                setError(error.response.data.Message)
            } else {

                setError(error.message)
            }
            setloading(false)
        }
    }
    useEffect(() => {
        GetProducts()
    }, [])








    return <>
        {
            Error ? <Message> {Error}</Message> : <>
                <Loader loading={loading} />
                <Slider />
                <div className="container py-5 d-flex justify-content-center">
                    <div className="row d-flex justify-content-center">
                        <h4 id="shine1">Feture Products</h4>
                        {
                            Products.map((Product) => {
                                return <ProductCard key={Product.id} product={Product} />
                            })
                        }
                    </div>
                </div>
            </>

        }

    </>
} 