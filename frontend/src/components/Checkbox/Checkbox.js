import React from 'react';
import './Checkbox.scss';

export default function Checkbox ({ message }) {
  const handleCheckbox = () => {
    document.getElementById("checkbox-terms").checked = !document.getElementById("checkbox-terms").checked
  }
  return (
    <>
    <label htmlFor="checkbox" className="container-checkbox">
      {message}
      <input name="checkbox" className="checkbox" id="checkbox-terms" type="checkbox"/>
      <span onClick={handleCheckbox} className="checkmark"></span>
    </label>
    </>
  );
}

