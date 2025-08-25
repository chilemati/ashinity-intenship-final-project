import Hero from "./Hero"
import SideNav from "./Sidenav"

const HeroLayout = () => {
  return (
    <div className="lg:w-[80%] mx-auto grid grid-cols-1  lg:grid-cols-[217px_1fr] gap-[61px] " >
       <div className="hidden lg:grid ">  <SideNav /></div>
        <Hero />
    </div>
  )
}

export default HeroLayout

