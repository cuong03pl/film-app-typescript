import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerItem from "./BannerItem";
import "swiper/css";
import "swiper/css/navigation";

import SkeletonItem from "../Skeleton/Skeleton";
import { getMovieRightBar } from "../../apiServices/apiServices";

function Banner() {
  const [bannerList, setBannerList] = useState<[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getMovieRightBar("trending/movie/day")
        .then((data) => {
          setBannerList(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, []);

  return (
    <>
      {isloading ? (
        <SkeletonItem className={" w-full h-[400px]"} />
      ) : (
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="absolute top-0 left-0 w-full h-full  rounded-2xl overflow-x-hidden   mySwiper"
        >
          {bannerList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <BannerItem data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}

export default Banner;
