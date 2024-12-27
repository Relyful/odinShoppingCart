import App from "./modules/App/App";
import ErrorPage from "./modules/ErrorPage/ErrorPage";
import Shop from "./modules/Shop/Shop";


const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
];

export default routes;