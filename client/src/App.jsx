import { Toaster } from "react-hot-toast";
import "./App.css";
import { AppProvider } from "./context/appContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ragister from "./pages/Register";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Layout />
              </ProtectedRoutes>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="register" element={<Ragister />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AppProvider>
  );
}

export default App;
