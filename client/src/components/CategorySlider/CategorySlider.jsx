import React from 'react';
import './CategorySlider.css';
import Slider from 'react-slick';

const CategorySlider = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        fade: false,
        autoplay: true,
        autoplaySpeed: 3000, 
        pauseOnHover: true, 
      };    

  return (
    <>
      <div className="categorySliderSection">
        <div className="container-fluid">
          <h2 className="heading">Featured Categories</h2>
          <Slider {...settings} className="categorySliderMenu">
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-1.png" alt="" />
                    <h5>Cabbage</h5>
                    <p>22 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-2.png" alt="" />
                    <h5>Strawberry</h5>
                    <p>32 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-3.png" alt="" />
                    <h5>Masoor Dal</h5>
                    <p>36 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png" alt="" />
                    <h5>Black Plum</h5>
                    <p>123 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-5.png" alt="" />
                    <h5>Custard Apple</h5>
                    <p>26 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-6.png" alt="" />
                    <h5>Grapes</h5>
                    <p>136 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-7.png" alt="" />
                    <h5>Orange</h5>
                    <p>14 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-8.png" alt="" />
                    <h5>Snake Plant</h5>
                    <p>12 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-9.png" alt="" />
                    <h5>Red Apples</h5>
                    <p>56 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-10.png" alt="" />
                    <h5>Dragon Fruit</h5>
                    <p>72 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-11.png" alt="" />
                    <h5>Peach</h5>
                    <p>36 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-12.png" alt="" />
                    <h5>Organic Kiwi</h5>
                    <p>28 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-13.png" alt="" />
                    <h5>Hamburger</h5>
                    <p>56 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-14.png" alt="" />
                    <h5>Snack</h5>
                    <p>89 items</p>
                </div>
            </div>
            <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-15.png" alt="" />
                    <h5>Headphone</h5>
                    <p>87 items</p>
                </div>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}

export default CategorySlider;