import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../pages/shop/CartModal';
import avatarImg from '../assets/avatar.png';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.cart.products);
  const selectedItems = useSelector((state) => state.cart.selectedItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const tax = useSelector((state) => state.cart.tax);
  const grandTotal = useSelector((state) => state.cart.grandTotal);

  const user = useSelector((state) => state.auth.user); // ✅ Correct way to get user

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(user?.role); // for debugging
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const adminDropDownmenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  const userDropDownmenus = [
    { label: "Dashboard", path: "/dashboard/user" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus = user?.role === "admin" ? adminDropDownmenus : userDropDownmenus;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Hamburger (mobile) */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden mr-2 text-2xl"
          aria-label="Toggle menu"
        >
          <i className="ri-menu-line"></i>
        </button>

        {/* Navigation Links */}
        <ul className="nav__links hidden md:flex gap-6">
          <li className="link"><Link to="/"><i className="ri-home-4-line mr-1"></i>Home</Link></li>
          <li className="link"><Link to="/shop"><i className="ri-store-line mr-1"></i>Shop</Link></li>
          <li className="link"><Link to="/about"><i className="ri-information-line mr-1"></i>About</Link></li>
          <li className="link"><Link to="/cart"><i className="ri-shopping-cart-line mr-1"></i>Your Cart</Link></li>
          <li className="link"><Link to="/contact"><i className="ri-mail-line mr-1"></i>Contact</Link></li>
        </ul>

        {/* Logo */}
        <div className="nav__logo text-xl font-bold">
          <Link to="/">Basha<span className="text-primary">.</span></Link>
        </div>

        {/* Mobile menu (renders when toggled) */}
        {isMobileOpen && (
          <div className="absolute top-full left-0 right-0 bg-white p-4 md:hidden z-40 shadow-md">
            <ul className="flex flex-col gap-4">
              <li><Link onClick={() => setIsMobileOpen(false)} to="/"><i className="ri-home-4-line mr-2"></i>Home</Link></li>
              <li><Link onClick={() => setIsMobileOpen(false)} to="/shop"><i className="ri-store-line mr-2"></i>Shop</Link></li>
              <li><Link onClick={() => setIsMobileOpen(false)} to="/about"><i className="ri-information-line mr-2"></i>About</Link></li>
              <li><Link onClick={() => setIsMobileOpen(false)} to="/cart"><i className="ri-shopping-cart-line mr-2"></i>Your Cart</Link></li>
              <li><Link onClick={() => setIsMobileOpen(false)} to="/contact"><i className="ri-mail-line mr-2"></i>Contact</Link></li>
            </ul>
          </div>
        )}

        {/* Icons */}
        <div className="nav__icons flex gap-4 items-center relative">
          <span>
            <Link to="/search" aria-label="Search">
              <i className="ri-search-line text-xl"></i>
            </Link>
          </span>

          <span className="relative">
            <button
              onClick={handleCartToggle}
              className="hover:text-primary text-xl"
              aria-label="Toggle Cart"
            >
              <i className="ri-shopping-bag-line"></i>
              <sup className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white">
                {selectedItems}
              </sup>
            </button>
          </span>

          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropdownToggle}
                  src={user.profileImage || avatarImg}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow-sm hover:scale-105 transition-transform"
                />

                {isDropdownOpen && (
                  <div className="absolute right-0 bg-white shadow-lg rounded-lg p-2 w-48 border border-gray-200 z-50 transform transition-all duration-200 origin-top-right">
                    <ul className="font-medium space-y-2 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            className="block px-3 py-2 rounded hover:bg-gray-100"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button onClick={handleLogout} disabled={logoutLoading} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                          {logoutLoading ? (
                            <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                          ) : (
                            <i className="ri-logout-box-r-line"></i>
                          )}
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Login" className="text-xl hover:text-primary transition-colors">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
          selectedItems={selectedItems}
          totalPrice={totalPrice}
          tax={tax}
          grandTotal={grandTotal}
        />
      )}
    </header>
  );
};

export default Navbar;



