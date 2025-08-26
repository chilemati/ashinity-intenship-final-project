interface p{
    data: string[],
}
const TransparentSelect = ({data}:p) => {
  return (
   <div className="relative inline-block w-fit">
      <select
        className="bg-transparent text-white  rounded-lg  pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-transparent cursor-pointer w-full"
      >
        {
            data.map((each:any)=>(
                <option key={each} className="bg-gray-900  font-inter font-normal text-[13px] text-white"> {each} </option>

            ))
        }
      </select>

      {/* Custom SVG caret */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};

export default TransparentSelect;
