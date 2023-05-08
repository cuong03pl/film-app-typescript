import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import Director from "../Director/Director";
import Genres from "../Genres/Genres";
import { FavouriteIcon } from "../Icon/Icon";
import PropTypes from "prop-types";
import SkeletonItem from "../Skeleton/Skeleton";
import { UserContext } from "../../context/AuthProvider";
import { getMovieDetails } from "../../apiServices/apiServices";
interface  FilmDetailsProps {
  id?: string
  watchPage?: boolean
  movieDetailPage?: boolean
  onClick?: Function
  favourite?: boolean
  check?: boolean
}
function FilmDetails({
  id = "",
  watchPage,
  movieDetailPage,
  onClick,
  favourite,
  check,
}: FilmDetailsProps) {
  const [movie, setMovie] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  const user = useContext(UserContext);
  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getMovieDetails(id)
        .then((data) => {
          setMovie(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [id]);

  let classes;
  if (watchPage) {
    classes = "mb-4";
  }
  if (movieDetailPage) {
    classes = "px-4";
  }
  return (
    <div className={classes}>
      <h2 className="font-semibold text-5xl mb-7 text-[#fff]">
        {movie?.title}
      </h2>

      {favourite && !check ? (
        <>
          <Button
            onClick={onClick}
            favouriteBtn
            leftIcon={<FavouriteIcon className={"h-4 w-4"} />}
          >
            Yêu Thích
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={onClick}
            selectedBtn
            leftIcon={<FavouriteIcon className={"h-4 w-4"} />}
          >
            Yêu Thích
          </Button>
        </>
      )}

      {/* genres */}
      <Genres isLoading={isLoading} id={id} />
      {/* IMDB */}
      <div className="flex items-center mb-5">
        <div className="font-bold text-black bg-[#f5c518] py-1 px-2  flex justify-center items-center rounded-xl">
          IMDb
        </div>
        <span className="text-[#a2a2be] ml-2  font-bold">
          {String(movie?.vote_average).slice(0, 3)}
        </span>
      </div>
      <div>
        {/* dao dien */}

        <Director id={id} />

        {/* ngay khoi chieu */}
        <div className="flex mt-2">
          <>
            <span className="w-[120px] block text-[#7a7a7a] ">KHỞI CHIẾU</span>
            <span className="font-bold  cursor-pointer text-[#dbdbdb]">
              {movie?.release_date}
            </span>
          </>
        </div>
      </div>

      <div className="text-[#b5b5b5] mt-6">{movie?.overview}</div>
    </div>
  );
}

export default FilmDetails;
