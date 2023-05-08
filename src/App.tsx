import { Fragment, ReactElement } from "react";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import publicRoutes from "./routes/routes";
import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-bgPrimary h-full bg-full">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Component = route.component;
            // if (!route.component) {
            //   component = <ErrorPage />;
            // }
            
            let Layout: React.ComponentType<any> = DefaultLayout;
            if (route.layout === null) {
              Layout = Fragment;
            }

            return (  
              <Route
                key={index}
                path={route.path}
                element={<Layout >{<Component/>}</Layout>}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
