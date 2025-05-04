import React from 'react';
import Slider from 'react-slick';
import { Button } from '@mui/material';
import './style.css';
import Slide1 from '../../../assets/images/slider-1.png';
import Slide2 from '../../../assets/images/slider-2.png';

const HomeSlider = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000, 
    pauseOnHover: true, 
  };

  return (
    <section className="homeSlider">
      <div className="container-fluid position-relative">
        <Slider {...settings} className="home_slider_Main">
          <div className="item">
            <img src={Slide1} alt="" className="w-100" />
            <div className="info">
              <h2 className="mb-4">
                Don't miss amazing <br />
                grocery deals
              </h2>
              <p>Sign up for the daily newsletter</p>
            </div>
          </div>
          <div className="item">
            <img src={Slide2} alt="" className="w-100" />
            <div className="info">
              <h2 className="mb-4">
                Fresh Vegitables <br />
                Big discounts
              </h2>
              <p>Save upto 50% off on your first order</p>
            </div>
          </div>
        </Slider>

        <div className="newsletterBanner">
          <i class="fa-regular fa-paper-plane"></i>
          <input type="text" placeholder="Your email address" />
          <Button>Subscribe</Button>
        </div>
      </div>
    </section>
  );
}

export default HomeSlider;