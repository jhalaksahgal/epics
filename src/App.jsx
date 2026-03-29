import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Configuration from "./pages/Configuration";
import LiveMonitor from "./pages/LiveMonitor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/live-monitor" element={<LiveMonitor />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;