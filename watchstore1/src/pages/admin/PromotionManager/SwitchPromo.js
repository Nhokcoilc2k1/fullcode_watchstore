import React, {  memo, useEffect, useState } from 'react';
import Switch from 'react-switch';
import { apiGetSinglePromotion, apiUpdateStatusPromotion } from '~/apis/promotion';

function SwitchPromo({proid, render}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiGetSinglePromotion(proid)
      if(response.success){
          setChecked(response.promotion.status)
      }
    }
    fetchApi();
  }, [proid])

  const handleChange = async(checked) => {
    setChecked(checked);
    const response = await apiUpdateStatusPromotion(proid, {status: checked});
    if(response.success){
        render();
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

export default memo(SwitchPromo);
