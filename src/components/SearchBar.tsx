interface p{
    icon: string,
    placeholder: string
}
const SearchBar = ({icon,placeholder}:p) => {
  return (
    <div className="relative bg-[#F5F5F5] rounded-[4px]  w-full max-w-[234px] h-[38px] mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full pl-4 pr-10 bg-transparent text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-[12px] font-poppins "
      />
      {/* Search icon */}
     <img  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" src={icon} alt="search icon" loading="lazy" />
    </div>
  );
};

export default SearchBar;
