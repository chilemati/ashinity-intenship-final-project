import Footer from "@/components/home/Footer"
import Headline from "@/components/home/Headline"
import PageHistory from "@/components/home/PageHistory"
import Navber from "@/components/Navber"

const Cart = () => {
  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Home" current="Cart" />
      Cart
      <Footer />
      </div>
  )
}

export default Cart