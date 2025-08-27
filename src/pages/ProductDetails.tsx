import Footer from "@/components/home/Footer"
import Headline from "@/components/home/Headline"
import PageHistory from "@/components/home/PageHistory"
import Navber from "@/components/Navber"

const ProductDetails = () => {
  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Account / Gaming " current="Product name" />
      ProductDetails
      <Footer />
      </div>
  )
}

export default ProductDetails