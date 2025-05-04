import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../../assets/images/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SelectDrop from '../SelectDrop/SelectDrop';
import axios from 'axios';
import iconCart from '../../assets/images/icon-cart.svg';
import iconCompare from '../../assets/images/icon-compare.svg';
import iconHeart from '../../assets/images/icon-heart.svg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { ClickAwayListener } from '@mui/material';
import { Navbar } from './Navbar/Navbar';

const Header = () => {

  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const [categories] = useState([
    'Milks & Dairies',
    'Wines & Drinks',
    'Clothing & Beauty',
    'Fresh Seafood',
    'Pet Foods & Toys',
    'Fast Food',
    'Baking Material',
    'Vegetables',
    'Fresh Fruit',
    'Bread & Juice'
  ]);

  const [countryList, setCountryList] = useState([]);

  useEffect(()=>{
    getCountry('https://countriesnow.space/api/v0.1/countries/');
  },[]);

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      if (res !== null) {
        const countries = res.data.data.map((item) => item.country);
        setCountryList(countries);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-2 logo">
              <img src={logo} alt="" />
            </div>

            <div className="col-sm-4">
              {/* Header Search Start Here... */}
              <div className="headerSearch d-flex align-items-center">
                <SelectDrop
                  data={categories}
                  placeholder="All Categories"
                  icon={false}
                />

                <div className="search d-flex align-items-center">
                  <input type="text" placeholder="Search for items..." />
                  <SearchIcon className="searchIcon cursor" />
                </div>
              </div>
              {/* Header Search Ends Here... */}
            </div>

            <div className="col-sm-6 d-flex align-items-center">
              <div className="ms-auto d-flex align-items-center">
                <div className="countryWrapper">
                  <SelectDrop
                    data={countryList}
                    placeholder="Your Location"
                    icon={<LocationOnOutlinedIcon />}
                  />
                </div>
                <ClickAwayListener onClickAway={() => setIsOpenDropDown(false)}>
                  <ul className="list list-inline mb-0 headerTabs">
                    <li className="list-inline-item">
                      <span>
                        <img src={iconCompare} alt="" />
                        <span className="badge bg-g rounded-circle">
                          3
                        </span>
                        Compare
                      </span>
                    </li>
                    <li className="list-inline-item">
                      <span>
                        <img src={iconHeart} alt="" />
                        <span className="badge bg-g rounded-circle">
                          6
                        </span>
                        Wishlist
                      </span>
                    </li>
                    <li className="list-inline-item">
                      <span>
                        <img src={iconCart} alt="" />
                        <span className="badge bg-g rounded-circle">2</span>
                        Cart
                      </span>
                    </li>
                    <li
                      className="list-inline-item"
                      onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                    >
                      <span>
                        <AccountCircleOutlinedIcon className="userIcon" />
                        Account
                      </span>

                      {isOpenDropDown !== false && (
                        <ul className="dropDownMenu">
                          <li>
                            <Button>
                              <PersonOutlineOutlinedIcon />
                              My Account
                            </Button>
                          </li>
                          <li>
                            <Button>
                              <FmdGoodOutlinedIcon />
                              Order Tracking
                            </Button>
                          </li>
                          <li>
                            <Button>
                              <LocalOfferOutlinedIcon />
                              My Voucher
                            </Button>
                          </li>
                          <li>
                            <Button>
                              <FavoriteBorderOutlinedIcon />
                              My Wishlist
                            </Button>
                          </li>
                          <li>
                            <Button>
                              <TuneOutlinedIcon />
                              Setting
                            </Button>
                          </li>
                          <li>
                            <Button>
                              <LogoutOutlinedIcon />
                              Sign Out
                            </Button>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </ClickAwayListener>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navbar />
    </>
  );
}

export default Header;