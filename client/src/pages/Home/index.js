import React, { useEffect, useState } from 'react';
import './style.css';
import SliderBanner from '../../components/Slider/Slider';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import Banners from '../../components/Banners/Banners';
import Product from '../../components/Product/Product';
import daisyBanner from '../../assets/daisy.mp4';
import Slider from 'react-slick';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button } from '@mui/material';
import API from '../../utils/axiosConfig';

export const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data.products);
        console.log(res.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    autoplay: true,
    autoplaySpeed: 3000, 
    pauseOnHover: true, 
  };  


  return (
    <> 
      <SliderBanner/>
      <CategorySlider/>
      <Banners/>

      <section className='homeProducts'>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h2 className="hd mb-0 mt-0">Popular Products</h2>
            <ul className="list list-inline ms-auto filterTab mb-0">
              <li className='list-inline-item'>
                <a href="/#" className="cursor">All</a>
              </li>
              <li className='list-inline-item'>
                <a href="/#" className="cursor">Milks & Dairies</a>
              </li>
              <li className='list-inline-item'>
                <a href="/#" className="cursor">Coffes & Teas</a>
              </li>
              <li className='list-inline-item'>
                <a href="/#" className="cursor">Pet Foods</a>
              </li>
              <li className='list-inline-item'>
                <a href="/#" className="cursor">Meats</a>
              </li>
              <li className='list-inline-item'>
                <a href="/#" className="cursor">Vegetables</a>
              </li>
              <li className='list-inline-item'>
                <a href="/#" className="cursor">Fruits</a>
              </li>
            </ul>
          </div>

          <div className="productRow">
            {products.map((product) => (
              <div className="item" key={product._id}>
                <Product defaultURL="assets/products/default.jpg" imgURL={product.image} /*tag=""*/ category={product.category} name={product.name} title={product.description} brand={product.brand} price={product.price} oldPrice="32.80" id={product._id}/>
              </div>
            ))}
            {/* <div className="item">
              <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-2-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-2-2.jpg" tag="sale" category="Hodo Foods" title="All Natural Italian-Style Chicken Meatballs" brand="Stouffer" price="52.85" oldPrice="55.80"/> 
            </div> */}
          </div>
        </div>
      </section>

      <section className='homeProducts2 pt-0'>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h2 className="hd mb-0 mt-0">Daily Best Sales</h2>
            <ul className="list list-inline ms-auto filterTab mb-0">
              <li className='list-inline-item'>
                <a href="/#" className="cursor">Featured</a>
              </li>
              <li className='list-inline-item'>
                <a href="/#" className="cursor">Popular</a>
              </li>
              <li className='list-inline-item'>
                <a href="/#" className="cursor">New Added</a>
              </li>
            </ul>
          </div>
          <div className="row my-4">
            <div className="col-md-3 position-relative video-banner-container">
              <video autoPlay loop muted playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
                <source src={daisyBanner} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <span className='video-banner-text'><i>Bring nature to your home.</i></span>
              <Button>Shop now <ArrowRightAltIcon/></Button>
            </div>
            <div className="col-md-9">
              <Slider {...settings} className="productSlider">
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-2.jpg" tag="hot" category="Snack" title="Seeds of Change Organic Quinoa" brand="NestFood" price="28.85" oldPrice="32.80"/>
                </div>
                <div className="item">
                <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-2-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-2-2.jpg" tag="sale" category="Hodo Foods" title="All Natural Italian-Style Chicken Meatballs" brand="Stouffer" price="52.85" oldPrice="55.80"/> 
                </div>
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg" tag="new" category="Snack" title="Angie’s Boomchickapop Sweet & Salty Kettle Corn" brand="StarKist" price="48.85" oldPrice="52.80"/> 
                </div>
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-4-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-4-2.jpg" category="Vegitables" title="Foster Farms Takeout Crispy Classic Buffalo Wings" brand="NestFood" price="17.85" oldPrice="19.80"/> 
                </div>
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-5-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-5-2.jpg" tag="best" category="Pet Foods" title="Blue Diamond Almonds Lightly Salted Vegetables" brand="NestFood" price="23.85" oldPrice="25.80"/> 
                </div>
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-6-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-6-2.jpg" category="Hodo Foods" title="Chobani Complete Vanilla Greek Yogurt" brand="NestFood" price="54.85" oldPrice="55.80"/>
                </div>
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-7-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-7-2.jpg" category="Meats" title="Canada Dry Ginger Ale – 2 L Bottle - 200ml - 400g" brand="NestFood" price="32.85" oldPrice="33.80"/> 
                </div>
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-8-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-8-2.jpg" tag="sale" category="Snack" title="Encore Seafoods Stuffed Alaskan Salmon" brand="NestFood" price="35.85" oldPrice="37.80"/> 
                </div>
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-9-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-9-2.jpg" tag="hot" category="Coffes" title="Gorton’s Beer Battered Fish Fillets with soft paper" brand="Old El Paso" price="23.85" oldPrice="25.80"/> 
                </div>
                <div className="item">
                  <Product defaultURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-10-1.jpg" imgURL="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-10-2.jpg" category="Cream" title="Haagen-Dazs Caramel Cone Ice Cream Ketchup" brand="Tyson" price="22.85" oldPrice="24.80"/> 
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
