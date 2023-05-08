import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Images from "../Images/Images";
import image from "../../assets/img/img";
import config from "../../config";

interface RightBarItemProps {
  data: Record<string, any>
}

function RightBarItem({ data }: RightBarItemProps) {
  return (
    <div className="flex mt-4">
      <Images
        fallBack={`${image?.similarFilmFallBack}`}
        className="w-[80px] h-[120px] rounded-xl mr-3"
        src={`${config.api.IMG_API}${data?.poster_path}`}
        alt=""
      />
      <div className="flex flex-col justify-between">
        <div>
          <Link
            to={`/movie/${data?.id}`}
            className="font-semibold mt-1 block text-textPrimary"
          >
            {data?.title}
          </Link>
          {/* <span className="text-[#a2a2be]"> Action, Horror</span> */}
        </div>
        <div className="flex items-center">
          <div className="font-bold text-black bg-[#f5c518] py-1 px-2  flex justify-center items-center rounded-xl">
            IMDb
          </div>
          <span className="text-[#a2a2be] ml-2  font-bold">
            {String(data?.vote_average).slice(0, 3)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RightBarItem;
