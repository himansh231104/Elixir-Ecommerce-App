import React from 'react';
import './Navbar.css';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="nav d-flex align-items-center">
      <div className="container-fluid">
        <div className="row d-flex align-items-center position-relative">
          <div className="col-sm-auto part1">
            <Button className="bg-g text-white catTab">
              <GridViewOutlinedIcon />
              &nbsp;Browse All Categories
              <KeyboardArrowDownIcon />
            </Button>
          </div>
          <div className="col-sm-auto part2 position-static">
            <nav>
              <ul className="list list-inline mb-0">
                <li className="list-inline-item">
                  <Button>
                    <Link><LocalFireDepartmentOutlinedIcon/>&nbsp;Deals</Link>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>Home</Link>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>About</Link>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>
                      Shop
                      <ArrowDropDownIcon />
                    </Link>
                  </Button>
                  <div className="dropdown_menu shopMenu">
                    <ul>
                      <li>
                        <Button>
                          <Link to="/about">About Us</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/contact">Contact</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/profile">My Account</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/product">Product Detail</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/cart">Cart</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/order">Order</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/login">Login</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/signup">Register</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/forgot-password">Forgot Password</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/reset-password">Reset Password</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/purchase-guide">Purchase Guide</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/privacy-policy">Privacy Policy</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/terms-of-services">Terms Of Services</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/page-404">404 Page</Link>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>Vendors</Link>
                  </Button>
                </li>
                <li className="list-inline-item position-static">
                  <Button>
                    <Link>
                      Mega Menu
                      <ArrowDropDownIcon />
                    </Link>
                  </Button>
                  <div className="dropdown_menu megaMenu w-100">
                    <div className="row">
                      <div className="col text-g">
                        <h4>Fruits &amp; Vegitables</h4>
                        <ul>
                          <li>
                            <Link to="/shop">Fresh Vegitables</Link>
                          </li>
                          <li>
                            <Link to="/shop">Dry Fruits</Link>
                          </li>
                          <li>
                            <Link to="/shop">Herbs & Seasonings</Link>
                          </li>
                          <li>
                            <Link to="/shop">Cuts & Sprouts</Link>
                          </li>
                          <li>
                            <Link to="/shop">Exotic Fruits & Veggies</Link>
                          </li>
                          <li>
                            <Link to="/shop">Packaged Produce</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col text-g">
                        <h4>Breakfast &amp; Dairy</h4>
                        <ul>
                          <li>
                            <Link to="/shop">Milk & Flavoured Milk</Link>
                          </li>
                          <li>
                            <Link to="/shop">Butter & Margarine</Link>
                          </li>
                          <li>
                            <Link to="/shop">Eggs Substitutes</Link>
                          </li>
                          <li>
                            <Link to="/shop">Marmalades</Link>
                          </li>
                          <li>
                            <Link to="/shop">Sour Cream</Link>
                          </li>
                          <li>
                            <Link to="/shop">Cheese</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col text-g">
                        <h4>Meat &amp; Seafood</h4>
                        <ul>
                          <li>
                            <Link>Breakfast Sausage</Link>
                          </li>
                          <li>
                            <Link>Dinner Sausage</Link>
                          </li>
                          <li>
                            <Link>Chicken</Link>
                          </li>
                          <li>
                            <Link>Sliced Deli Meat</Link>
                          </li>
                          <li>
                            <Link>Wild Caught Fillets</Link>
                          </li>
                          <li>
                            <Link>Crab & Shellfish</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col">
                        <img
                          src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-menu.png"
                          alt=""
                          className="w-100"
                        />
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>Blog</Link>
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>
                      Pages
                      <ArrowDropDownIcon />
                    </Link>
                  </Button>
                  <div className="dropdown_menu pageMenu">
                    <ul>
                      <li>
                        <Button>
                          <Link to="/about">About Us</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/contact">Contact</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/profile">My Account</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/product">Product Details</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/cart">Cart</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/order">Order</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/login">Login</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/signup">Register</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/forgot-password">Forgot Password</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/reset-password">Reset Password</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/purchase-guide">Purchase Guide</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/privacy-policy">Privacy Policy</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/terms-of-services">Terms Of Services</Link>
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <Link to="/404">404 Page</Link>
                        </Button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Link>Contact</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-sm-auto part3 d-flex align-items-center ms-auto">
            <div className="contact d-flex align-items-center">
              <SupportAgentIcon className="" />
              <div className="info ml-3">
                <h3 className="text-g mb-0">1900 - 800</h3>
                <p className="mb-0">24/7 Support Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
