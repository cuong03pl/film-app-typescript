import { ReactNode, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import PropTypes from "prop-types";
import CastItem from "./CastItem";
import { getCast } from "../../apiServices/apiServices";
interface CastProps {
  id?: string
}
function Cast({ id }: CastProps) {
  const [cast, setCast] = useState<[] >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getCast(`movie/${id}/credits`)
        .then((res) => {
          setCast(res?.cast);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 5000);
    // return () => {};
  }, [id]);
  return (
    <div className="mt-10">
      <h3 className="text-white font-bold text-xl mb-8">Diễn viên</h3>

      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        slidesPerGroupAuto
        loop={true}
        // loopedSlides={10}
        className=" !max-w-[845px]"
      >
        {cast
          .filter((item: Record<string, any>) => item?.known_for_department === "Acting")
          .map((item: Record<string, any>, index: number) => {
            return (
              <SwiperSlide
                key={index}
                className=" !w-[160px] select-none flex flex-col items-center"
              >
                <CastItem isLoading={isLoading} item={item} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
Cast.propsType = {
  id: PropTypes.string,
};
export default Cast;
