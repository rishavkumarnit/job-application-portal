import { useState } from "react";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from "react";
import Profile from "./components/Profile";
import { store } from "./components/slices/store";
import { Provider } from "react-redux";
import Apply from "./components/Apply"
import Applications from "./components/Applications";
import Application from "./components/Application";
// eslint-disable-next-line react-refresh/only-export-components
export const User = createContext();
import Job from "./components/Job";

function App() {
  const [profile, setProfile] = useState({
    userName: "Profile",
    email: "",
    address: "",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/job/:id",
      element: <Job />,
    },
    {
      path: "/apply/:id",
      element: <Apply />,
    },
    {
      path: "/applications",
      element: <Applications />,
    },
    {
      path: "/applications/:id",
      element: <Application />,
    },
    { path: "/profile", element: <Profile /> },
  ]);

  return (
    <>
      <Provider store={store}>
        <User.Provider value={{ profile, setProfile }}>
          <RouterProvider router={router} />
        </User.Provider>
      </Provider>
    </>
  );
}

export default App;
