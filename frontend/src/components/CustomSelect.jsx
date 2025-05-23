import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectItem,
} from './ui/select'; // Update path based on your project structure

const CustomSelect = ({ field, options, placeholder, hasSuccess, error }) => {
  return (
    <Select
    className=""
      // Ensures the Select component receives a string value,
      // converting booleans or other types as needed.
      value={
        field.value === true
          ? 'true'
          : field.value === false
          ? 'false'
          : field.value?.toString() || ''
      }
      onValueChange={(value) => {
        let parsedValue;
        // Converts the string value from the Select back to its original type (boolean or string).
        if (value === 'true') {
          parsedValue = true;
        } else if (value === 'false') {
          parsedValue = false;
        } else {
          parsedValue = value; // Keep as string for non-boolean values.
        }
        field.onChange(parsedValue); // Updates react-hook-form's field value.
        field.onBlur(); // Manually triggers validation to update form state.
      }}
    >
      <SelectTrigger
        className={`!h-[48px] px-3 py-4 w-full  ${
          hasSuccess ? "bg-input-sucess border-input-sucess" : "bg-gray-200"
        } ${error ? "bg-red-200 border-red-500" : ""}`}
      >
        <SelectValue placeholder={placeholder || 'Select'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className=" flex flex-col gap-1 bg-white">
             {options.map((option) => (
          // Ensures the key and value for SelectItem are strings, as required by React and the component.
          <SelectItem key={option.value?.toString()} value={option?.value?.toString()} className=" hover:bg-gray-300 ">
            {option.name}
          </SelectItem>
        ))}
        </SelectGroup>
     
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;