import config from "../config";
import { get } from "../utils/request";



export const search = async (query?: string, page?: number) => {
  const res = await get("search/movie", {
    params: {
      query,
      api_key: config.api.API_KEY,
      page
    },
  });
  return res.data;
};
export const getMovieRightBar = async (path: string) => {
  const res = await get(path, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return res.data.results;
};
export const getFilmHomePage = async (path: string) => {
  const dataMovie = await get(path, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return dataMovie.data.results;
};
export const getCast = async (path: string) => {
  const dataMovie = await get(path, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return dataMovie.data;
};

export const getMovieDetails = async (id?: string) => {
  const dataMovie = await get(`movie/${id}`, {
    params: {
      api_key: config.api.API_KEY,
    },
  });

  return dataMovie.data;
};

export const getSimilarFilm = async (id: string) => {
  const dataMovie = await get(`movie/${id}/similar`, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return dataMovie.data.results;
};

export const getGenresFilm = async (id: string, page: number) => {
  const dataMovie = await get(`discover/movie`, {
    params: {
      with_genres: id,
      api_key: config.api.API_KEY,
      page,
    },
  });
  return dataMovie.data;
};

export const getPerson = async (id?: string) => {
  const dataMovie = await get(`person/${id}`, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return dataMovie.data;
};
export const getMoviesParticipated = async (id?: string) => {
  const dataMovie = await get(`person/${id}/movie_credits`, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return dataMovie.data;
};

export const getReviews = async (id: string) => {
  const dataMovie = await get(`movie/${id}/reviews`, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return dataMovie.data.results;
};

export const getEpisode = async (id: string) => {
  const dataMovie = await get(`movie/${id}/lists`, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return dataMovie.data.results;
};

export const getTrailer = async (id: string) => {
  const dataMovie = await get(`movie/${id}/videos`, {
    params: {
      api_key: config.api.API_KEY,
    },
  });
  return dataMovie.data.results;
};
