import { heroSvg } from "@/dynamicSvgs/hero";
import CountdownTimer from "./CountdownTimer";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductsBySection,
  selectProductsBySection,
} from "@/store/productsSlice";
import QuickView from "./QuickView";
import { Eye, Heart } from "lucide-react";
import useRatings from "@/hooks/useRatings";

const Flashsales = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsBySection("flash sales"));
  const status = useAppSelector((s: any) => s.products.status);
  const { show } = useRatings();

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // ✅ Ref for scroll container
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ State to disable/enable arrows
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    dispatch(fetchProductsBySection("flash sales"));
  }, [dispatch]);

  // Create an end date 3 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 4);

  // ✅ Update arrow states on scroll
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 300; // adjust to match card width + gap
    const newScrollLeft =
      direction === "left" ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount;

    el.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  };

  if (status === "loading" && products.length === 0) return <p>Loading…</p>;

  return (
    <div className="mt-[140px] w-[95%] lg:w-[90%] mx-auto border-b-[0.5px] border-b-black ">
      {/* title */}
      <div className="flexStart gap-[10px] ">
        <div className="w-[20px] h-[40px] rounded-[4px] bg-[#DB4444] "></div>
        <h3 className="font-poppins font-semibold text-base text-[#DB4444] ">
          Today’s
        </h3>
      </div>

      {/* flash timer */}
      <div className="flexBetween">
        <div className="flexStart flex-nowrap gap-4 lg:gap-[87px] mt-[11px] ">
          <h2 className="font-inter font-semibold text-[20px] lg:text-[36px] text-black ">
            Flash Sales
          </h2>
          <CountdownTimer
            endDate={endDate.toISOString()}
            onComplete={() => alert("Flash Sales Ended!")}
          />
        </div>
        {/* arrows */}
        <div className="hidden lg:flexStart gap-2 ">
          <button
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
            className={`-rotate-180 h-[46px] w-[46px] rounded-full flexCenter ${
              canScrollLeft ? "bg-[#F5F5F5]" : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            {heroSvg.arrow2}
          </button>
          <button
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
            className={`h-[46px] w-[46px] rounded-full flexCenter ${
              canScrollRight ? "bg-[#F5F5F5]" : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            {heroSvg.arrow2}
          </button>
        </div>
      </div>

      {/* products */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flexStart gap-[30px] overflow-x-scroll hide-scrollbar mt-[30px] pb-[20px]"
      >
        {products.map((p) => (
          <div className="max-w-[270px] min-w-[270px]" key={p.id}>
            {/* image */}
            <div className="group relative bg-[#F5F5F5] h-[250px] w-full object-contain rounded-[4px]">
              <img
                className="h-[209px] w-full object-contain"
                src={p.img}
                alt={p.name}
                loading="lazy"
              />
              {/* add to cart */}
              <div className="group-hover:flex h-[41px] w-full mt-6 hidden gap-3">
                <button className="bg-black w-full text-white px-6 py-2 rounded-xl font-medium transition">
                  Add to Cart
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
                  onClick={() => {}}
                  className="text-black flexCenter w-[34px] h-[34px] rounded-full bg-white "
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
                      <span className="ml-2 text-sm bg-[#DB4444] text-white font-medium px-2 py-1 rounded ">
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
                <span className="text-lg font-bold text-black">{p.price}</span>
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
        ))}
      </div>

      {/* ✅ Quick View Modal */}
      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {/* all product  */}
      <div className="my-[60px] flexCenter ">
        <button className="bg-[#DB4444] py-4 px-[48px] rounded-[4px] text-[#FAFAFA] font-poppins text-base  font-[500] ">View All Products</button>
      </div>
    </div>
  );
};

export default Flashsales;
