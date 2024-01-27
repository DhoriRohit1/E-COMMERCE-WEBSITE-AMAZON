import { useState } from "react";
import apiHelper from "../Commen/ApiHelper";
import { useEffect } from "react";
import Message from "../Componets/Messagebox";
import Loader from "../Componets/Loader";

export default function CartScreen({ cartItems, setcartItems }) {
    const [Cart, setCart] = useState([])
    const [loading, setloading] = useState(false)
    const [Error, setError] = useState("")
    const [SubTotalDetails, setSubTotalDetails] = useState({
        totalItems: 0,
        totalPrice: 0,
        totalProducts: 0
    })

    async function GetCart() {
        try {
            setloading(true)
            let proids = cartItems.map((x) => x.proid)
            const result = await apiHelper.fetchCart(proids)

            let filterCart = result?.data?.product?.filter((x) => x.countInStock > 0)
            let i = 0
            while (i < filterCart.length) {
                let j = 0
                while (j < cartItems.length) {
                    if (cartItems[j].proid === filterCart[i]._id) {
                        filterCart[i].qty = cartItems[j].qty
                    }
                    j++
                }
                i++
            }

            setCart(filterCart)
            setTimeout(() => {
                setloading(false);
            }, 580);
        } catch (error) {
            console.log(error);
            setloading(false)
            if (error && error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
                return
            }
        }
    }

    useEffect(() => {
        GetCart()
        // eslint-disable-next-line
    }, [cartItems])



    useEffect(() => {
        let i = 0
        let totalProducts = 0
        let totalItems = 0
        let totalPrice = 0
        while (i < Cart.length) {
            totalProducts++
            totalItems += Cart[i].qty

            let price = Cart[i].price * Cart[i].qty
            totalPrice += price
            i++
        }
        setSubTotalDetails({ totalItems, totalPrice, totalProducts })
    }, [Cart])


    return <>
        {
            Error ? <Message>{Error}</Message> : (
                <>
                    <Loader loading={loading} />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                {" "}
                                {Cart.length <= 0 ? (
                                    <div className="container">
                                        <img
                                            className="img-fluid"
                                            src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
                                            alt="##"
                                        ></img>
                                    </div>
                                ) : (

                                    Cart &&
                                    Cart.map((product, key) => {
                                        console.log(product);
                                        return (
                                            <div className="container py-3 px-4">
                                                <div className="row">
                                                    <div className="col-12 col-md mb-2" key={key}>
                                                        <div className="d-flex justify-content-between">
                                                            <h5 className="fw-bold">Shopping Card</h5>
                                                            <span className="text-secondary">Price</span>
                                                        </div>
                                                        <hr className="my-2 mb-4 d-md-block" />
                                                        <div className="row shadow py-3 mb-4">
                                                            <div className="col-3 col-md-2">
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.title}
                                                                    width={"100%"}
                                                                    style={{ maxWidth: "150px" }}
                                                                />
                                                            </div>
                                                            <div className="col-9 col-md-10 d-flex justify-content-between">
                                                                <div className="w-100">

                                                                    <h6 className="fw-bold">{product.title}</h6>
                                                                    <p className="mb-1">{product.brand}</p>
                                                                    <p className="mb-1">{product.category}</p>

                                                                    <div className="d-flex gap-2 align-items-center">
                                                                        <span>Quantity:</span>
                                                                        <select
                                                                            className="bg-gradient bg-light rounded"
                                                                            style={{ minWidth: "70px" }}
                                                                            disabled={product.countInstock <= 0}
                                                                            value={product.qty}
                                                                            onChange={(e) => {
                                                                                let index = cartItems.findIndex((e) => e.proid === product._id)
                                                                                cartItems[index].qty = Number(e.target.value)
                                                                                localStorage.setItem("cartItems", JSON.stringify(cartItems))
                                                                                Cart[key].qty = Number(e.target.value)
                                                                                setCart((Cart) => [...Cart])
                                                                            }}
                                                                        >

                                                                            {

                                                                                [...new Array(product.countInStock).keys()].map((x) => {
                                                                                    return <option value={x + 1} key={x} >{x + 1}</option>
                                                                                })
                                                                            }

                                                                        </select>
                                                                    </div>


                                                                </div>

                                                                <div>
                                                                    <span
                                                                        className="fw-bold d-block text-end"
                                                                        style={{ color: "#b12704" }}
                                                                    >
                                                                        ${product.price}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => {
                                                                            let filter = cartItems.filter((item) => item.proid !== product._id)
                                                                            localStorage.setItem("cartItems", JSON.stringify(filter))
                                                                            setcartItems(filter)
                                                                        }}
                                                                        className="btn mt-2  btn-warning bg-gradient border-secondary"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            <div className="col-md-4 mt-3">
                                <div className="col-12 pt-3">
                                    <div className="card-header border-secondary border border-bottom-0 pt-3 pb-2 ps-2">
                                        <h5 className="fw-bold">Summary</h5>
                                    </div>
                                    <div className="card-body border-secondary border">
                                        <div className="d-flex justify-content-between pt-3 ps-2 pe-2">
                                            <h6>Total Products:</h6>
                                            <span>{SubTotalDetails.totalProducts}</span>
                                        </div>
                                        <div className="d-flex justify-content-between pt-3 ps-2 pe-2">
                                            <h6>Total Items:</h6>
                                            <span>{SubTotalDetails.totalItems}</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between pt-3 ps-2 pe-2">
                                            <h6>Total Amount:</h6>
                                            <span>${SubTotalDetails.totalPrice}</span>
                                        </div>
                                        <div className="d-flex justify-content-between pt-3 ps-2 pe-2">
                                            <h6 className="fw-bold">Subtotal:</h6>
                                            <span className="fw-bold" style={{ color: "#b12704" }}>
                                                ${SubTotalDetails.totalPrice}
                                            </span>
                                        </div>
                                        <center className="pt-3 ps-2 pe-2 pb-2">
                                            <button
                                                disabled={Cart.length <= 0}
                                                // onClick={CheckoutHandler}
                                                className="w-100 btn btn-warning border-secondary bg-gradient pt-3 ps-2 pe-2"
                                            >
                                                Proccess to Checkouts
                                            </button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

    </>
} 