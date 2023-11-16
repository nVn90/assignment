import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import FilteredPage from "../pages/FilteredPage";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainRouter = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const localStorageData = JSON.parse(localStorage.getItem("used"));
  useEffect(() => {
    console.log(location.pathname.includes("used"))
    if (location.pathname.includes("used")) {
      let comb = "";
      const values = Object.values(localStorageData);
      values.forEach((ele) => {
        comb = comb + "-" + ele;
      });
      navigate(navigate(`/used${comb}`, { state: localStorageData }));
    }
  }, []);

  return (
    <div className="mainRouter">
      {/* <Header /> */}
      <Sidebar />
      <Routes>
        <Route path={"/:used"} element={<FilteredPage />} />
      </Routes>
    </div>
  );
};

export default MainRouter;
