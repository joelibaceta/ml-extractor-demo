import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Title } from "./components";
import { HomePage, ResultsPage } from "./pages";
import "./App.css";

function App() {
  if (!localStorage.getItem("results")) {
    localStorage.setItem("results", JSON.stringify([[], []]));
    localStorage.setItem("percentage", 0);
  }

  return (
    <div className="container">
      <Router>
        <Title />
        <div className="extractor_input_output-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resultados" element={<ResultsPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
