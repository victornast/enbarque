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
      {options.map((option) => (
        <option key={option.name} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectGroup;
