import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/AuthProvider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Spinner from '../../components/Spinner/Spinner';
import Images from '../../components/Images/Images';
import { CloseIcon } from '../../components/Icon/Icon';
import image from '../../assets/img/img';
import config from '../../config';
import "./MyFavouritePage.module.scss";
export interface MyFavouritePageProps {
}

export default function MyFavouritePage (props: MyFavouritePageProps) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const user = useContext(UserContext);
  const [favourite, setFavourite] = useState([]);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getDoc(doc(db, "favourite", `${user?.uid}`))
        .then((data) => {
          setFavourite(data.data()?.favourite);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [id, user]);
  useEffect(() => {
    if (deleted && user) {
      setDoc(doc(db, "favourite", `${user?.uid}`), { favourite });
      setDeleted(false);
    }
    return () => {};
  }, [favourite]);
  const handleDelete = (item: Record<string, any>): void => {
    const favouriteNew = favourite.filter((favouriteItem: Record<string, any>): boolean => {
      return favouriteItem.id !== item.id;
    });
    setFavourite(favouriteNew);
    setDoc(doc(db, "favourite", `${user?.uid}`), { favourite });
    if (deleted) {
      setDeleted(false);
    } else setDeleted(true);
  };
  return (
    <div className="mt-[12px] w-full ">
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex relative w-full flex-wrap">
          {favourite?.map((item: Record<string, any>, index): ReactNode => {
            return (
              <div className="max-w-[25%] w-[25%] flex flex-col items-center mt-6 ">
                <Link
                  className="flex flex-col items-center overflow-hidden relative hover:scale-105 hover:brightness-110 transition duration-300"
                  key={index}
                  to={`/movie/${item?.id}`}
                >
                  <Images
                    fallBack={image?.similarFilmFallBack}
                    className="w-[180px] h-[270px] rounded-xl "
                    src={`${config.api.IMG_API}${item?.poster_path}`}
                    alt=""
                  />
                  <p className="text-center font-semibold text-lg text-textPrimary text-ellipsis  line-clamp-1">
                    {item?.title}
                  </p>
                </Link>

                <div
                  onClick={() => handleDelete(item)}
                  className="cursor-pointer  items-center px-2 py-1 top-2 mt-2 rounded-2xl bg-[#5985FF] text-[white] delete-btn"
                >
                  <CloseIcon className={"h-4 w-4 "} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}