import toast from "react-hot-toast";
import CartRow from "../components/CartRow";
import { useAppSelector } from "../redux/hooks";

const Purchase = () => {
    const items = useAppSelector((state) => state.cartReducer.cartItems);
    const calculateTotal = () => {
        let total = 0;
        items.forEach((item) => {
            if (item.quantity)
                total += (item.price - (item.price) / 100) * item.quantity;
        });
        return total.toFixed(2);
    };

    const handleOrder = () => {
        toast.success("handle payment", { duration: 3000 });
    }


    return (
        <div className=" w-full min-h-screen fixed left-0 top-16 z-20 overflow-y-auto">
            <div
                className=" pl-10 w-full min-h-full bg-white absolute right-0 p-6"
                data-test="cart-container"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-2xl font-poppins ">Checkout</h3>
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
                    <div className="min-w-[400px] border border-variant2 rounded-lg px-8 pb-8" >
                        <p className="font-semibold text-xl py-6">Summary</p>
                        <div className="flex flex-row justify-between">
                            <p className="font-poppins font-normal text-base text-variant2">Subtotal</p>
                            <p className="font-poppins font-normal text-base text-variant2">${calculateTotal()}€</p>
                        </div>
                        <div className="flex flex-row justify-between pt-6">
                            <p className="font-poppins font-normal text-base text-variant2">Shipping costs</p>
                            <p className="font-poppins font-normal text-base text-variant2">0,00€</p>
                        </div>
                        <div className="flex flex-row justify-between pt-6 border-b border-variant2">
                            <p className="font-poppins font-semibold text-xl ">Total</p>
                            <p className="font-poppins font-semibold text-xl ">${calculateTotal()}</p>
                        </div>
                        <div className="flex justify-center  pt-6" >
                            <button
                                type="button"
                                data-test="checkout-btn"
                                onClick={handleOrder}
                                className="bg-main flex-1 rounded-full py-3 text-white"
                            >
                                PURCHASE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Purchase