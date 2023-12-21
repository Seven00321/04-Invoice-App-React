import React from "react";
import PropTypes from "prop-types";

export const CompanyView = ({title, company}) => {
  return (
    <>
      <h2>{title}</h2>
      
      <ul className="list-group">
        <li className="list-group-item active">Compañia: {company.name}</li>
        <li className="list-group-item">
          Nro Fiscalia: {company.fiscalNumber}
        </li>
      </ul>
    </>
  )
  
  CompanyView.propTypes =  {
    title: PropTypes.string.isRequired,
    company: PropTypes.object.isRequired,
  }
};
