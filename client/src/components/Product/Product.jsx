import { React, useEffect, useState } from 'react'
import './Product.css'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import API from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const Product = (props) => {

    const { currentUser } = useAuth();

    const [isHover, setIsHover] = useState(false);
    let title = props.title;
    if(props.title.length > 45){ 
        title = props.title.substr(0, 45) + '...';
    }

    const handleWishlist = (product, name, image, price) => {
        if (currentUser) {
            try {
                API.post(`/wishlist`, { product, name, image, price });
            } catch (error) {
                console.error('Error adding to wishlist:', error);
            }
        }
    }

  return (
    <div className='productThumb'>
        {
            props.tag!==null && props.tag!== undefined ? <span className={`badge ${props.tag}`}>{props.tag}</span> : ''
        }
        <div className="imgWrapper">
            <Link to={`/product/${props.id}`}><img /*src={isHover ? props.imgURL : props.defaultURL}*/ src={`assets/products/${props.imgURL}.jpg`} alt="" className='w-100' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}/><img src={props.imgURL} alt="" className='w-100' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}/></Link>
            <div className="overlay" onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <ul className="list list-inline mb-0 trasition">
                    <Tooltip className="tooptip" title="Add To Wishlist" placement="top"><li className="list-inline-item" onClick={() => handleWishlist(currentUser?._id, props.id, props.name, props.imgURL, props.price)}><FavoriteBorderIcon/></li></Tooltip>
                    <Tooltip className="tooptip" title="Compare" placement="top"><li className="list-inline-item"><Link to={`/product/${props.id}`}><ShuffleIcon/></Link></li></Tooltip>
                    <Tooltip className="tooptip" title="Quick View" placement="top"><li className="list-inline-item"><Link to={`/product/${props.id}`}><VisibilityOutlinedIcon/></Link></li></Tooltip>
                </ul>
            </div>
        </div>
        <div className="info">
            <span className="d-block category">{props.category}</span>
            <h4 className="title"><Link to={`/product/${props.id}`}>{title}</Link></h4>
            <Rating name="half-rating-read" className='rating' defaultValue={2.5} precision={0.5} readOnly />
            <span className="brand d-block">by <a href="/#" className='text-g fw-semibold'>{props.brand}</a></span>
        </div>
        <div className="d-flex align-item-center">
            <div className="d-flex align-item-center gap-2 fw-bold">
                <span className="price">₹{props.price}</span>
                <span className="oldPrice">₹{props.oldPrice}</span>
            </div>
            <Button className="addCartBtn bg-g text-white ms-auto"><ShoppingCartCheckoutIcon/>Add</Button>
        </div>
    </div>
  )
}

export default Product;