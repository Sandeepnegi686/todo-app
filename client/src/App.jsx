import { Toaster } from "react-hot-toast";
import "./App.css";
import { AppProvider } from "./context/appContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ragister from "./pages/Register";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Ragister />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AppProvider>
  );
}

export default App;
