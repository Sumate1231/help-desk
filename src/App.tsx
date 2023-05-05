import { Navigate, Outlet, Route, Routes, useRoutes } from "react-router-dom";
import Login from "./Auth/Login";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import CreateHelpDesk from "./Pages/CreateHelpDesk";
import ErrorLayout from "./Pages/Errors/ErrorLayout";
import { Page404 } from "./Pages/Errors/Page404";
import ReportHelpDesk from "./Pages/ReportHelpDesk";
import CreateForm from "./Pages/CreateUpdate/CreateForm";
import "react-dropzone-uploader/dist/styles.css";
import BranchList from "./Auth/BranchList";
import Profiles from "./Auth/Profiles";
// import { User } from "./Types/auth/userType";

export const ProtectedRoute = ({ children }: any) => {
  const auth = JSON.parse(localStorage.getItem("auth") as any);

  if (!auth.is_auth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const ProtectedRouteBranch = ({ children }: any) => {
  const user = JSON.parse(localStorage.getItem("user") as any);

  if (user.change_branch_code !== "1") {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "home", element: <Home /> },
        { path: "create", element: <CreateHelpDesk /> },
        { path: "report", element: <ReportHelpDesk /> },
        { path: "add", element: <CreateForm /> },
        { path: "profiles", element: <Profiles /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "branch",
      element: (
        <ProtectedRouteBranch>
          <BranchList />
        </ProtectedRouteBranch>
      ),
    },
    {
      element: <ErrorLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};

export default App;
