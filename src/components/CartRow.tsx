import { FC } from "react";
import { CartItem } from "../models/CartItem";
import { useAppDispatch } from "../redux/hooks";
import {
  addToCart,
  reduceFromCart,
  removeFromCart,
} from "../redux/features/cartSlice";
import MinusIcon from "../assets/icons/MinusIcon";
import PlusIcon from "../assets/icons/PlusIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";

const CartRow: FC<CartItem> = ({
  id,
  thumbnail,
  title,
  price,
  quantity,
  description
}) => {
  const dispatch = useAppDispatch();
  const handleReduceItem = () => dispatch(reduceFromCart(id))
  const handleAddItem = () => dispatch(addToCart({ id, title, price, quantity, thumbnail, description }))

  return (
    <div className="flex flex-1 items-center pb-8">
      <img src={thumbnail} alt="thumbnail" className="h-20 col-span-2" />
      {/* title and price */}
      <div className="flex flex-1 flex-col justify-start">
        <span className="tex-base font-poppins font-semibold pb-2">{title}</span>
        <span className="tex-base font-poppins font-normal pb-8" data-test="cart-item-price">
          {price}
        </span>

        {/* quantity and delete */}
        <div className="flex flex-row flex-1 items-center justify-between">
          <div className="flex flex-row flex-1 items-center " >

            <div className="bg-main rounded-full cursor-pointer hover:opacity-80"
              onClick={handleReduceItem}
              data-test="cart-reduce-btn" >
              <MinusIcon />
            </div>

            <span className="border align-middle justify-center px-6 mx-2" data-test="cart-item-quantity">
              {quantity}
            </span>

            <div className="bg-main rounded-full cursor-pointer hover:opacity-80"
              onClick={handleAddItem}
              data-test="cart-reduce-btn" >
              <PlusIcon />
            </div>

          </div>

          <div className="cursor-pointer"
            onClick={() => dispatch(removeFromCart(id))}
            data-test="cart-remove-btn">
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRow;
