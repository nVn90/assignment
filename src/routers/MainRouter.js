import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import FilteredPage from "../pages/FilteredPage";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const localStorageData = JSON.parse(localStorage.getItem("used"));
  const [values, setValues] = useState({});
  const [data, setData] = useState(null);
  const [finalData, setFinalData] = useState([]);

  const params = location?.pathname;
  // console.log(location?.pathname);

  let obj = {};

  const fetchData = async () => {
    const res = await fetch("data/data.json");
    const json = await res.json();
    json.cars.forEach((ele) => {
      Object.keys(ele).forEach((i) => {
        if (obj.hasOwnProperty(i)) {
          obj[i].push(ele[i]);
        } else {
          obj[i] = [ele[i]];
        }
      });
    });
    // console.log(obj);
    if (params) {
      let objToReplaced = {};
      let split = params?.split("-");
      Object.entries(obj)?.forEach(([key, val]) => {
        split?.forEach((item) => {
          if (val.includes(item)) objToReplaced[key] = item;
          else return;
        });
      });
      setValues(objToReplaced);
    }
    return json.cars;
  };

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);

  // useEffect(() => {
  //   // let localStorageData = JSON.parse(localStorage.getItem("used"));
  //   // let objToReplaced = {};

  //   // if (localStorageData) setValues(localStorageData);
  //   // else
  //   if (location.state) setValues(location.state);
  //   else setValues(null);
  // }, [location]);

  const filterData = (whole) => {
    let filtered = whole?.filter(
      (ele) =>
        Object.entries(ele).filter(([key, val]) => values[key] == val)
          .length === Object.entries(values).length
    );
    return filtered;
  };

  useEffect(() => {
    // console.log(location.pathname.includes("used"));
    if (location.pathname.includes("used")) {
      let comb = "";
      const val = Object.values(values);
      val.forEach((ele) => {
        comb = comb + "-" + ele;
      });
      navigate(navigate(`/used${comb}`, { state: values }));
    }
  }, [values]);

  useEffect(() => {
    let final = filterData(data);
    setFinalData(final);
  }, [values]);

  return (
    <div className="mainRouter">
      {/* <Header /> */}
      {<Sidebar values={values} setValues={setValues} />}
      <Routes>
        <Route
          path={"/:used"}
          element={
            values &&
            finalData && <FilteredPage values={values} filterData={finalData} />
          }
        />
      </Routes>
    </div>
  );
};

export default MainRouter;
