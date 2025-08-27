import Footer from "@/components/home/Footer"
import Headline from "@/components/home/Headline"
import PageHistory from "@/components/home/PageHistory"
import Services from "@/components/home/Services"
import Navber from "@/components/Navber"

const About = () => {
  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Home" current="About" />
      About
      <Services />
      <Footer />
      </div>
  )
}

export default About