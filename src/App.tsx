// src/App.tsx
import { BrowserRouter } from "react-router-dom";

// components
import Map from "./components/map/Map";

const App = () => {
  return (
    <BrowserRouter basename="/s-and-p-500-map">
      <Map />
    </BrowserRouter>
  );
};

export default App;
