import { aboutSvg } from "@/dynamicSvgs/about";
import { useState } from "react";

interface Social {
  name: string;
  to: string;
}

interface TeamMember {
  img: string;
  name: string;
  title: string;
  socials: Social[];
}

const Section3 = ({ data }: { data: TeamMember[] }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  const paginated = data.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] ">
        {paginated.map((member, idx) => {
          const actualIndex = page * itemsPerPage + idx; // keep real index
          return (
            <div
              key={actualIndex}
              className="bg-[#F5F5F5] shadow-md rounded p-6 text-start"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-[430px] object-contain  mx-auto mb-4"
              />
              <h3 className="text-[32px] mt-4 font-inter text-black font-semibold">
                {member.name} {actualIndex > 2 && actualIndex}
              </h3>
              <p className="text-black text-base font-poppins mt-2 ">
                {member.title}
              </p>
              <div className="flex justify-start gap-3 mt-4">
                {member.socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.to}
                    className="text-black hover:text-gray-500 text-sm"
                  >
                    {aboutSvg[social.name]}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`w-3 h-3 rounded-full ${
              i === page
                ? "bg-[#DB4444] border-2 border-black/30"
                : "bg-black/30 border border-black/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Section3;
