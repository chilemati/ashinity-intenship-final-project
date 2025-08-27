interface p{
    path: string;
    current: string
}
const PageHistory = ( {path,current}:p ) => {
  return (
    <div className="pt-6 lg:pt-[85px] ps-4 lg:ps-[135px] " >
        <p className="font-poppins text-[14px] lg:text-[18px] font-normal text-[#757575] " > {path} / <span className="text-black font-medium " > {current} </span> </p>
    </div>
  )
}

export default PageHistory