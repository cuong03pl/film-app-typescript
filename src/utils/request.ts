import axios from "axios";

const request = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

// export const getMovieSearch = async (query) => {
//   const dataMovie = await request.get("search/movie", {
//     params: {
//       query,
//       api_key: config.api.API_KEY,
//     },
//   });

//   return dataMovie;
// };

export const get = async (path: string, params: any) => {
  const res = await request.get(path, params);
  return res;
};
