import Categories from "@/components/home/Categories"
import Flashsales from "@/components/home/Flashsales"
import Headline from "@/components/home/Headline"
import HeroLayout from "@/components/home/HeroLayout"
import Thismonth from "@/components/home/Thismonth"
import HeroCategory from "@/components/home/HeroCategory"
import Navber from "@/components/Navber"
import OurProducts from "@/components/home/OurProducts"
import NewArrival from "@/components/home/NewArrival"
import Services from "@/components/home/Services"
import BackToTop from "@/components/home/BackToTop"

const Home = () => {
  return (
    <div className="" >
      <Headline />
      <Navber />
      <HeroLayout />
      <Flashsales />
      <Categories />
      <Thismonth />
      <HeroCategory />
      <OurProducts />
      <NewArrival />
      <Services />
      <BackToTop />

    </div>
  )
}

export default Home