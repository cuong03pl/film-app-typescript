import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/AuthProvider';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../apiServices/apiServices';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Spinner from '../../components/Spinner/Spinner';
import config from '../../config';
import Images from '../../components/Images/Images';
import image from '../../assets/img/img';
import Button from '../../components/Button/Button';
import { PlayIcon } from '../../components/Icon/Icon';
import FilmDetails from '../../components/FilmDetails/FilmDetails';
import Cast from '../../components/Cast/Cast';
import Trailer from '../../components/Trailer/Trailer';
import SimilarFilm from '../../components/SimilarFilm/SimilarFilm';

export interface MovieDetailPageProps {
}
interface RouteParams {
  id: string;
}
export default function MovieDetailPage (props: MovieDetailPageProps) {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { id }= useParams<{id?: string}>();
  const [data, setData] = useState<Record<string, any>>({});
  const [favourite, setFavourite] = useState<Array<Record<string, any>>>([]);
  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (data.title) {
      document.title = `${data.title}`;
    } else {
      document.title = "CFilm";
    }
    return () => {};
  }, [id, data.title]);
  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      
      await getMovieDetails(id)
        .then((res) => {
          setData(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [id]);
  // xu ly

  // lay film favourite trong firestore
  useEffect(() => {
    const fetchApi = async () => {
      await getDoc(doc(db, "favourite", `${user?.uid}`))
        .then((res: Record<string, any>) => {
          res?.data() && setFavourite(res?.data().favourite);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
    return () => {};
  }, [data, check, id]);

  // sau khi an button yeu thich se duoc add vao danh sach
  useEffect(() => {
    if (check && user) {
      setDoc(doc(db, "favourite", `${user?.uid}`), { favourite });
    }
    return () => {};
  }, [check, id]);
  useEffect(() => {
    const added = favourite?.some((value: Record<string, any>) => {
      return value?.id === data?.id;
    });
    if (added) {
      setSelected(true);
    } else {
      setSelected(false);
    }
    return () => {};
  }, [data, id, check, favourite]);

  // thuc hien add film vao favourite
  const handleAddFavourite = () => {
    if (favourite) {
      // check xem film da them vao danh sach favourite chua
      const added = favourite?.some((value: Record<string, any>) => {
        return value.id === data.id;
      });
      // neu film da them roi thi khong them lai
      const favouriteNew = favourite?.filter((value: Record<string, any>, index) => {
       
        return value.id !== data.id;
      });
      setFavourite(favouriteNew);
      !added
        ? setFavourite((pre ) => [...pre, data])
        : setDoc(doc(db, "favourite", `${user?.uid}`), { favourite });
    }

    if (check) {
      setCheck(false);
    } else setCheck(true);
  };

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div>
          <div className="relative">
            <div
              className="h-[400px] bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: `url(${config.api.ORIGINAL_IMG}${data.backdrop_path})`,
              }}
            />
          </div>

          <div className=" bg-[#06121E] w-full px-5 py-8">
            <div className="flex">
              <div className="mr-4">
                <Images
                  fallBack={`${image?.similarFilmFallBack}`}
                  className="min-w-[300px] object-cover mb-8"
                  src={`${config.api.IMG_API}${data.poster_path}`}
                  alt=""
                />

                <Button
                  watchBtn
                  to={`/watch/${data.id}`}
                  leftIcon={<PlayIcon className={"h-5 w-5"} />}
                >
                  Xem Phim
                </Button>
              </div>

              <FilmDetails
                onClick={handleAddFavourite}
                id={id}
                favourite
                check={selected}
                movieDetailPage
              />
            </div>
            {/* dien vien */}
            <Cast id={id} />
            <Trailer id={id} />
            {/* phim tuong tu */}
            <SimilarFilm id={id} />
            {/* cmt */}
          </div>
        </div>
      )}
    </>
  );
}
