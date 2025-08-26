import Categories from "@/components/home/Categories"
import Flashsales from "@/components/home/Flashsales"
import Headline from "@/components/home/Headline"
import HeroLayout from "@/components/home/HeroLayout"
import Navber from "@/components/Navber"

const Home = () => {
  return (
    <div className="" >
      <Headline />
      <Navber />
      <HeroLayout />
      <Flashsales />
      <Categories />

    </div>
  )
}

export default Home