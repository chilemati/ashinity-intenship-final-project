import Footer from "@/components/home/Footer"
import Headline from "@/components/home/Headline"
import PageHistory from "@/components/home/PageHistory"
import Navber from "@/components/Navber"

const Contact = () => {
  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Home" current="Contact" />
      Contact
      <Footer />
      </div>
  )
}

export default Contact