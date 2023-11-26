import { useState } from 'react';
import Switch from '@mui/material/Switch';

function Status({data, update}) {
  const [success, setSuccess] = useState(data.status);


  const handleChange = async(event) => {
    setSuccess(event.target.checked);
    data.status = event.target.checked;
    await update(data._id, data);
  };


  return (
          <Switch
            checked={success}
            color="primary"
            name={data.name}
            onChange={handleChange}
          />
  );
}

export default Status;