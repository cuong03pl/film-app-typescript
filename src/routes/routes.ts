
import config from "../config";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import GenresPage from "../pages/GenresPage/GenresPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import MyFavouritePage from "../pages/MyFavouritePage/MyFavouritePage";
import PersonPage from "../pages/PersonPage/PersonPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import WatchPage from "../pages/WatchPage/WatchPage";
interface publicRoutes {
    path: string;
    component: React.ComponentType<any>;
    layout?: null;
    watch?: boolean;
}

const publicRoutes: publicRoutes[] = [
  {
    path: config.routes.home,
    component: HomePage ,
  },
  {
    path: config.routes.login,
    component: LoginPage ,
    layout: null,
  },
  {
    path: config.routes.search,
    component: SearchPage,
  },
  {
    path: config.routes.watch,
    component: WatchPage ,
    watch: true,
  },
  {
    path: config.routes.movie,
    component: MovieDetailPage ,
  },
  {
    path: config.routes.genres,
    component: GenresPage ,
  },
  {
    path: config.routes.person,
    component: PersonPage ,
  },

  {
    path: config.routes.myfavourite,
    component: MyFavouritePage ,
  },
  {
    path: config.routes.profile,
    component: ProfilePage ,
  },
  {
    path: config.routes.error,
    component: ErrorPage ,
    layout: null,
  },
];

export default publicRoutes;
