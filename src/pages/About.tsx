import Footer from "@/components/home/Footer";
import Headline from "@/components/home/Headline";
import PageHistory from "@/components/home/PageHistory";
import Navber from "@/components/Navber";
import jsonData from "@/data/about.json";

import Section1 from "@/components/about/Section1";
import Services from "@/components/home/Services";
import Section2 from "@/components/about/Section2";
import Section3 from "@/components/about/Section3";

const data = jsonData;

const About = () => {
  return (
    <div>
      <Headline />
      <Navber />
      <PageHistory path="Home" current="About" />

      {/* Section 1 */}
      <Section1 data={data.data.section1} />

      {/* Section 2 */}
      <Section2 data={data.data.sectin2} />

      {/* Section 3 */}
      <Section3 data={data.section3} />

      {/* Reuse Services */}
      <Services />

      <Footer />
    </div>
  );
};

export default About;
