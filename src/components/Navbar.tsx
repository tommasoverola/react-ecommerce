import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setCartState } from "../redux/features/cartSlice";
import { modalOpen, updateModal } from "../redux/features/authSlice";
import { Link } from "react-router-dom";
import UserIcon from "../assets/icons/UserIcon";
import CartIcon from "../assets/icons/CartIcon";
import LoginModal from "./LoginModal";
import Cart from "./Cart";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );
  const isLoggedIn = useAuth().user
  
  const isLoginModalOpen = useSelector(modalOpen)
  const isCartOpen = useAppSelector((state) => state.cartReducer.cartOpen);

  const showCart = () => {
    if (isLoginModalOpen)
      dispatch(updateModal(false))

    dispatch(setCartState(!isCartOpen))
  };
  const handleOpenLoginModal = () => {
    if (isCartOpen)
      dispatch(setCartState(false))

    dispatch(updateModal(!isLoginModalOpen))
  }

  const AvatarIcon = () => {
    return (
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <span
            className="cursor-pointer"
            onClick={handleOpenLoginModal}
          >
            <img
              src="https://robohash.org/Terry.png?set=set4"
              alt="avatar"
              className="w-6"
            />
          </span>
        ) : (
          <>
            <span
              className="cursor-pointer"
              onClick={handleOpenLoginModal}
              data-test="login-btn"
            >
              <UserIcon />
            </span>
          </>
        )}
      </div>)
  }


  const RoutesList = () => {
    return (
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-base font-semibol py-3 hover:text-main"
          data-test="home"
        >
          Home
        </Link>
        <Link
          to="/"
          className="text-base font-semibol py-3 hover:text-main"
          data-test="shop"
        >
          Shop
        </Link>
        <Link
          to="/"
          className="text-base font-semibol py-3 hover:text-main"
          data-test="about"
        >
          About
        </Link>
        <Link
          to="/"
          className="text-base font-semibol py-3 hover:text-main"
          data-test="contact"
        >
          Contact
        </Link>
      </div>

    )
  }

  const CartComponent = () => {
    return (
      <div
        className="relative hover:cursor-pointer"
        onClick={showCart}
        data-test="cart-btn"
      >
        <CartIcon />
        <div
          className="absolute top-[-15px] right-[-10px] bg-main w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
          data-test="cart-item-count"
        >
          {cartCount}
        </div>
      </div>
    )
  }

  return (
    <div className="py-3 bg-white top-0 sticky z-10 gap-3 shadow-lg ">
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold font-poppins"
            data-test="main-logo"
          >
            LumiHaus.
          </Link>
          <RoutesList />
          <div className="flex items-center gap-2">
            <AvatarIcon />
            <CartComponent />
          </div>
        </div>
      </div>
      <LoginModal />
      <Cart />
    </div>
  );
};

export default Navbar;