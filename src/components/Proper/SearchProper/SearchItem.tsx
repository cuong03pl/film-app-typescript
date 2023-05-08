import { Link } from "react-router-dom";
import Images from "../../Images/Images";
import image from "../../../assets/img/img";
import config from "../../../config";

interface SearchItemProps {
  item: Record<string, any>
  onHidden: () => void
}

function SearchItem({ item, onHidden }: SearchItemProps) {
  return (
    <Link
      onClick={onHidden}
      to={`/movie/${item?.id}`}
      className={"flex hover:bg-[#16182308] py-2 px-3 cursor-pointer"}
    >
      <Images
        fallBack={`${image.similarFilmFallBack}`}
        className={"h-[36px] w-[36px] rounded-[50%]"}
        alt=""
        src={
          item?.poster_path && `${config.api.ORIGINAL_IMG}${item?.poster_path}`
        }
      />
      <div className={"flex items-center ml-3"}>
        <span>{item?.title}</span>
      </div>
    </Link>
  );
}

export default SearchItem;
