import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchRelatedProducts,
  selectRelatedFor,
} from "@/store/productsSlice";
import { addToCart, toggleWishlist } from "@/store/cartSlice";
import { Eye, Heart } from "lucide-react";
import QuickView from "./QuickView";
import { Link } from "react-router-dom";
import useRatings from "@/hooks/useRatings";

interface Props {
  title?: string;
  productId: string | number;   // ✅ base product id
  section: string;     // ✅ base product section
  showBtn?: boolean;
  btnText?: string;

}

const JustForYou = ({ title = "Just For You", productId, section, showBtn=true, btnText="See All" }: Props) => {
    const dispatch = useAppDispatch();
  const { show } = useRatings();

  const wishlistIds = useAppSelector((s) => Object.keys(s.cart.wishlist));
  const cartItemsMap = useAppSelector((s) => s.cart.items);

  // ✅ related products selector
  const relatedProducts = useAppSelector(selectRelatedFor(productId));

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    if (productId && section) {
      dispatch(fetchRelatedProducts({ id: productId, section }));
    }
  }, [dispatch, productId, section]);

  if (!productId) {
    return (
      <div className="mt-10 text-center text-gray-600">
        Add something to wishlist to see recommendations ✨
      </div>
    );
  }

  return (
    <div className="my-[40px] lg:my-[140px] w-[95%] lg:w-[90%] mx-auto  ">
        <div className="flexBetween">
      {/* title */}
      <div className="flexStart gap-[10px] ">
        <div className="w-[20px] h-[40px] rounded-[4px] bg-[#DB4444] "></div>
        <h3 className="font-poppins font-semibold text-base text-[#DB4444] ">
          {title}
        </h3>
      </div>
        {showBtn &&
          <button className="py-4 px-6 lg:px-[48px] w-fit font-poppins font-medium text-black text-base border-[1px] rounded border-[#00000080]   "> {btnText} </button> }

        </div>

      {/* related products */}
      <div className="flexStart gap-[30px] overflow-x-scroll hide-scrollbar mt-[30px] pb-[20px]">
        {relatedProducts.map((p) => {
          const isWishlisted = !!wishlistIds.includes(String(p.id));
          const inCart = !!cartItemsMap[p.id];

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
                    onClick={() => !inCart && dispatch(addToCart({ product: p }))}
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
                    className="text-black flexCenter w-[34px] h-[34px] rounded-full bg-white "
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
              </div>

              {/* Product Details */}
              <div className="mt-[30px]">
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-[#DB4444] ">
                    {p.price}
                  </span>
                  {p.oldPrice !== "$0" && (
                    <span className="line-through text-gray-400">
                      {p.oldPrice}
                    </span>
                  )}
                </div>
                {/* ratings */}
                <div className="flexStart gap-2 mt-2 ">
                  <span className="flexStart gap-2 ">{show(p.rating)}</span>
                  <span className="font-poppins font-semibold text-[14px] text-black ">
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

export default JustForYou;
