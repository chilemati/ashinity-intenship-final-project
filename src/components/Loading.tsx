
const Loading = () => {
  return (
    <div className='flexCenter flex-col gap-2 w-full h-screen fixed  bg-white top-0 z-50 ' >
        <img src="/file.png" alt="ashinity" className="w-[80px] h-[80px] shadow-xl object-cover rounded-full animate-bounce flexCenter " />
        <p className='text-2xl font-bold text-purple-700'>Loading...</p>
    </div>
  )
}

export default Loading