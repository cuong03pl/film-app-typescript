import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGenresFilm } from '../../apiServices/apiServices';
import SearchResult from '../../components/SearchResult/SearchResult';
import Paginate from '../../components/Paginate/Paginate';

export interface GenresPageProps {
}

export default function GenresPage (props: GenresPageProps) {
  const [movies, setMovies] = useState<[]>([]);
  const { id }: any = useParams();
  const { name } = useParams();
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  React.useEffect(() => {
    const fetchApi = async () => {
      await getGenresFilm(id, page)
        .then((res) => {
          setMovies(res.results);
          {
            res.total_pages > 500 && setPages(500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [id, page]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    document.title = `Film ${name}`;
  });

  const handlePageClick = (event: Record<string, any>) => {
    setPage(event.selected + 1);
  };
  return (
    <>
      <div className="w-full px-5">
        <div className="flex flex-wrap  w-full mt-6 ">
          {<SearchResult data={movies} />}
        </div>
        <Paginate pageCount={pages} handlePageClick={handlePageClick} />
      </div>
    </>
  );
}
