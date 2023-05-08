import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import Images from "../Images/Images";
import RateFilm from "../RateFilm/RateFilm";
import PropTypes from "prop-types";
import SkeletonItem from "../Skeleton/Skeleton";
import image from "../../assets/img/img";
import config from "../../config";
import { getSimilarFilm } from "../../apiServices/apiServices";

interface SimilarFilmProps {
  id?: string
}
function SimilarFilm({ id = "" }: SimilarFilmProps) {
  const [similar, setSimilar] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getSimilarFilm(id)
        .then((res) => {
          setSimilar(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
    return () => {};
  }, [id]);
  return (
    <div className="mt-10">
      <h3 className="text-white font-bold text-xl mb-8">Phim tương tự</h3>
      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        slidesPerGroupAuto
        loop={true}
        loopedSlides={20}
        className=" !max-w-[845px]"
      >
        {similar?.map((item: Record<string, any>, index: number) => {
          return (
            <SwiperSlide key={index} className="!w-[175px] select-none">
              <>
                {isLoading ? (
                  <>
                    <SkeletonItem
                      className={"h-[120px] w-[185px] rounded-xl"}
                    />
                    <SkeletonItem className={"h-[28px] w-[185px] mt-1"} />
                  </>
                ) : (
                  <Link
                    to={`/movie/${item?.id}`}
                    className="w-[185px] flex flex-col items-center mt-3 overflow-hidden relative hover:scale-105 hover:brightness-110 transition duration-300"
                  >
                    <Images
                      fallBack={image?.similarFilmFallBack}
                      className="object-cover rounded-xl min-h-[100px] h-full"
                      src={`${config.api.IMG_API}${item?.backdrop_path}`}
                      alt=""
                    />
                    <p className="text-[#dbdbdb] text-lg font-semibold text-center max-h-[56px] line-clamp-2">
                      {item?.title}
                    </p>
                    <RateFilm
                      small
                      sizeIcon="h-3 w-3"
                      data={item?.vote_average}
                    />
                  </Link>
                )}
              </>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SimilarFilm;
