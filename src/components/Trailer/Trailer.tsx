import { Fragment } from "react";
import { useEffect, useState } from "react";
import SkeletonItem from "../Skeleton/Skeleton";
import ReactPlayer from "react-player";
import { getTrailer } from "../../apiServices/apiServices";
interface TrailerProps {
  id?: string
}
function Trailer({ id = ""}: TrailerProps) {
  const [trailer, setTrailer] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getTrailer(id)
        .then((res) => {
          setTrailer(res.slice(0, 3));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [id]);
  return (
    // khi an vao video trailer se hien ra modal
    <div className="mt-10">
      <h3 className="text-white font-bold text-xl mb-8">Trailer</h3>

      <div className="flex gap-4">
        {trailer?.map((item: Record<string, any>, index) => {
          return (
            <Fragment key={index}>
              {isLoading ? (
                <SkeletonItem className={"w-[270px] h-[150px]"} />
              ) : (
                <ReactPlayer
                  className="!max-w-[33%]"
                  url={`https://www.youtube.com/watch?v=${item.key}`}
                  width="100%"
                  height="100%"
                  controls={true}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Trailer;
