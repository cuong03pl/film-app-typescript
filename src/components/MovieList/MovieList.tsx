import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import RateFilm from "../RateFilm/RateFilm";
import Images from "../Images/Images";
import SkeletonItem from "../Skeleton/Skeleton";
import { getFilmHomePage } from "../../apiServices/apiServices";
import image from "../../assets/img/img";
import config from "../../config";

interface MovieListProps {
  path: string,
  title: string
}

function MovieList({ path, title }: MovieListProps) {
  const [movieList, setMovieList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getFilmHomePage(`movie/${path}`)
        .then((res) => {
          setMovieList(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [path]);
  return (
    <div>
      <h3 className="text-xl font-bold text-textPrimary">{title}</h3>
      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        slidesPerGroupAuto
        loop={true}
        loopedSlides={5}
        className=" absolute   h-full rounded-2xl  mySwiper"
      >
        {movieList.map((item: Record<string, any>, index: number) => {
          return (
            <SwiperSlide className="!w-[175px] select-none" key={index}>
              {isLoading ? (
                <>
                  <SkeletonItem className={" w-full h-[250px] mt-6"} />
                  <SkeletonItem className={" w-full h-[40px] mt-[6px]"} />
                </>
              ) : (
                <Link
                  to={`/movie/${item.id}`}
                  className="w-[175px] flex flex-col items-center mt-6 overflow-hidden relative hover:scale-105 hover:brightness-110 transition duration-300"
                >
                  <Images
                    fallBack={`${image?.similarFilmFallBack}`}
                    className="object-cover rounded-xl min-h-[260px]"
                    src={`${config?.api.IMG_API}${item?.poster_path}`}
                    alt=""
                  />
                  <p className="text-center font-semibold text-lg max-h-[56px] line-clamp-2 text-textPrimary">
                    {item?.title}
                  </p>
                  <RateFilm sizeIcon="h-4 w-4" data={item?.vote_average} />
                </Link>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MovieList;
