import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Department from "./components/Department";
import Employee from "./components/Employee";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Department />} />
        <Route path="/employees" element={<Employee />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;