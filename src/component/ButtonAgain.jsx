import {Button} from 'antd-mobile'
import  {useState} from 'react';

const ButtonAgain = (props) => {
  let options = {...props};
  let {children, onClick: handle} = options;
  delete options.children;

  let [loading, setLoading] = useState(false);

  const clickHandle = async () => {
    setLoading(true);
    try {
      await handle();
    } catch (error) {}
    setLoading(false);
  };

  if (handle) {
    options.onClick = clickHandle;
  }

  return <Button loading={loading} {...options}>
    {children}
  </Button>
}

export default ButtonAgain;