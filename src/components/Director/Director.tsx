import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import SkeletonItem from "../Skeleton/Skeleton";
import { Fragment } from "react";
import { getCast } from "../../apiServices/apiServices";
interface DirectorProps {
  id?: string
}
function Director({ id }: DirectorProps) {
  const [director, setDirector] = useState<[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      await getCast(`movie/${id}/credits`)
        .then((data: Record<string, any>) => {
          setDirector(
            data.crew.filter(
              (item: Record<string, any>) => item?.known_for_department === "Directing"
            )
          );
        })
        .catch((error: Record<string, any>) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [id]);
  return (
    <div className="flex ">
      <span className="w-[120px] min-w-[120px] block text-[#7a7a7a] ">
        ĐẠO DIỄN:
      </span>
      <div className="flex flex-wrap">
        {director.map((item: Record<string, any>, index) => {
          return (
            <Fragment key={index}>
              <Link
                to={`/person/${item?.id}`}
                className="font-bold hover:underline cursor-pointer text-[#dbdbdb] mr-3"
              >
                {item.name}
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Director;
