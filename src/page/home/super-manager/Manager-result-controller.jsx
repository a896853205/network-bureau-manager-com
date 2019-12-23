import React, { useState, useEffect } from 'react';

// 样式
import { Result, Button } from 'antd';

export default ({ params }) => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (params.type === 'createSuccess') {
      setButtons([
        <Button type='primary' key='continue'>
          继续创建
        </Button>,
        <Button key='show'>查看管理员</Button>
      ]);
    } else if (params.type === 'updateSuccess') {
      setButtons([<Button key='show'>查看管理员</Button>]);
    }
  }, [params.type]);

  return (
    <Result
      status='success'
      title='Successfully Purchased Cloud Server ECS!'
      subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
      extra={buttons}
    />
  );
};
