import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import MovieList from '../../components/MovieList/MovieList';


 function HomePage () {
  useEffect(() => {
    document.title = "CFilm";
  }, []);

  return (
    <div className="w-full pb-6 bg-bgPrimary">
      <div className="mx-8 mt-6">
        <div className="w-full relative h-[400px] ">
          <Banner />
        </div>
        <div className="relative h-[400px] mt-7">
          <MovieList path={"now_playing"} title={"Now Playing"} />
        </div>
        <div className="relative h-[400px] mt-7">
          <MovieList path={"top_rated"} title={"Top Rated"} />
        </div>
        <div className="relative h-[400px] mt-7">
          <MovieList path={"upcoming"} title={"Up Coming"} />
        </div>
      </div>
  </div>
  );
}
export default  HomePage

