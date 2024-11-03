import SectionTitle from "../Common/SectionTitle";
import SingleLibrary from "./SingleLibrary";
import libraryData from "./libraryData";
const Participations = () => {
  return (
    <section
      id="libraries"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      <div className="container">
        <SectionTitle
          title="Get closer to our libraries"
          paragraph="Embark on an exceptional experience with KHAOUITI Apps captivating lineup."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {libraryData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleLibrary blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Participations;
