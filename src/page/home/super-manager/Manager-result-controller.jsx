import React, { useState, useEffect } from 'react';

// 路由
import { useHistory } from 'react-router-dom';
import {
  HOME_MANAGER_CREATE,
  HOME_MANAGER_SHOW
} from '@/constants/route-constants.js';

// 样式
import { Result, Button } from 'antd';

export default ({ params }) => {
  const history = useHistory(),
    [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (params.type === 'createSuccess') {
      setButtons([
        <Button
          type='primary'
          key='continue'
          onClick={() => {
            history.push(HOME_MANAGER_CREATE.path);
          }}
        >
          继续创建管理员
        </Button>,
        <Button key='show' onClick={history.push(HOME_MANAGER_SHOW.path)}>
          查看管理员
        </Button>
      ]);
    } else if (params.type === 'updateSuccess') {
      setButtons([<Button key='show'>查看管理员</Button>]);
    }
  }, [params.type, history]);

  return (
    <Result
      status='success'
      title='创建成功！'
      subTitle='创建已成功，请进行下一步操作'
      extra={buttons}
    />
  );
};
