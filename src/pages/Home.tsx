import Categories from "@/components/home/Categories"
import Flashsales from "@/components/home/Flashsales"
import Headline from "@/components/home/Headline"
import HeroLayout from "@/components/home/HeroLayout"
import Thismonth from "@/components/home/Thismonth"
import Navber from "@/components/Navber"

const Home = () => {
  return (
    <div className="" >
      <Headline />
      <Navber />
      <HeroLayout />
      <Flashsales />
      <Categories />
      <Thismonth />

    </div>
  )
}

export default Home