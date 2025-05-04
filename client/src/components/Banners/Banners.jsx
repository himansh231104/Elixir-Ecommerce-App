import React from 'react';
import "./Banners.css";
import Banner1 from "../../assets/images/banner1.png";
import Banner2 from "../../assets/images/banner2.png";
import Banner3 from "../../assets/images/banner3.png";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button } from '@mui/material';

const Banners = () => {
  return (
    <div className='bannerSection'>
        <div className="container-fluid">
            <div className="row">
                <div className="col mb-4">
                    <div className="box">
                        <img src={Banner1} className='w-100 transition' alt=''/>
                        <div className="info">
                            <h4 className='title'>Everyday Fresh & Clean with Our Products</h4>
                            <Button>Shop now <ArrowRightAltIcon/></Button>
                        </div>

                    </div>
                </div>

                <div className="col">
                    <div className="box">
                        <img src={Banner2} className='w-100 transition' alt=''/>
                        <div className="info">
                            <h4 className='title'>Make your Breakfast Healthy and Easy</h4>
                            <Button>Shop now <ArrowRightAltIcon/></Button>
                        </div>
                        
                    </div>
                </div>

                <div className="col">
                    <div className="box">
                        <img src={Banner3} className='w-100 transition' alt=''/>
                        <div className="info">
                            <h4 className='title'>The best Organic Products Online</h4>
                            <Button>Shop now <ArrowRightAltIcon/></Button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banners;