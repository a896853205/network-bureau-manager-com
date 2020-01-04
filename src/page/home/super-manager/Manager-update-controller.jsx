import React from 'react';

import SaveManager from '@/components/home/super-manager/save-manager.jsx';

export default props => {
  console.log(props);
  // 进行查询,将查询回来的对象传入saveManager中,让后将SaveManager组件修改
  // 判断是否有uuid,如果有uuid将组件变成修改状态,值传入而且部分组件不让修改
  return <SaveManager />;
};
