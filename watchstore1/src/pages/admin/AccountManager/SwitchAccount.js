import React, {  useEffect, useState } from 'react';
import Switch from 'react-switch';
import { apiGetSingleUser, apiUpdateStatusUser } from '~/apis/user';

function SwitchAccount({uid, render}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiGetSingleUser(uid)
      if(response.success){
          setChecked(response.user.status)
      }
    }
    fetchApi();
  },[uid])

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
