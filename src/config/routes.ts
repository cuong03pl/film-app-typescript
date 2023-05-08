interface route {
  home: string,
  search: string,
  login: string,
  watch: string,
  movie: string,
  genres: string,
  person: string,
  history: string,
  myfavourite: string,
  profile: string,
  error: string,
}

const routes: route = {
    home: "/",
    search: "/search/:q",
    login: "/login",
    watch: "/watch/:id",
    movie: "/movie/:id",
    genres: "/genres/:id/:name",
    person: "/person/:id",
    history: "/history",
    myfavourite: "/myfavourite",
    profile: "/profile",
    error: "*",
  };
  export default routes;
  