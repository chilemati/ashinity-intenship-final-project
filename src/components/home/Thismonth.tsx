import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductsBySection,
  selectProductsBySection,
} from "@/store/productsSlice";
import QuickView from "./QuickView";
import { Eye, Heart } from "lucide-react";
import useRatings from "@/hooks/useRatings";

// ✅ import actions + selectors
import {
  addToCart,
  toggleWishlist,
} from "@/store/cartSlice";
import { Link } from "react-router-dom";

const Thismonth = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    selectProductsBySection("Best Selling Products")
  );
  const status = useAppSelector((s: any) => s.products.status);
  const { show } = useRatings();
  // collect wishlist state for all products outside of map
  const wishlistMap = useAppSelector((s) => s.cart.wishlist);
  const cartItemsMap = useAppSelector((s) => s.cart.items);

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchProductsBySection("Best Selling Products"));
  }, [dispatch]);

  if (status === "loading" && products.length === 0) return <p>Loading…</p>;

  return (
    <div className="mt-[140px] w-[95%] lg:w-[90%] mx-auto">
      {/* title */}
      <div className="flexStart gap-[10px] ">
        <div className="w-[20px] h-[40px] rounded-[4px] bg-[#DB4444]" />
        <h3 className="font-poppins font-semibold text-base text-[#DB4444]">
          This Month
        </h3>
      </div>

      {/* header */}
      <div className="flexBetween">
        <h2 className="font-inter font-semibold text-[20px] lg:text-[36px] text-black mt-[11px]">
          Best Selling Products
        </h2>
        <div className="hidden lg:flexStart gap-2">
          <button className="bg-[#DB4444] py-4 px-[48px] rounded-[4px] text-[#FAFAFA] font-poppins text-base font-[500]">
            View All
          </button>
        </div>
      </div>

      {/* products */}
      <div
        ref={scrollRef}
        className="flexStart gap-[30px] overflow-x-scroll hide-scrollbar mt-[30px] pb-[20px]"
      >
        {products.map((p) => {
          const isWishlisted = !!wishlistMap[p.id]; // ✅ wishlist
          const inCart = !!cartItemsMap[p.id]; // ✅ check if already in cart

          return (
            <div className="max-w-[270px] min-w-[270px]" key={p.id}>
              {/* image */}
              <div className="group relative bg-[#F5F5F5] h-[250px] w-full object-contain rounded-[4px]">
                <Link to={`/product/${p.id}`}>
                <img
                  className="h-[209px] w-full object-contain"
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                />
                </Link>
                {/* add to cart */}
                <div className="group-hover:flex h-[41px] w-full mt-6 hidden gap-3">
                  <button
                    onClick={() =>
                      !inCart && dispatch(addToCart({ product: p }))
                    }
                    disabled={inCart}
                    className={`w-full px-6 py-2 rounded-xl font-medium transition ${
                      inCart
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-black text-white"
                    }`}
                  >
                    {inCart ? "Added" : "Add to Cart"}
                  </button>
                </div>
                {/* icons */}
                <div className="w-[34px] absolute top-3 right-3 flexCol gap-3">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="text-black flexCenter w-[34px] h-[34px] rounded-full bg-white"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() =>
                      dispatch(toggleWishlist({ productId: p.id }))
                    }
                    className={`flexCenter w-[34px] h-[34px] rounded-full ${
                      isWishlisted
                        ? "bg-[#DB4444] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <Heart size={20} />
                  </button>
                </div>
                {/* discount */}
                <div className="absolute top-3 left-3 bg-transparent">
                  {p.discount !== "0%" && (
                    <>
                      {p.discount === "New" ? (
                        <span className="ml-2 text-sm text-white bg-[#00FF66] font-medium px-2 py-1 rounded">
                          New
                        </span>
                      ) : (
                        <span className="ml-2 text-sm bg-[#DB4444] text-white font-medium px-2 py-1 rounded">
                          -{p.discount}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-[30px]">
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-black">
                    {p.price}
                  </span>
                  {p.oldPrice !== "$0" && (
                    <span className="line-through text-gray-400">
                      {p.oldPrice}
                    </span>
                  )}
                </div>
                {/* ratings */}
                <div className="flexStart gap-2 mt-2">
                  <span className="flexStart gap-2">{show(p.rating)}</span>
                  <span className="font-poppins font-semibold text-[14px] text-black">
                    ({p.ratingCount})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Quick View Modal */}
      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Thismonth;
