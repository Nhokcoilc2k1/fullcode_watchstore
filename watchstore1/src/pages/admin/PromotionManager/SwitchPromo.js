import React, {  memo, useState } from 'react';
import Switch from 'react-switch';
import { apiUpdateStatusPromotion } from '~/apis/promotion';

function SwitchPromo({proid, status, render}) {
  const [checked, setChecked] = useState(status);

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
