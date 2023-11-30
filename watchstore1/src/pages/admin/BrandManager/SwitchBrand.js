import React, { useState } from 'react';
import Switch from 'react-switch';
import { apiUpdateStatusBrand } from '~/apis/brand';

function SwitchBrand({bid, status, render}) {
  const [checked, setChecked] = useState(status);

  const handleChange = async(checked) => {
    setChecked(checked);
    const response = await apiUpdateStatusBrand(bid, {status: checked});
    if(response.success){
        render();
    }
  };
  console.log(checked);

  return (
    <div>
      <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
    </div>
  );
}

export default SwitchBrand;
