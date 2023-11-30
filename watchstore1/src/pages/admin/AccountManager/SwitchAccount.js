import React, {  useState } from 'react';
import Switch from 'react-switch';
import { apiUpdateStatusUser } from '~/apis/user';

function SwitchAccount({uid, status, render}) {
  const [checked, setChecked] = useState(status);

  const handleChange = async(checked) => {
    setChecked(checked);
    const response = await apiUpdateStatusUser(uid, {status: checked});
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

export default SwitchAccount;
