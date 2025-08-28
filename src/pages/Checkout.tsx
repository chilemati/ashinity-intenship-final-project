import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "@/store/cartSlice";
import Footer from "@/components/home/Footer";
import Headline from "@/components/home/Headline";
import PageHistory from "@/components/home/PageHistory";
import Navber from "@/components/Navber";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const navigate = useNavigate();

  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory
        path="Account / My Account / Product / View Cart "
        current="Checkout"
      />

      <div className="w-[95%] lg:w-[90%] mx-auto mt-10 pb-[80px] grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Billing Details */}
        <div className="space-y-6">
          <h2 className="font-inter text-lg md:text-[36px] mb-[48px] text-black font-medium">
            Billing Details
          </h2>

          <div>
            <label className="font-poppins font-normal text-base text-black block mb-1">
              First Name<span className="text-[#DB4444] ">*</span>
            </label>
            <input className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded" />
          </div>

          <div>
            <label className="font-poppins font-normal text-base text-black block mb-1">
              Company Name
            </label>
            <input className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded" />
          </div>

          <div>
            <label className="font-poppins font-normal text-base text-black block mb-1">
              Street Address<span className="text-[#DB4444] ">*</span>
            </label>
            <input className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded" />
          </div>

          <div>
            <label className="font-poppins font-normal text-base text-black block mb-1">
              Apartment, floor, etc. (optional)
            </label>
            <input className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded" />
          </div>

          <div>
            <label className="font-poppins font-normal text-base text-black block mb-1">
              Town / City<span className="text-[#DB4444] ">*</span>
            </label>
            <input className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded" />
          </div>

          <div>
            <label className="font-poppins font-normal text-base text-black block mb-1">
              Email Address<span className="text-[#DB4444] ">*</span>
            </label>
            <input type="email" className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="font-poppins font-normal text-base text-black block mb-1">
              Phone<span className="text-[#DB4444] ">*</span>
            </label>
            <input type="tel" className="w-full border px-3 py-2 rounded" />
          </div>

          <div className="flex items-center gap-2">
            <input
              className="accent-[#DB4444] w-[24px] h-[24px] "
              defaultChecked
              type="checkbox"
              id="save"
            />
            <label htmlFor="save">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="pt-[48px] rounded p-6 space-y-6">
          {/* Cart Items */}
          <div className="max-h-[200px] overflow-y-auto space-y-3 pr-2 hide-scrollbar">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center group"
              >
                {/* Left: image + name */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-12 w-12 object-cover rounded cursor-pointer"
                    onClick={() => navigate(`/product/${item.productId}`)}
                  />
                  <span className="font-poppins font-normal text-[12px] lg:text-base text-black">
                    {item.name}
                  </span>

                  {/* X icon → hidden until hover */}
                  <button
                    onClick={() =>
                      dispatch(removeFromCart({ productId: item.productId }))
                    }
                    className="ml-2 text-gray-400 hover:text-[#DB4444] hidden group-hover:block"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Price */}
                <span className="font-poppins font-normal text-[12px] lg:text-base text-black">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-poppins font-normal text-base text-black">
              Subtotal
            </span>
            <span className="font-poppins font-normal text-base text-black">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-poppins font-normal text-base text-black">
              Shipping
            </span>
            <span className="font-poppins font-normal text-base text-black">
              Free
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold text-lg">
            <span className="font-poppins font-normal text-base text-black">
              Total
            </span>
            <span className="font-poppins font-normal text-base text-black">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                className="accent-black border-[1.5px] w-[24px] h-[24px] border-black "
                type="radio"
                name="payment"
                id="bank"
              />
              <label
                htmlFor="bank"
                className="flex-1 flex items-center justify-between font-poppins font-normal text-base text-black"
              >
                Bank
                <div className="flex gap-2 text-gray-600">
                  <img
                    className="w-[42px] h-[28px] object-contain "
                    src="/png/Bkash.png"
                    alt="bkash icon"
                    loading="lazy"
                  />
                  <img
                    className="w-[42px] h-[28px] object-contain "
                    src="/png/visa.png"
                    alt="bkash icon"
                    loading="lazy"
                  />
                  <img
                    className="w-[42px] h-[28px] object-contain "
                    src="/png/mastercard.png"
                    alt="bkash icon"
                    loading="lazy"
                  />
                  <img
                    className="w-[42px] h-[28px] object-contain "
                    src="/png/nagad.png"
                    alt="bkash icon"
                    loading="lazy"
                  />
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                className="accent-black border-[1.5px] w-[24px] h-[24px] border-black "
                type="radio"
                name="payment"
                id="delivery"
                defaultChecked
              />
              <label
                htmlFor="delivery"
                className="flex-1 font-poppins font-normal text-base text-black"
              >
                Free Delivery
              </label>
            </div>
          </div>

          {/* Coupon + Place Order */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 max-[300px] h-[56px] border px-3 py-2 rounded"
            />
            <button className="py-4 font-poppins font-medium text-base px-[24px] lg:px-[48px] bg-[#DB4444] text-[#FAFAFA] rounded">
              Apply Coupon
            </button>
          </div>

          <div className="mt-6">
            <button className="w-fit py-4 font-poppins  text-base px-[24px] lg:px-[48px]  bg-[#DB4444] text-[#FAFAFA] rounded font-medium">
              Place Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
