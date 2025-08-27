import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductsBySection,
  selectProductsBySection,
} from "@/store/productsSlice";

// ✅ import cart + wishlist actions/selectors
import { Link } from "react-router-dom";

// types/Product.ts
interface Product {
  id: string | number;
  img: string;
  name: string;
  discription: string;
}

const NewArrival = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsBySection("New Arrival"));
  const status = useAppSelector((s: any) => s.products.status);

  useEffect(() => {
    dispatch(fetchProductsBySection("New Arrival"));
  }, [dispatch]);

  // Create an end date 3 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 4);

  if (status === "loading" && products.length === 0) return <p className="my-5 text-black text-center " >Loading…</p>;

  interface OverlayProps {
    product: Product;
  }

  const Overlay: React.FC<OverlayProps> = ({ product }) => (
    <div className="absolute bottom-[32px] left-[32px]">
      <h2 className="font-inter text-[24px] text-white font-semibold drop-shadow-lg">
        {product.name}
      </h2>
      <p className="text-[14px] max-w-[200px] font-normal font-poppins mb-4 text-white">
        {product.discription}
      </p>
      <button className="text-[16px] font-medium w-fit border-b-[0.5px] border-b-white font-poppins mb-4 text-white">
        Shop Now
      </button>
    </div>
  );

  return (
    <div className="mt-[40px] lg:mt-[140px] w-[95%] lg:w-[90%] mx-auto  ">
      {/* title */}
      <div className="flexStart gap-[10px] ">
        <div className="w-[20px] h-[40px] rounded-[4px] bg-[#DB4444] "></div>
        <h3 className="font-poppins font-semibold text-base text-[#DB4444] ">
          Featured
        </h3>
      </div>

      {/* flash timer */}
      <div className="flexBetween">
        <div className="flexStart flex-nowrap gap-4 lg:gap-[87px] mt-[11px] ">
          <h2 className="font-inter font-semibold text-[20px] lg:text-[36px] text-black ">
            New Arrival
          </h2>
        </div>
      </div>

      {/* products */}
      <div
        className="
                mt-[30px] pb-[20px] hide-scrollbar
                grid grid-cols-1 lg:grid-cols-2  gap-[30px] min-h-[600px]
            "
      >
        {/* card 1 */}
          {products[0] && (
            <div className="relative bg-black rounded ">
              <Link to={`/product/${products[0].id}`}>
                <img
                  className="w-full h-full object-cover"
                  src={products[0].img}
                  alt={products[0].name}
                  loading="lazy"
                />
              </Link>
              <Overlay product={products[0]} />
            </div>
          )}
        <div className=" grid grid-cols-1 gap-[30px]">
          {/* card 2 */}
            {products[1] && (
              <div className="relative bg-black rounded ">
                <Link to={`/product/${products[1].id}`}>
                  <img
                    className="w-full h-full object-cover"
                    src={products[1].img}
                    alt={products[1].name}
                    loading="lazy"
                  />
                </Link>
                <Overlay product={products[1]} />
              </div>
            )}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            {/* card 3 */}
              {products[2] && (
                <div className="relative bg-black rounded ">
                  <Link to={`/product/${products[2].id}`}>
                    <img
                      className="w-full h-full object-cover"
                      src={products[2].img}
                      alt={products[2].name}
                      loading="lazy"
                    />
                  </Link>
                  <Overlay product={products[2]} />
                </div>
              )}
            {/* card4 */}
              {products[3] && (
                <div className="relative bg-black rounded ">
                  <Link to={`/product/${products[3].id}`}>
                    <img
                      className="w-full h-full object-cover"
                      src={products[3].img}
                      alt={products[3].name}
                      loading="lazy"
                    />
                  </Link>
                  <Overlay product={products[3]} />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
