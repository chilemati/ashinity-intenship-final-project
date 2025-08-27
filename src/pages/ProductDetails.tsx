import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductById,
  selectProductById,
} from "@/store/productsSlice";
import { addToCart, toggleWishlist, selectIsWishlisted } from "@/store/cartSlice";

import Headline from "@/components/home/Headline";
import Navber from "@/components/Navber";
import Footer from "@/components/home/Footer";
import PageHistory from "@/components/home/PageHistory";
import useRatings from "@/hooks/useRatings";
import { Heart, Minus, Plus } from "lucide-react";
import JustForYou from "@/components/home/JustForYou";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { show } = useRatings();

  const product = useAppSelector(selectProductById(id));
  const isWishlisted = useAppSelector(selectIsWishlisted(id ?? ""));

  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState("M"); // default M

  useEffect(() => {
    if (id && !product) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, product]);

  if (!product) {
    return (
      <div className="h-screen flexCenter text-gray-500">
        Loading product...
      </div>
    );
  }

  // pick colors (from product.colors or fallback)
  const colors = product.colors?.length
    ? product.colors
    : ["#000000", "#DB4444", "#00FF66"];
  const displayedColors = colors.slice(0, 3);
  if (!activeColor) setActiveColor(displayedColors[0]);

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory
        path={`Home / Gaming`}
        current={product.name}
      />

      <div className="w-[95%] lg:w-[90%] mx-auto mt-10 grid grid-cols-1 lg:grid-cols-[170px_500px_1fr] gap-[30px]">
        {/* other images */}
        <div className="hidden lg:flex flex-col  gap-4">
          {product.otherImgs?.length
            ? product.otherImgs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name}-${i}`}
                  className="h-[138px] w-full object-cover rounded cursor-pointer"
                />
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[138px] w-full bg-gray-200 rounded"
                />
              ))}
        </div>

        {/* main image */}
        <div  >
          <img
            src={product.img}
            alt={product.name}
            className=" h-[300px] bg-[#F5F5F5] lg:h-[600px] w-full object-contain rounded"
          />
        </div>

        {/* product details */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          {/* rating */}
          <div className="flex items-center gap-2 mt-2">
            {show(product.rating)}
            <span className="text-sm text-gray-600">
              ({product.ratingCount} reviews) | In Stock
            </span>
          </div>

          {/* description */}
          <p className="mt-4 border-b border-black pb-4 text-gray-700">
            {product.discription}
          </p>

          {/* colors */}
          <div className="flexStart gap-2 mt-4">
            <span className="font-inter text-[20px] font-normal text-black ">Colors:</span>
            <div className="flex gap-2 mt-2">
              {displayedColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveColor(c)}
                  style={{ backgroundColor: c }}
                  className={`h-8 w-8 rounded-full border-2 ${
                    activeColor === c ? "border-black" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* sizes */}
          <div className="gap-2 flexStart mt-4">
            <span className="font-inter text-[20px] font-medium">Sizes:</span>
            <div className="flex gap-2 mt-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSize(s)}
                  className={`px-4 py-2 border rounded ${
                    activeSize === s
                      ? "bg-[#DB4444] text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* quantity + buttons */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border-[1px] border-[#00000080] rounded">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 border-r-[1px] border-[#00000080] "
              >
                <Minus size={16} />
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="bg-[#DB4444] text-white px-3 py-2"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={() => dispatch(addToCart({ product, quantity: qty }))}
              className="px-6 py-3 bg-[#DB4444] text-white rounded"
            >
              Buy Now
            </button>

            <button
              onClick={() => dispatch(toggleWishlist({ productId: product.id }))}
              className={`p-3 rounded-full border ${
                isWishlisted ? "bg-[#DB4444] text-white" : "bg-white text-black"
              }`}
            >
              <Heart size={20} />
            </button>
          </div>
          {/* service */}
          <div className="mt-[40px] border-[1px] border-[#00000080] rounded grid grid-cols-1 ">
            <div className="grid grid-cols-[40px_1fr] gap-4  py-4 ps-6 border-b border-[#00000080] ">
              <img className=" h-10 object-cover " src="/svg/delivery2.svg" alt="delivery icon" loading="lazy" />
              <div className="">
                <h3 className="font-poppins font-medium text-base text-black ">Free Delivery</h3>
                <p className="font-poppins font-medium text-[12px] underline mt-2 text-black">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="grid grid-cols-[40px_1fr] gap-4  py-4 ps-6  ">
              <img className=" h-10 object-cover " src="/svg/return.svg" alt="return icon" loading="lazy" />
              <div className="">
                <h3 className="font-poppins font-medium text-base text-black ">Return Delivery</h3>
                <p className="font-poppins font-medium text-[12px]  mt-2 text-black"> Delivery Free 30 Days Delivery Returns. <Link className="underline" to="#">Details</Link> </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

       {product && (
              <JustForYou
                productId={product?.id} // ✅ first wishlist product
                section={product?.section} // ✅ section from that product
                showBtn={false}
                title="Related Item"
              />
            )}

      <Footer />
    </div>
  );
};

export default ProductDetails;
