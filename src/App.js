import "./App.css";
import Form from "./components/Form/Form";
import { Routes, Route } from "react-router-dom";
import FormData from "./components/FormData/FormData";

function App() {
  return (
    <Routes>
      <Route path="/form" element={<Form />} />
      <Route path="/data" element={<FormData />} />
      <Route path="/" element={<Form />} />
    </Routes>
  );
}

export default App;
