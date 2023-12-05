import React, { useState } from 'react';
import Switch from 'react-switch';
import { apiUpdatePost } from '~/apis/post';

function SwitchPost({data}) {
  const [checked, setChecked] = useState(data.status);

  const handleChange = async(checked) => {
    setChecked(checked);
    const response = await apiUpdatePost(data._id, {status: checked});
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
