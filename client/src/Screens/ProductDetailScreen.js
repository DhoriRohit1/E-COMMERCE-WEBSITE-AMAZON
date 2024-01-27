import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiHelper from "../Commen/ApiHelper";
import Rating from "../Componets/Rating";
import "../Componets/ProductDetailScreen.css"
import Loader from "../Componets/Loader";
import Message from "../Componets/Messagebox";

export default function ProductDetailScreen({ cartItems, setcartItems }) {
    const { id } = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState({});
    const [loading, setloading] = useState(false);
    const [Error, setError] = useState("");
    const [qty, setqty] = useState(1)
    const stocks = [...new Array(product.countInStock || 0).keys()]



    // const AddToCart = async () => {
    //     try {
    //       // console.log(cartItems);
    //       const cart = {
    //         product: id,
    //         qty: qty,
    //       };
    //       const findIndex = cartItems.findIndex((x) => x.product === id);

    //       if (findIndex > -1) {
    //         cartItems[findIndex].qty = cart.qty;
    //       } else {
    //         console.log(cart);
    //         cartItems.push(cart);
    //       }

    //       setcartItems(cartItems);
    //       localStorage.setItem("cartItems", JSON.stringify(cartItems));

    //       navigate("/Addtocart");
    //     } catch (error) {
    //       console.log(error);

    //       if (
    //         error.response &&
    //         error.response.data &&
    //         error.response.data.message
    //       ) {
    //         console.log(error.message);
    //       }
    //     }
    //   };



    const GetProduct = async () => {
        try {
            setloading(true);
            const result = await apiHelper.fetchProductById(id);
            setProduct(result.data.product);
            setTimeout(() => {
                setloading(false);
            }, 980);
        } catch (error) {
            if (error.response && error.response.data && error.response.message) {
                setError(error.response.data.message);
                return;
            }
            setError(error.message);
            setloading(false);
        }
    }

    useEffect(() => {
        GetProduct();
        // eslint-disable-next-line
    }, []);

    // console.log(stocks);




    // Add to Cart Handler===================================================

    const cartHandler = () => {
        const isExistIndex = cartItems.findIndex((x) => x.proid === id)
        console.log(isExistIndex);

        const Cart = {
            proid: id,
            qty: qty
        }

        if (isExistIndex > -1) {
            cartItems[isExistIndex].qty = qty
            setcartItems((state) => [...state])
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        } else {
            cartItems.push(Cart)
            setcartItems(cartItems)
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        }
        navigate("/cart")
    }

    return (
        Error ? <Message> {Error}</Message> : <>
            <Loader loading={loading} />
            <div className="custom-card-wrapper productScreen">
                <div className="custom-card">
                    {/* card left */}
                    <div className="custom-product-imgs">
                        <div className="custom-img-display">
                            <div className="custom-img-showcase">
                                <img src={product.image} alt="ima" />
                            </div>
                        </div>
                    </div>
                    {/* card right */}
                    <div className="custom-product-content">
                        <h3 className="custom-product-title">{product.title}</h3>
                        <div className="custom-d-flex justify-content-between conpniy_name">
                            <Link to="/" className="custom-product-link">
                                {" "}
                                {product.brand}
                            </Link>

                        </div>

                        <div className="custom-product-rating">
                            <span>
                                {" "}
                                <Rating
                                    rating={product.rating}
                                    numReviews={product.numReviews}
                                />
                            </span>
                        </div>
                        <div className="custom-product-price">
                            <p className="custom-last-price">
                                Old Price: <span>Rs.{product.price + 1000}</span>
                            </p>
                            <p className="custom-new-price">
                                New Price: <span>Rs.{product.price} (Lees -1000)</span>
                            </p>
                        </div>
                        <div className="custom-product-detail">
                            <h2>about this item: </h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                                eveniet veniam tempora fuga tenetur placeat sapiente architecto
                                illum soluta consequuntur, aspernatur quidem at sequi ipsa!
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.
                            </p>
                            <ul>
                                <li>
                                    {" "}
                                    Color:
                                    <ul className="custom-variant">
                                        <li className="custom-colors_iteam1"></li>
                                        <li className="custom-colors_iteam2"></li>
                                        <li className="custom-colors_iteam3"></li>
                                        <li className="custom-colors_iteam4"></li>
                                    </ul>
                                </li>
                                <li>
                                    {" "}
                                    Size :
                                    <ul className="custom-variant">
                                        <li>S</li>
                                        <li>L</li>
                                        <li>XL</li>
                                        <li>2XL</li>
                                        <li>3XL</li>
                                    </ul>
                                </li>

                                <li>
                                    {" "}
                                    Category:<span> {product.category}</span>
                                </li>
                                <li>
                                    {" "}
                                    Shipping Area:<span> All over the world</span>
                                </li>
                                <li>
                                    Shipping Fee:<span> Free</span>
                                </li>
                            </ul>
                        </div>
                        <div className="custom-purchase-info1 d-flex justify-content-between">
                            {/* <h5>In stocks:</h5> */}
                            <h5 className={product.countInStock > 0 ? "text-success" : "text-danger"}> {product.countInStock > 0 ? "In Stock" : "Out of Stock"}</h5>

                        </div>
                        <div className="custom-purchase-info">
                            <div className="d-flex justify-content-around">
                                <h5>Quantity:</h5>
                                <select onChange={(e) => setqty(Number(e.target.value))} disabled={product.countInStock <= 0} value={qty} className="custom-rounded">
                                    {
                                        stocks.map((x) => {
                                            return (<option key={x} value={x + 1}>{x + 1}</option>)
                                        })
                                    }
                                </select>

                            </div>
                            <button onClick={cartHandler} disabled={product.countInstock <= 0} type="button" className="custom-btn btn-secondary ms-5">
                            Add to Cart
                           </button>
                        </div>
                       
                        <div className="custom-social-links">
                            <p>Share At: </p>
                            <Link to="##">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link to="##">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link to="##">
                                <i className="fab fa-instagram"></i>
                            </Link>
                            <Link to="https://wa.me/1XXXXXXXXXX" target="_blank">
                                <i className="fab fa-whatsapp"></i>
                            </Link>
                            <Link to="##">
                                <i className="fab fa-pinterest-p"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
