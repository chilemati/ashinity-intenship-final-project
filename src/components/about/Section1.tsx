interface Section1Props {
  data: {
    left: { title: string; p1: string; p2: string };
    righg: { img: string };
  };
}

const Section1 = ({ data }: Section1Props) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Left */}
      <div>
        <h2 className="text-2xl md:text-[54px]  font-inter font-semibold mb-10 ">
          {data.left.title}
        </h2>
        <p className="text-base font-poppins text-black mb-4">{data.left.p1}</p>
        <p className="text-base font-poppins text-black">{data.left.p2}</p>
      </div>

      {/* Right */}
      <div>
        <img
          src={data.righg.img}
          alt="Our Story"
          className="w-full rounded-lg object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Section1;
