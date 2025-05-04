import React from 'react';
import './style.css';
import Slider from './Slider/index';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import Banners from '../../components/Banners/Banners';
import Product from '../../components/Product/Product';

export const Home = () => {
  return (
    <> 
      <Slider/>
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
          </div>
        </div>
      </section>
    </>
  )
}
