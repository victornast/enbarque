//import './SelectGroup.scss';
import { useState } from "react";

const SelectGroup = ({ options, onUpdate }) => {
  const [selected, setSelected] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSelected(value);
    onUpdate(value);
  };

  return (
    <select value={selected} onChange={handleInputChange}>
      <option disabled></option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectGroup;
