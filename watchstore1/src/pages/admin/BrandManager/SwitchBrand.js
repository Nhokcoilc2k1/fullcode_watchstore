import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { apiGetSingleBrand, apiUpdateStatusBrand } from '~/apis/brand';

function SwitchBrand({bid, render}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiGetSingleBrand(bid)
      if(response.success){
          setChecked(response.brand.status)
      }
    }
    fetchApi();
  },[bid])

  const handleChange = async(checked) => {
    setChecked(checked);
    const response = await apiUpdateStatusBrand(bid, {status: checked});
    if(response.success){
      render()
    }
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

export default SwitchBrand;
