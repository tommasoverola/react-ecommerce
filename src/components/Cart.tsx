import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { emptyCart, setCartState } from "../redux/features/cartSlice";
import { updateModal } from "../redux/features/authSlice";
import CartRow from "./CartRow";
import toast from "react-hot-toast";
import CloseIcon from "../assets/icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Cart = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cartReducer.cartOpen);
  const items = useAppSelector((state) => state.cartReducer.cartItems);
  const isLoggedIn = useAuth().user;
  const navigate = useNavigate();


  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      if (item.quantity)
        total += (item.price - (item.price) / 100) * item.quantity;
    });
    return total.toFixed(2);
  };


  const handleClose = () => dispatch(setCartState(false));
  const handleNavigationToPurchasePage = () => {
    if (isLoggedIn) {
      navigate("/purchase")

    }
    else {
      dispatch(setCartState(false));
      dispatch(updateModal(true));
      toast.success("Please log in", { duration: 3000 });
    }
  }
  const handleEmptyCart = () => {
    if (items?.length > 0) {
      dispatch(emptyCart());
      toast.success("your order has been confirmed", { duration: 3000 });
    }
    dispatch(setCartState(false));
  }

  if (isOpen) {
    return (
      <div className="absolute right-5 w-full flex items-center justify-end top-16 ">
        <div className="relative border shadow rounded-lg bg-white max-w-md w-full max-h-[60vh] overflow-scroll" >
          <div className="p-6 flex flex-row justify-between border-b border-variant2" >
            <span className="font-poppins text-base text-variant4 weigh font-semibold" >
              Shopping Cart
            </span>
            <div className="cursor-pointer" onClick={handleClose} >
              <CloseIcon />
            </div>
          </div>
          <div className="pt-8 px-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="mt-6 space-y-2">
                  {items?.length > 0 ? (
                    items.map((item) => <CartRow key={item.id} {...item} />)
                  ) : (
                    <div className="flex flex-col justify-center items-center p-4">
                      <p className="text-center text-xl my-2">Your cart is empty</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between pt-6 pb-2">
              <p className="font-poppins font-semibold text-xl ">Total</p>
              <p className="font-poppins font-semibold text-xl ">${calculateTotal()}</p>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col justify-center border-t border-variant2 pt-2 px-4" >


            <button
              type="button"
              data-test="checkout-btn"
              onClick={handleNavigationToPurchasePage}
              className="bg-main flex-1 rounded-full py-3 text-white uppercase pb-2"
            >
              Checkout
            </button>
            <button
              type="button"
              data-test="checkout-btn"
              onClick={handleEmptyCart}
              className="bg-white text-main flex-1 rounded-full py-2  uppercase border-2 border-main  my-4"
            >
              Empty cart
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
