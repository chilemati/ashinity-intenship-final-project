import Footer from "@/components/home/Footer"
import Headline from "@/components/home/Headline"
import PageHistory from "@/components/home/PageHistory"
import Navber from "@/components/Navber"

const Checkout = () => {
  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Account / My Account / Product / View Cart " current="Checkout" />
      Checkout
      <Footer />
      </div>
  )
}

export default Checkout