import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ServerForm from "./pages/ServerForm";
import ApplicationForm from "./pages/ApplicationForm";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/server" element={<ServerForm />} />
        <Route path="/application" element={<ApplicationForm />} />
      </Routes>
    </Router>
  );
}

export default Main;
