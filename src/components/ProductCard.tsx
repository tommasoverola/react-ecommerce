import { FC } from "react";
import { Product } from "../models/Product";
import { addToCart } from "../redux/features/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import toast from "react-hot-toast";
import ShopIcon from "../assets/icons/ShopIcon";

const ProductCard: FC<Product> = ({
  id,
  price,
  thumbnail,
  title,
  description
}) => {
  const dispatch = useAppDispatch();

  const addCart = () => {
    dispatch(
      addToCart({
        id,
        price,
        title,
        thumbnail,
        description
      })
    );
    toast.success("item added to cart successfully", {
      duration: 3000,
    });

  };

  return (
    <div className="border border-gray-200 font-lato" data-test="product-card">
      <div className="text-center border-b border-gray-200">
        <img
          src={thumbnail}
          alt={title}
          className="inline-block h-60 transition-transform duration-200 hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-row px-4 pt-6">
        <div className="flex-1">
          <p className="text-base font-poppins font-semibold line-clamp-1	mb-2" >
            {title}
          </p>
          <p className="text-base font-poppins font-medium"  >
            {price}
          </p>
        </div>
        <button
          type="button"
          onClick={addCart}
          data-test="add-cart-btn"
        >
          <ShopIcon />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
