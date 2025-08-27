import Footer from "@/components/home/Footer";
import Headline from "@/components/home/Headline";
import PageHistory from "@/components/home/PageHistory";
import Navber from "@/components/Navber";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="">
      <Headline />
      <Navber />
      <PageHistory path="Home" current="404 Error" />
      <div className="flexCenter my-[70px] lg:my-[140px] flex-col gap-4 ">
        <h1 className="font-inter text-[30px] lg:text-[110px] font-medium mb-4">
          404 Not Found
        </h1>
        <p className="text-base font-poppins text-black text-center  mb-10">
          Your visited page not found. You may go home page.
        </p>
        <Link
          to="/"
          className="py-4 px-[48px] bg-[#DB4444] mt-[80px] w-fit block text-white font-poppins font-medium rounded hover:bg-green-700 transition"
        >
          Back to home page
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
