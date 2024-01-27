import { Link } from "react-router-dom"
import Rating from "./Rating"

export default function ProductCard(props) {
 
  
  const { product } = props
  return (
   
      <div className="col-md-8 col-lg-6 col-xl-4 d-flex  mt-3">
         <Link className="d-flex justify-content-center link1" to={`/product/${product._id}`}>
        <div className="card" style={{ borderradius: "15px", width: "80%" }}>
          <div className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <img src={product.image} style={{ bordertopleftradius: "15px", bordertoprightradius: "15px" }} className="img-fluid" alt='...' />
            <a href="#!">
              <div className="mask"></div>
            </a>
          </div>
          <div className="card-body pb-0">
            <div className="d-flex justify-content-between">
              <div>
                <p><a href="#!" className="text-dark">{product.title}</a></p>
                <p className="small text-muted">{product.category}</p>
              </div>
              <div>
                <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">

                  <Rating rating={product.rating} />

                </div>
                <p className="small text-muted">{product.rating} / 5</p>
              </div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="card-body pb-0">
            <div className="d-flex justify-content-between">
              <p><a href="#!" className="text-dark">${product.price}</a></p>
              <p className="text-dark">Reviews : {product.numReviews}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="small text-muted">VISA Platinum</p>
              <p className="small text-muted">{product.brand}</p>
            </div>
          </div>
          <hr className="my-0" />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
              <a href="#!" className="text-dark fw-bold cancel">Cancel</a>
              <button type="button" className="btn btn-secondary">Buy now</button>
            </div>
          </div>
        </div>
        </Link>
      </div>

   

  )
}