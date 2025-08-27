import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import Headline from "@/components/home/Headline";
import Navber from "@/components/Navber";
import Footer from "@/components/home/Footer";
import {
  addToCart,
  removeFromWishlist,
  selectCartItems,
  selectWishlistIds,
} from "@/store/cartSlice";
import { selectProductById } from "@/store/productsSlice";
import type { RootState } from "@/store/store";
import JustForYou from "@/components/home/JustForYou";

const Wishlist = () => {
  const dispatch = useDispatch();

  // wishlist product IDs
  const wishlistIds = useSelector(selectWishlistIds);

  // wishlist products
  const products = useSelector((s: RootState) =>
    wishlistIds.map((id) => selectProductById(id)(s)).filter(Boolean)
  );

  // cart items map for quick lookup
  const cartItems = useSelector(selectCartItems);
  const cartItemsMap = Object.fromEntries(
    cartItems.map((item) => [item.productId, true])
  );

  return (
    <div>
      <Headline />
      <Navber />

      {/* top */}
      <div className="flexBetween px-4 lg:px-0 lg:w-[90%] mx-auto my-[30px] lg:mt-[80px] lg:mb-[60px] ">
        <span className=" font-poppins font-normal text-[20px] text-black ">
          Wishlist ({products.length})
        </span>
        <button className="py-4 px-6 lg:px-[48px] w-fit font-poppins font-medium text-black text-base border-[1px] rounded border-[#00000080]   ">
          Move All To Bag
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center mt-10 px-4 pb-10 lg:pb-[80px] ">
        {products.length === 0 ? (
          <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
        ) : (
          products.map((p) => {
            const inCart = !!cartItemsMap[p!.id];

            return (
              <div className="max-w-[270px] min-w-[270px]" key={p!.id}>
                {/* image */}
                <div className="group relative bg-[#F5F5F5] h-[250px] w-full object-contain rounded-[4px]">
                  <Link to={`/product/${p!.id}`}>
                    <img
                      className="h-[209px] w-full object-contain"
                      src={p!.img}
                      alt={p!.name}
                      loading="lazy"
                    />
                  </Link>

                  {/* add to cart */}
                  <div className="group-hover:flex h-[41px] w-full mt-6 hidden gap-3">
                    <button
                      onClick={() =>
                        !inCart && dispatch(addToCart({ product: p! }))
                      }
                      disabled={inCart}
                      className={`w-full px-6 py-2 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                        inCart
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-black text-white hover:bg-green-700"
                      }`}
                    >
                      <ShoppingCart size={18} />
                      {inCart ? "Added" : "Add to Cart"}
                    </button>
                  </div>

                  {/* delete icon */}
                  <div className="w-[34px] absolute top-3 right-3 flexCol gap-3">
                    <button
                      onClick={() =>
                        dispatch(removeFromWishlist({ productId: p!.id }))
                      }
                      className="text-black flexCenter w-[34px] h-[34px] rounded-full bg-white hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* discount */}
                  <div className="absolute top-3 left-3 bg-transparent">
                    {p!.discount !== "0%" && (
                      <>
                        {p!.discount === "New" ? (
                          <span className="ml-2 text-sm text-white bg-[#00FF66] font-medium px-2 py-1 rounded">
                            New
                          </span>
                        ) : (
                          <span className="ml-2 text-sm bg-[#DB4444] text-white font-medium px-2 py-1 rounded ">
                            -{p!.discount}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-[30px]">
                  <h2 className="text-xl font-semibold">{p!.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-[#DB4444] ">
                      {p!.price}
                    </span>
                    {p!.oldPrice !== "$0" && (
                      <span className="line-through text-gray-400">
                        {p!.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {products.length > 0 && (
        <JustForYou
          productId={products[0]!.id} // ✅ first wishlist product
          section={products[0]!.section} // ✅ section from that product
        />
      )}

      <Footer />
    </div>
  );
};

export default Wishlist;
