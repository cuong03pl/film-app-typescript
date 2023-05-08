import { Link } from "react-router-dom";

import Images from "../Images/Images";
import PropTypes from "prop-types";
import SkeletonItem from "../Skeleton/Skeleton";
import image from "../../assets/img/img";
import config from "../../config";
interface CastItemProps {
  item: Record<string, any>
  isLoading: boolean
}
function CastItem({ item, isLoading }:CastItemProps) {
  return (
    <>
      {isLoading ? (
        <>
          <SkeletonItem className={"h-[120px] w-[120px] rounded-[50%]"} />
          <SkeletonItem className={"h-[28px] w-[100px] "} />
        </>
      ) : (
        <>
          <Link to={`/person/${item?.id}`}>
            <Images
              fallBack={image.actingFallBack}
              src={
                item?.profile_path !== null
                  ? `${config.api.IMG_API}${item?.profile_path}`
                  : ""
              }
              alt=""
              className="select-none h-[120px] w-[120px] object-cover rounded-[50%] cursor-pointer border-transparent border-solid border-[1px] hover:border-[#cc7b19f7] "
            />
          </Link>
          <Link
            to={""}
            className="text-[#dbdbdb] text-lg font-semibold text-center"
          >
            {item?.name}
          </Link>
        </>
      )}
    </>
  );
}
CastItem.propsType = {
  item: PropTypes.object,
};
export default CastItem;
