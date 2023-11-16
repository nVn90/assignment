import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FilteredPage = () => {
  const location = useLocation();
  const [values, setValues] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    let localStorageData = JSON.parse(localStorage.getItem("used"));
    if (localStorageData) setValues(localStorageData);
    else if (location.state) setValues(location.state);
    else setValues(null);
  }, [location]);

  const fetchData = async () => {
    const res = await fetch("data/data.json");
    const json = await res.json();
    return json.cars;
  };
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);

  const filterData = (whole) => {
    let filtered = whole?.filter(
      (ele) =>
        Object.entries(ele).filter(([key, val]) => values[key] == val)
          .length === Object.entries(values).length
    );
    return filtered;
  };

  return (
    <div className="filteredPage">
      {values && (
        <ul className="d-flex ul-custom">
          {Object.entries(values).map(([key, value], i) => {
            return (
              <li key={i} className="mr-3">
                {value}
              </li>
            );
          })}
        </ul>
      )}
      <div className="container-fluid">
        <div className="row">
          {filterData(data)?.length > 0 &&
            filterData(data).map((car, i) => {
              return (
                <div className="col-md-4" key={i}>
                  <div className="card">
                    <img src={car.imgSrc} className="img-fluid" />
                    <div className="card-content">
                      <h2>{car.name}</h2>
                      <p>{car.yearRange}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          {filterData(data)?.length === 0 && (
            <div className="container-fluid text-center">
              <p>No record found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredPage;
