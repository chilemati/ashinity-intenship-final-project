import { Link } from "react-router-dom";
import TransparentSelect from "../TransparentSelect";
import jsonData from "@data/nav.json";
const headline = jsonData.topnav;
import AutoScroll from "@/components/AutoScroll"
const Headline = () => {
  return (
    <div className=" mx-auto min-h-[48px] bg-black flexCenter  ">
      {/* container */}
      <div className="w-full lg:w-[80%] flexBetween flex-col md:flex-row flex-nowrap  ">
        <div className="flexCenter gap-2 w-full  lg:w-[90%] ">
          
        <AutoScroll>
            <span className="font-poppins font-normal text-center text-[14px] text-white "> 
            <span className="">{headline.p}</span>
            <Link to={headline.link.to} className="font-semibold ms-2 "> {headline.link.text} </Link>
             </span>
          </AutoScroll>
              
       
        </div>
        <div className="flexStart gap-[25px] ">
         <TransparentSelect data={headline.languages} />
         
    
        </div>
      </div>
    </div>
  );
};

export default Headline;
