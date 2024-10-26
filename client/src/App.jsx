import "./App.css";
import { AppProvider } from "./context/appContext";
import Home from "./pages/Home";

function App() {
  // console.log(todoss);
  // console.log(useAppContext);

  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
