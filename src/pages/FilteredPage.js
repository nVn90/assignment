import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const FilteredPage = ({ values, filterData }) => {
  const location = useLocation();
  console.log(values, filterData);

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
          {filterData?.length > 0 &&
            filterData?.map((car, i) => {
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
          {filterData?.length === 0 && (
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
