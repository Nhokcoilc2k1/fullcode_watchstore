import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { apiGetSinglePost, apiUpdatePost } from '~/apis/post';

function SwitchPost({poid, render}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiGetSinglePost(poid)
      if(response.success){
          setChecked(response.post.status)
      }
    }
    fetchApi();
  }, [poid])

  const handleChange = async(checked) => {
    setChecked(checked);
    const response = await apiUpdatePost(poid, {status: checked});
    if(response.success) render()
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
