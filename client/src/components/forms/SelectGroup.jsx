import { useState } from 'react';

const SelectGroup = ({ options, onUpdate }) => {
  const [selected, setSelected] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSelected(value);
    onUpdate(value);
  };

  return (
    <select
      className="eb-form__input"
      value={selected}
      onChange={handleInputChange}
    >
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
