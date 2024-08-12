import { Routes, Route } from "react-router-dom";
import { Home, History, Repos } from "./pages";
import { DefaultLayout } from "./layouts/DefaultLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/d" element={<Repos />} />
      </Route>
    </Routes>
  );
};
