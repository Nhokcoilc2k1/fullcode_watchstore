import React, {  useState } from 'react';
import Switch from 'react-switch';
import { apiUpdateStatusCategory } from '~/apis';

function SwitchCategory({cid, status, render}) {
  const [checked, setChecked] = useState(status);

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

export default SwitchCategory;
