import Footer from "@/components/home/Footer"
import Headline from "@/components/home/Headline"
import PageHistory from "@/components/home/PageHistory"
import Navber from "@/components/Navber"

const Account = () => {
  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Home" current="Account" />
      Account
      
      <Footer />
      </div>
  )
}

export default Account