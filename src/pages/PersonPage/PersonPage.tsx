import React, { useEffect, useState } from 'react';
import Images from '../../components/Images/Images';
import config from '../../config';
import image from '../../assets/img/img';
import Spinner from '../../components/Spinner/Spinner';
import { getMoviesParticipated, getPerson } from '../../apiServices/apiServices';
import { useParams } from 'react-router-dom';
import SearchResult from '../../components/SearchResult/SearchResult';

export interface PersonPageProps {
}

export default function PersonPage (props: PersonPageProps) {
  const { id } = useParams<{id?: string}>();
  const [person, setPerson] = React.useState<Record<string, any>>({});
  const [moviesParticipated, setMoviesParticipated] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      await getPerson(id)
        .then((res) => {
          setPerson(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);
  }, [id]);
  React.useEffect(() => {
    const fetchApi = async () => {
      await getMoviesParticipated(id)
        .then((res) => {
          setMoviesParticipated(res.cast);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
    return () => {};
  }, [id]);
  React.useEffect(() => {
    if (person.name) {
      document.title = `${person.name}`;
    } else {
      document.title = "CFilm";
    }
    return () => {};
  }, [person.name]);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className=" mt-[40px] px-[10px] w-full">
            <div className="flex">
              <div className="text-textPrimary">
                <Images
                  fallBack={`${image?.similarFilmFallBack}`}
                  className="min-w-[300px] w-[300px] object-cover "
                  src={`${config.api.IMG_API}${person.profile_path}`}
                  alt=""
                />
              </div>
              <div className="text-textPrimary ml-[20px] w-full">
                <h1 className="text-[40px] mb-[24px] font-[600]">
                  {person.name}
                </h1>

                <div>
                  <h3 className="mb-[32px] text-[20px] font-[600 mt-[20px]">
                    Thông tin cá nhân
                  </h3>

                  <div className="mb-[20px]">
                    <p className="font-[600]">Nghề nghiệp</p>
                    <p className="text-[#b5b5b5]">
                      {person.known_for_department}
                    </p>
                  </div>
                  <div className="mb-[20px]">
                    <p className="font-[600]">Giới tính</p>
                    <p className="text-[#b5b5b5]">
                      {person.gender === 2 ? "Nam" : "Nữ"}
                    </p>
                  </div>
                  <div className="mb-[20px]">
                    <p className="font-[600]">Ngày sinh</p>
                    <p className="text-[#b5b5b5]">{person.birthday}</p>
                  </div>

                  <div className="mb-[20px]">
                    <p className="font-[600]">Nơi sinh</p>
                    <p className="text-[#b5b5b5]">{person.place_of_birth}</p>
                  </div>
                </div>

                <h4 className="text-[20px]  mb-[24px] font-[600]">Tiểu sử</h4>
                <p className="text-[#b5b5b5]">{person.biography}</p>
              </div>
            </div>
            <div className="mt-5 ">
              <h3 className="text-textPrimary text-[20px] font-[600]">
                Phim đã tham gia
              </h3>
              <SearchResult skeleton={false} data={moviesParticipated} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
