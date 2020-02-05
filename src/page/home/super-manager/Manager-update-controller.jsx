import React, { useEffect, useState } from 'react';

// 样式
import { Spin } from 'antd';

import SaveManager from '@/components/home/super-manager/Save-manager.jsx';

// 请求
import proxyFetch from '@/util/request';
import * as APIS from '@/constants/api-constants';

export default ({ params }) => {
  const { uuid } = params,
    [loading, setLoading] = useState(true),
    [manager, setManager] = useState(null);

  // 进行查询,将查询回来的对象传入saveManager中,让后将SaveManager组件修改
  useEffect(() => {
    (async () => {
      setLoading(true);

      const manager = await proxyFetch(APIS.SELECT_MANAGER_INFO, { managerUuid: uuid }, 'GET');

      setLoading(false);
      setManager(manager);
    })();

    return () => {};
  }, [uuid]);

  return (
    <Spin spinning={loading}>
      <SaveManager manager={manager} />
    </Spin>
  );
};
