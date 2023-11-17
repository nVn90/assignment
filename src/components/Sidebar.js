import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ values, setValues }) => {
  const navigate = useNavigate();
  console.log(values);
  const [carParams, setCarParams] = useState({});
  const [path, setPath] = useState("");
  let comb = "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarParams({ ...carParams, [name]: value });
  };

  // on refresh the page
  useEffect(() => {
    if (values) setCarParams(values);
  }, []);

  useEffect(() => {
    const val = Object.values(carParams);
    val.forEach((ele) => {
      comb = comb + "-" + ele;
    });

    setPath(`/used${comb}`);
    setValues(carParams);
    navigate(`/used${comb}`, { state: carParams });
  }, [carParams]);

  const clearFilter = () => {
    setCarParams({});
  };

  return (
    <div className="filters">
      <div className="btn-group">
        <button className="btn btn-custom" onClick={clearFilter}>
          Clear All Filters
        </button>
      </div>
      <div className="filterList scrollBar">
        <div className="caterogy-wrapper">
          <h4> Make</h4>
          <div className="inputWrapper">
            <label>
              <input
                type="radio"
                name="make"
                value={"maruti"}
                checked={values?.make == "maruti"}
                onChange={handleChange}
              />
              Maruti
            </label>
            <label>
              <input
                type="radio"
                name="make"
                value={"hyundai"}
                checked={values?.make == "hyundai"}
                onChange={handleChange}
              />
              Hyundai
            </label>
          </div>
        </div>

        <div className="caterogy-wrapper">
          <h4> Color</h4>
          <div className="inputWrapper">
            <label>
              <input
                type="radio"
                name="color"
                value={"black"}
                onChange={handleChange}
                checked={values?.color == "black"}
              />
              Black
            </label>
            <label>
              <input
                type="radio"
                name="color"
                value={"red"}
                onChange={handleChange}
                checked={values?.color == "red"}
              />
              Red
            </label>
            <label>
              <input
                type="radio"
                name="color"
                value={"gray"}
                onChange={handleChange}
                checked={values?.color == "gray"}
              />
              Gray
            </label>
            <label>
              <input
                type="radio"
                name="color"
                value={"blue"}
                onChange={handleChange}
                checked={values?.color == "blue"}
              />
              Blue
            </label>
          </div>
        </div>

        <div className="caterogy-wrapper">
          <h4> Fuel Type</h4>
          <div className="inputWrapper">
            <label>
              <input
                type="radio"
                name="fuelType"
                value={"petrol"}
                onChange={handleChange}
                checked={values?.fuelType == "petrol"}
              />
              Petrol
            </label>
            <label>
              <input
                type="radio"
                name="fuelType"
                value={"cng"}
                onChange={handleChange}
                checked={values?.fuelType == "cng"}
              />
              CNG
            </label>
          </div>
        </div>

        <div className="caterogy-wrapper">
          <h4> Price Range</h4>
          <div className="inputWrapper">
            <label>
              <input
                type="radio"
                name="priceRange"
                value={"1l-2l"}
                onChange={handleChange}
                checked={values?.priceRange == "1l-2l"}
              />
              1L-4L
            </label>
            <label>
              <input
                type="radio"
                name="priceRange"
                value={"4l-10l"}
                onChange={handleChange}
                checked={values?.priceRange == "4l-10l"}
              />
              4L-10L
            </label>
          </div>
        </div>

        <div className="caterogy-wrapper">
          <h4> Year </h4>
          <div className="inputWrapper">
            <label>
              <input
                type="radio"
                name="yearRange"
                value={"2010"}
                onChange={handleChange}
                checked={values?.yearRange == "2010"}
              />
              2010
            </label>
            <label>
              <input
                type="radio"
                name="yearRange"
                value={"2011"}
                onChange={handleChange}
                checked={values?.yearRange == "2011"}
              />
              2011
            </label>
            <label>
              <input
                type="radio"
                name="yearRange"
                value={"2012"}
                onChange={handleChange}
                checked={values?.yearRange == "2012"}
              />
              2012
            </label>
          </div>
        </div>

        <div className="caterogy-wrapper">
          <h4> Location</h4>
          <div className="inputWrapper">
            <label>
              <input
                type="radio"
                name="loc"
                value={"delhi-ncr"}
                onChange={handleChange}
                checked={values?.loc == "delhi-ncr"}
              />
              Delhi-NCR
            </label>
            <label>
              <input
                type="radio"
                name="loc"
                value={"uttar-pradesh"}
                onChange={handleChange}
                checked={values?.loc == "uttar-pradesh"}
              />
              Uttar Pradesh
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
