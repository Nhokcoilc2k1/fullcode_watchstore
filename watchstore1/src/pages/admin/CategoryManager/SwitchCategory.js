import React, {  memo, useEffect, useState } from 'react';
import Switch from 'react-switch';
import { apiGetSingleCategory, apiUpdateStatusCategory } from '~/apis';

function SwitchCategory({cid, render}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiGetSingleCategory(cid)
      if(response.success){
          setChecked(response.message.status)
      }
    }
    fetchApi();
  }, [cid])
  const handleChange = async(checked) => {
    setChecked(checked);
    const response = await apiUpdateStatusCategory(cid, {status: checked});
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

export default memo(SwitchCategory);
