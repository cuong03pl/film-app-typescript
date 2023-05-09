import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import RateFilm from "../RateFilm/RateFilm";
import SkeletonItem from "../Skeleton/Skeleton";
import config from "../../config";
import image from "../../assets/img/img";
const Images = React.lazy(() => import("../Images/Images"));

interface SearchResultProps {
  data?: any,
  skeleton?: boolean
}
function SearchResult({ data, skeleton = true }: SearchResultProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [data]);

  return (
    <div className=" w-full ">
      <div className="flex relative max-w-full flex-wrap ">
        {data?.map((item: Record<string, any>, index: number) => {
          return (
            <>
              {isLoading && skeleton ? (
                <div className="mr-[30px] mt-6">
                  <SkeletonItem className={" w-[180px] h-[270px]"} />
                  <SkeletonItem className={" w-[180px] h-[28px] mt-[6px]"} />
                </div>
              ) : (
                <Link
                  key={index}
                  to={`/movie/${item?.id}`}
                  className="max-w-[25%] w-[25%] flex flex-col items-center mt-6 overflow-hidden relative hover:scale-105 hover:brightness-110 transition duration-300"
                >
                  <Images
                    fallBack={`${image?.similarFilmFallBack}`}
                    className="w-[180px] h-[270px] rounded-xl"
                    src={`${config.api.IMG_API}${item?.poster_path}`}
                    alt=""
                  />
                  <p className="text-center font-semibold text-lg text-textPrimary text-ellipsis  line-clamp-2">
                    {item?.title}
                  </p>

                  <RateFilm sizeIcon="h-4 w-4" data={item?.vote_average} />
                </Link>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResult;
