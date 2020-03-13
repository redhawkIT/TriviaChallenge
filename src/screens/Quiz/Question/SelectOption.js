import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Select from '@material-ui/core/Select';

function SelectOption({
  label = '',
  helperText = '',
  name = '',
  menuItems = [],
  handleSelect,
  value = '',
}) {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  /**
   * Set label width on mount
   */
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select labelWidth={labelWidth} onChange={handleSelect} value={value}>
        <MenuItem value="">
          <em>{`Any ${name}`}</em>
        </MenuItem>
        {menuItems.map(item => (
          <MenuItem key={item.name} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

SelectOption.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired, // category, difficulty, type
  handleSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectOption;
