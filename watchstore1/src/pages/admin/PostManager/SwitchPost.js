import React, { useState } from 'react';
import Switch from 'react-switch';
import { apiUpdateStatusBrand } from '~/apis/brand';

function SwitchPost({data}) {
  const [checked, setChecked] = useState(data.status);

  const handleChange = async(checked) => {
    setChecked(checked);
    const response = await apiUpdateStatusBrand(data._id, {status: checked});
  };

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

export default SwitchPost;
