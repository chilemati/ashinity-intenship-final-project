import jsonData from "@/data/footer.json";
import SendMail from "./SendMail";
import { Link } from "react-router-dom";
const data = jsonData.data;

const Footer = () => {
  return (
    <div className="min-h-[440px] w-full bg-black pb-6  " >
        <div className="w-[90%] pt-[20px] text-[#FAFAFA] lg:pt-[80px] grid-cols-1 md:grid-cols-3 grid xl:grid-cols-[217px_175px_123px_109px_198px] gap-[20px] lg:gap-[67px]   mx-auto ">
            {/* box1 */}
            <div className=" ">
                <h2 className="font-inter font-bold text-nowrap text-[24px] "> {data.box1.title} </h2>
                <h3 className="font-poppins font-medium text-[20px] mt-4 "> {data.box1.h3} </h3>
                <p className="font-poppins font-normal text-[16px] mt-4 "> {data.box1.p} </p>
                <SendMail />
            </div>
            {/* box2 */}
            <div className="">
                 <h2 className="font-inter font-bold text-nowrap text-[24px] "> {data.box2.title} </h2>
                <div className="mt-6 ">
                     {
                    data.box2.list.map((item:any, index:any) => (
                        <p key={index} className="font-poppins font-normal mb-4 text-[16px] mt-4  transition "> {item} </p>
                    ))  
                 }
                </div>
            </div>
            {/* box3 */}
            <div className="">
                 <h2 className="font-inter font-bold text-nowrap text-[24px] "> {data.box3.title} </h2>
                  <div className="mt-6 ">
                     {
                    data.box3.links.map((item:any, index:any) => (
                        <Link to={item.to} key={index} className="font-poppins text-nowrap block font-normal mb-4 text-[16px] mt-4  transition "> {item.text} </Link>
                    ))  
                 }
                </div>
            </div>
            {/* box4 */}
            <div className="">
                 <h2 className="font-inter font-bold text-nowrap text-[24px] "> {data.box4.title} </h2>
                 <div className="mt-6 ">
                     {
                    data.box4.links.map((item:any, index:any) => (
                        <Link to={item.to} key={index} className="font-poppins text-nowrap block font-normal mb-4 text-[16px] mt-4  transition "> {item.text} </Link>
                    ))  
                 }
                </div>
            </div>
            {/* box5 */}
            <div className="">
                 <h2 className="font-inter font-bold text-nowrap text-[24px] "> {data.box5.title} </h2>
                  <p className="font-poppins font-normal text-[12px] mt-6 "> {data.box5.p} </p>
                  <div className="grid grid-cols-2 gap-[10px] mt-3 ">
                    <Link to="#">
                    <img src={data.box5.qr} alt="qr code" loading="lazy" />
                    </Link>
                    <div className="grid grid-cols-1 gap-[10px] ">
                        <Link to="#">
                        <img src={data.box5.goggleStore} alt="google store" loading="lazy" />
                    </Link>
                    <Link to="#">
                        <img src={data.box5.appStore} alt="apple store" loading="lazy" />
                    </Link>
                    </div>
                  </div>
                  {/* icons */}
                  <div className="flexStart gap-6 mt-6  ">
                    {
                        data.box5.socials.map((item:any, index:any) => (
                            <Link to={item.to} key={index} className="w-8 h-8 rounded-full bg-transparent flexCenter hover:bg-green-700 transition ">
                                <img src={item.icon} alt={item?.name} loading="lazy" className="w-6 h-6 object-cover " />
                            </Link>
                        ))
                    }
                  </div>
            </div>
        </div>
        {/* bottom */}
        <div className="h-10 pt-6 border-t-[1px] border-white ">
            <p className="font-poppins font-normal text-center text-base text-[#FFFFFF] "> &copy; Copyright Rimel {new Date().getFullYear()}. All right reserved </p>
        </div>
    </div>
  )
}

export default Footer