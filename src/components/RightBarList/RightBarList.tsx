import { useEffect, useState } from "react";
import RightBarItem from "./RightBarItem";
import { getMovieRightBar } from "../../apiServices/apiServices";

interface RightBarListProps {
  path: string,
  title: string
}
function RightBarList({ path, title }: RightBarListProps) {
  const [favorite, setFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getMovieRightBar(path)
        .then((res) => {
          setFavorite(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, []);

  return (
    <div className="mt-10">
      <h3 className="font-bold text-xl text-textPrimary">{title}</h3>
      {favorite?.slice(0, 5).map((item, index) => {
        return <RightBarItem data={item} key={index} />;
      })}
    </div>
  );
}

export default RightBarList;
