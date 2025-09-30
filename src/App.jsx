import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FondosPage from "./pages/FondosPage.jsx";


export default function App()
{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FondosPage />} />
      </Routes>
    </Router>
  );
}
