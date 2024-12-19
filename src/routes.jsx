import App from "./App/App";
import ErrorPage from "./assets/errorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
];

export default routes;