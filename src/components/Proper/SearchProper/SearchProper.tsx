import { Link } from "react-router-dom";
import SearchItem from "./SearchItem";
import PropTypes from "prop-types";

interface SearchProperProps {
  data?: [],
  title: string,
  onClear: () => void
  q: string
}
function SearchProper({ data, title, onClear, q }: SearchProperProps) {
  return (
    <div>
      <h4 className="text-[16px] font-semibold py-1 px-3">{title}</h4>

      {data?.slice(0, 5).map((item, index) => {
        return (
          <SearchItem onHidden={onClear} key={index} item={item}></SearchItem>
        );
      })}

      <Link
        className="text-[red] py-1 px-3 flex justify-center text-[16px] 
        hover:bg-[#eae7e7] transition duration-100 ease-linear delay-150
         hover:transition hover:ease-linear hover:duration-100 hover:delay-150"
        to={`/search/${q}`}
        onClick={onClear}
      >
        More
      </Link>
    </div>
  );
}

export default SearchProper;
