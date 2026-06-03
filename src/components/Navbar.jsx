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
  const [logoutUser] = useLogoutUserMutation();

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
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center px-4">
        {/* Navigation Links */}
        <ul className="nav__links flex gap-6">
          <li className="link"><Link to="/">Home</Link></li>
          <li className="link"><Link to="/shop">Shop</Link></li>
          <li className="link"><Link to="/about">About</Link></li>
          <li className="link"><Link to="/cart">Your Cart</Link></li>
          <li className="link"><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Logo */}
        <div className="nav__logo text-xl font-bold">
          <Link to="/">Basha<span className="text-primary">.</span></Link>
        </div>

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
                  className="size-6 rounded-full cursor-pointer"
                />

                {isDropdownOpen && (
                  <div className="absolute right-0 bg-white shadow-lg rounded-lg p-4 w-48 border border-gray-200 z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button onClick={handleLogout} className="dropdown-items w-full text-left">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Login">
                <i className="ri-user-line text-xl"></i>
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



