import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const BackToTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
   <div className="relative h-[62px] flex items-start justify-end pe-4 lg:pe-[89px]  ">
     <motion.button
      onClick={handleScrollTop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="  h-[46px]   w-[46px] bg-[#F5F5F5] rounded-full flex items-center justify-center shadow-md cursor-pointer z-50"
    >
      <ArrowUp size={22} className="text-black" />
    </motion.button>
   </div>
  );
};

export default BackToTop;
