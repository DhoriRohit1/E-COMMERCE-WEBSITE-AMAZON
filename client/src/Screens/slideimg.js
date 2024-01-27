
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import $ from 'jquery';
import 'bootstrap'; // Import Bootstrap JS

/* global bootstrap */

const Slideimg = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const multipleCardCarousel = document.querySelector("#carouselExampleControls");

        if (window.matchMedia("(min-width: 576px)").matches) {
            // Remove the unused variable 'carousel'
            new bootstrap.Carousel(multipleCardCarousel, {
                interval: false,
                wrap: false,
            });

            const carouselWidth = $(".carousel-inner")[0].scrollWidth;
            const cardWidth = $(".carousel-item").width();

            $("#carouselExampleControls .carousel-control-next").on("click", function () {
                if (scrollPosition < carouselWidth - cardWidth * 3) {
                    setScrollPosition((prev) => prev + cardWidth);
                }
            });

            $("#carouselExampleControls .carousel-control-prev").on("click", function () {
                if (scrollPosition > 1) {
                    setScrollPosition((prev) => prev - cardWidth);
                }
            });
        } else {
            $(multipleCardCarousel).addclassName("slide");
        }
    }, [scrollPosition]);

    return (
        <>
            <div className="testimonial-slider custom-testimonial-slider">
                <div id="carouselExampleControls" className="carousel carousel-dark" data-bs-ride="carousel">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 custom-col-md-4">
                                <div className="testimonial-title custom-testimonial-title">
                                    <i className="bi bi-quote display-2"></i>
                                    <h2 className="fw-bold display-6 custom-title">What our customers say</h2>
                                </div>
                                <button className="carousel-control-prev custom-carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon " aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next custom-carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className="col-md-8 custom-col-md-8">
                                <div className="carousel-inner custom-carousel-inner">
                                    <div className="carousel-item active custom-carousel-item">
                                        <div className="card custom-card">
                                            <div className="img-wrapper custom-img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-1-scaled.jpg" className="d-block w-100" alt="..." /> </div>
                                            <div className="card-body custom-card-body">
                                                <h5 className="card-title">Card title 1</h5>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <p className="card-text">"Some dummy text you don't need to read. Since you have decided to read, do like, share, comment and subscribe to Coding Yaar."</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item active custom-carousel-item">
                                        <div className="card custom-card">
                                            <div className="img-wrapper custom-img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-2-scaled.jpg" className="d-block w-100" alt="..." /> </div>
                                            <div className="card-body custom-card-body">
                                                <h5 className="card-title">Card title 1</h5>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <p className="card-text">"Some dummy text you don't need to read. Since you have decided to read, do like, share, comment and subscribe to Coding Yaar."</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item active custom-carousel-item">
                                        <div className="card custom-card">
                                            <div className="img-wrapper custom-img-wrapper"><img src="https://codingyaar.com/wp-content/uploads/headshot-3-scaled.jpg" className="d-block w-100" alt="..." /> </div>
                                            <div className="card-body custom-card-body">
                                                <h5 className="card-title">Card title 1</h5>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <i className="bi bi-star-fill text-warning pe-1"></i>
                                                <p className="card-text">"Some dummy text you don't need to read. Since you have decided to read, do like, share, comment and subscribe to Coding Yaar."</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Slideimg;
