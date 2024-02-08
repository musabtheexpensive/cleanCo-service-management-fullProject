import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../page/About";
import Contact from "../page/Contact";
import Login from "../page/Login";
import Register from "../page/Register";
import AdminLayout from "../components/layout/AdminLayOut";
import AddServices from "../page/AddServices";
import Home from "../page/Home";
import Services from "../page/Services";
import PrivateRoute from "./PrivateRoute";
import Booking from "../page/Booking";
import Profile from "../page/Profile";
import TrackOrder from "../page/TrackOrder";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "services",
        element: (
          <PrivateRoute>
            <Services />
          </PrivateRoute>
        ),
      },
      {
        path: 'booking/:id',
        element: <Booking />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: '/user',
    element: <App />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: 'orders',
        element: <TrackOrder />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AddServices />,
      },
    ],
  },
]);
export default routes;
