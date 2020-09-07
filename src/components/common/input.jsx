import React from "react";



//  input file is all about destructing the username and password form from bootstrap in to simple code this code came  from loginform 

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onchange}
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
