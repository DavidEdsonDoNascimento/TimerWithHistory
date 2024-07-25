import { Routes, Route } from "react-router-dom";
import { Home, History } from "./pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};
