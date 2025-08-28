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
import { X, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    company: "",
    street: "",
    apartment: "",
    city: "",
    email: "",
    phone: "",
    payment: "delivery", // default checked
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.street.trim()) newErrors.street = "Street address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s]+$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    if (!formData.payment) newErrors.payment = "Select a payment method.";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(true);
    setErrors({});
    setFormData({
      firstName: "",
      company: "",
      street: "",
      apartment: "",
      city: "",
      email: "",
      phone: "",
      payment: "delivery",
    });
    setTimeout(() => setSuccess(false), 60000); // hide after 1 minute
  };

  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory
        path="Account / My Account / Product / View Cart "
        current="Checkout"
      />

      <form
        onSubmit={handleSubmit}
        className="w-[95%] lg:w-[90%] mx-auto mt-10 pb-[80px] grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {/* Billing Details */}
        <div className="space-y-6">
          <h2 className="font-inter text-lg md:text-[36px] mb-[48px] text-black font-medium">
            Billing Details
          </h2>

          {/* First Name */}
          <div>
            <label className="font-poppins text-base text-black block mb-1">
              First Name<span className="text-[#DB4444]">*</span>
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="font-poppins text-base text-black block mb-1">
              Company Name
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded"
            />
          </div>

          {/* Street */}
          <div>
            <label className="font-poppins text-base text-black block mb-1">
              Street Address<span className="text-[#DB4444]">*</span>
            </label>
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          {/* Apartment */}
          <div>
            <label className="font-poppins text-base text-black block mb-1">
              Apartment, floor, etc. (optional)
            </label>
            <input
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded"
            />
          </div>

          {/* City */}
          <div>
            <label className="font-poppins text-base text-black block mb-1">
              Town / City<span className="text-[#DB4444]">*</span>
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-poppins text-base text-black block mb-1">
              Email Address<span className="text-[#DB4444]">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="font-poppins text-base text-black block mb-1">
              Phone<span className="text-[#DB4444]">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#F5F5F5] text-black border-none px-3 py-2 rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              className="accent-[#DB4444] w-[24px] h-[24px]"
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
          {/* Items */}
          <div className="max-h-[200px] overflow-y-auto space-y-3 pr-2 hide-scrollbar">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between items-center group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-12 w-12 object-cover rounded cursor-pointer"
                    onClick={() => navigate(`/product/${item.productId}`)}
                  />
                  <span className="font-poppins text-[12px] lg:text-base text-black">
                    {item.name}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(removeFromCart({ productId: item.productId }))
                    }
                    className="ml-2 text-gray-400 hover:text-[#DB4444] hidden group-hover:block"
                  >
                    <X size={16} />
                  </button>
                </div>
                <span className="font-poppins text-[12px] lg:text-base text-black">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-poppins text-base text-black">Subtotal</span>
            <span className="font-poppins text-base text-black">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-poppins text-base text-black">Shipping</span>
            <span className="font-poppins text-base text-black">Free</span>
          </div>

          {/* Total */}
          <div className="flex justify-between font-semibold text-lg">
            <span className="font-poppins text-base text-black">Total</span>
            <span className="font-poppins text-base text-black">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                className="accent-black w-[24px] h-[24px]"
                type="radio"
                name="payment"
                id="bank"
                value="bank"
                checked={formData.payment === "bank"}
                onChange={handleChange}
              />
              <label
                htmlFor="bank"
                className="flex-1 flex items-center justify-between font-poppins text-base text-black"
              >
                Bank
                <div className="flex gap-2 text-gray-600">
                  <img className="w-[42px] h-[28px]" src="/png/Bkash.png" />
                  <img className="w-[42px] h-[28px]" src="/png/visa.png" />
                  <img className="w-[42px] h-[28px]" src="/png/mastercard.png" />
                  <img className="w-[42px] h-[28px]" src="/png/nagad.png" />
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                className="accent-black w-[24px] h-[24px]"
                type="radio"
                name="payment"
                id="delivery"
                value="delivery"
                checked={formData.payment === "delivery"}
                onChange={handleChange}
              />
              <label
                htmlFor="delivery"
                className="flex-1 font-poppins text-base text-black"
              >
                Free Delivery
              </label>
            </div>
            {errors.payment && (
              <p className="text-red-500 text-sm mt-1">{errors.payment}</p>
            )}
          </div>

          {/* Coupon */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 max-[300px] h-[56px] border px-3 py-2 rounded"
            />
            <button
              type="button"
              className="py-4 font-poppins px-[24px] lg:px-[48px] bg-[#DB4444] text-[#FAFAFA] rounded"
            >
              Apply Coupon
            </button>
          </div>

          {/* Place Order */}
          <div className="mt-6 flex flex-col items-start gap-3">
            <button
              type="submit"
              className="w-fit py-4 font-poppins px-[24px] lg:px-[48px] bg-[#DB4444] text-[#FAFAFA] rounded font-medium"
            >
              Place Order
            </button>

            {/* Success */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 5 }}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  <CheckCircle size={18} />
                  <span>Order placed successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Checkout;
