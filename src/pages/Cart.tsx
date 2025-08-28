import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import Footer from "@/components/home/Footer";
import Headline from "@/components/home/Headline";
import PageHistory from "@/components/home/PageHistory";
import Navber from "@/components/Navber";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Home" current="Cart" />

      <div className="w-[95%] lg:w-[90%] pb-[80px] mx-auto mt-10">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-white font-semibold p-4 rounded">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
        </div>

        {/* Cart items */}
        <div className="max-h-[400px] hide-scrollbar overflow-y-auto divide-y">
          {items.map((item) => (
            <div
              key={item.productId}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center p-4 relative group"
            >
              {/* Product */}
              <div className="flex items-center gap-4 relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-[39px] w-[50px] object-cover rounded"
                />
                {/* Hover delete button */}
                <button
                  onClick={() =>
                    dispatch(removeFromCart({ productId: item.productId }))
                  }
                  className="absolute top-0 left-0 bg-[#DB4444] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
                <span className="font-poppins font-normal text-[10px] md:text-base text-black ">
                  {item.name}
                </span>
              </div>

              {/* Price */}
              <div className="font-poppins font-normal text-[10px] md:text-base text-black">
                ${item.unitPrice.toFixed(2)}
              </div>

              {/* Quantity */}
              <div className="flex py-[6px]  px-3 items-center border-[1.5px] border-[#00000066] rounded w-fit">
                {/* Number */}
                <span className=" text-[10px] md:text-base font-medium min-w-[24px] text-center">
                  {String(item.quantity).padStart(2, "0")}
                </span>

                {/* Vertical buttons */}
                <div className="flex gap-[5px] flex-col border-l">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className=" hover:bg-gray-100"
                  >
                    <RxCaretUp size={12} />
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.productId,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className=" hover:bg-gray-100"
                  >
                    <RxCaretDown size={12} />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-[10px] md:text-base">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons under list */}
        <div className="flex justify-between mt-6">
          <button className="px-6 py-2 border rounded hover:bg-gray-100">
            Return to Shop
          </button>
          <button className="px-6 py-2 border rounded hover:bg-gray-100">
            Update Cart
          </button>
        </div>

        {/* Coupon + Cart Total */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] lg:gap-8 mt-[80px] ">
          {/* Coupon */}
          <div className="flex h-[56px] flex-wrap gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 border mx-w-[300px] rounded px-4 py-2"
            />
            <button className="px-6 py-2 bg-[#DB4444] text-white rounded">
              Apply Coupon
            </button>
          </div>

          {/* Cart Total */}
          <div className="border-[1px] border-black p-6 rounded space-y-4">
            <h2 className="text-lg font-bold mb-4">Cart Total</h2>

            <div className="flex border-b-[1px] border-black pb-6 justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex border-b-[1px] border-black pb-6 justify-between">
              <span>Shipping</span>
              <span>Free Shipping</span>
            </div>

            <div className="flex justify-between font-semibold  pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
              <Link to="/checkout">
            <button className="block mx-auto mt-4 px-6 py-2 bg-[#DB4444] text-white rounded">
              Proceed to Checkout
            </button>
              </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
